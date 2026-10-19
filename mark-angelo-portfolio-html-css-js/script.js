const PORTFOLIO = {
  email: "viveromarkangelo16@gmail.com",
  github: "https://github.com/itsmevivss",
  linkedin: "https://www.linkedin.com/in/itsmevivs/",
  darkPhoto: "images/profile-dark.png",
  lightPhoto: "images/profile-light.png",
  resume: "markvivero-resume.pdf"
};

const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const profilePhoto = document.getElementById("profilePhoto");
const photoPlaceholder = document.getElementById("photoPlaceholder");
const photoPlaceholderTitle = document.getElementById("photoPlaceholderTitle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const projectModal = document.getElementById("projectModal");
const formNotice = document.getElementById("formNotice");

function getInitialTheme() {
  try {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch (_) {}
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function setTheme(theme) {
  root.dataset.theme = theme;
  try { localStorage.setItem("portfolio-theme", theme); } catch (_) {}
  themeIcon.textContent = theme === "dark" ? "☼" : "☾";
  themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
  document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#05090c" : "#f5f8fa";
  changeProfilePhoto(theme);
}

function changeProfilePhoto(theme) {
  const photo = theme === "dark" ? PORTFOLIO.darkPhoto : PORTFOLIO.lightPhoto;
  photoPlaceholderTitle.textContent = `YOUR ${theme.toUpperCase()} MODE PORTRAIT`;
  profilePhoto.style.display = "block";
  photoPlaceholder.style.display = "none";
  profilePhoto.style.opacity = "0";
  const next = new Image();
  next.onload = () => {
    profilePhoto.src = photo;
    profilePhoto.alt = `Professional portrait for Mark Angelo Vivero (${theme} mode)`;
    profilePhoto.style.display = "block";
    photoPlaceholder.style.display = "none";
    requestAnimationFrame(() => { profilePhoto.style.opacity = "1"; });
  };
  next.onerror = () => {
    profilePhoto.style.display = "none";
    photoPlaceholder.style.display = "flex";
  };
  next.src = photo;
}

themeToggle.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));
setTheme(getInitialTheme());

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("nav-open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  menuToggle.textContent = open ? "×" : "☰";
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("nav-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  menuToggle.textContent = "☰";
}));

const topbar = document.querySelector(".topbar");
const scrollProgress = document.getElementById("scrollProgress");
function updateScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  topbar.classList.toggle("topbar-scrolled", window.scrollY > 30);
}
window.addEventListener("scroll", updateScroll, { passive: true });
updateScroll();

document.getElementById("currentYear").textContent = new Date().getFullYear();

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealElements = document.querySelectorAll(".reveal");
if (reducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach(el => el.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(el => revealObserver.observe(el));
}

const projectData = {
  recipe: {
    number: "PROJECT 01",
    title: "AI-Powered Recipe Recommender for Native Kapampangan Dishes",
    description: "An AI-powered recipe recommendation system focused on native Kapampangan cuisine. This project received Best Capstone Project recognition.",
    tags: ["AI-powered application", "Recipe recommendation", "Best Capstone Project"]
  },
  web: {
    number: "PROJECT 02",
    title: "Web Development Projects",
    description: "Use this area to showcase real websites and interfaces you have built. Add screenshots, a concise explanation of your role, technologies actually used, and real repository or demo links.",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  other: {
    number: "PROJECT 03",
    title: "TBH, This Is Just a Placeholder",
    description: "This is an editable placeholder for another real programming or technical project.",
    tags: ["Programming", "Problem solving"]
  }
};
const modalTitle = document.getElementById("modalTitle");
const modalKicker = document.getElementById("modalKicker");
const modalDescription = document.getElementById("modalDescription");
const modalTags = document.getElementById("modalTags");
let previousFocus = null;

function openProject(key) {
  const project = projectData[key];
  if (!project) return;
  previousFocus = document.activeElement;
  modalKicker.textContent = project.number;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalTags.replaceChildren();
  project.tags.forEach(tag => {
    const span = document.createElement("span");
    span.textContent = tag;
    modalTags.appendChild(span);
  });
  projectModal.hidden = false;
  document.getElementById("modalClose").focus();
}
function closeProject() {
  projectModal.hidden = true;
  if (previousFocus) previousFocus.focus();
}
document.querySelectorAll("[data-project]").forEach(button => button.addEventListener("click", () => openProject(button.dataset.project)));
document.getElementById("modalClose").addEventListener("click", closeProject);
document.getElementById("modalDone").addEventListener("click", closeProject);
projectModal.addEventListener("click", e => { if (e.target === projectModal) closeProject(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !projectModal.hidden) closeProject(); });

const emailLink = document.getElementById("emailLink");
const emailText = document.getElementById("emailText");
emailLink.href = `mailto:${PORTFOLIO.email}`;
emailText.textContent = PORTFOLIO.email;

function setSocialLink(id, url) {
  const link = document.getElementById(id);

  if (!link || !url) return;

  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
}

setSocialLink("githubLink", PORTFOLIO.github);
setSocialLink("linkedinLink", PORTFOLIO.linkedin);

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
    formNotice.textContent = "Please enter your name, a valid email address, and a message.";
    return;
  }
  if (!PORTFOLIO.email || PORTFOLIO.email === "viveromarkangelo@gmail.com") {
    formNotice.textContent = "Demo form only: update the email value in script.js to enable email composition.";
    return;
  }
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:${PORTFOLIO.email}?subject=${subject}&body=${body}`;
  formNotice.textContent = "Your email app should open with the message prepared. Sending depends on your email app.";
});

const resumeSection = document.querySelector(".resume-action");
if (PORTFOLIO.resume) {
  resumeSection.innerHTML = `<a class="button button-primary" href="${PORTFOLIO.resume}" target="_blank" rel="noopener noreferrer">Open résumé ↗</a><a class="text-link" href="${PORTFOLIO.resume}" download>↓ Download PDF</a>`;
}
