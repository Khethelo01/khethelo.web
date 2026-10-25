"use strict";

// Personalise this object, then update your project and education text in index.html.
const profile = {
  name: "Khethelo Ntsele",
  email: "Kntsele75@gmail.com",
  github: "https://github.com/Khethelo01", // Replace with your profile URL.
  linkedin: "https://www.linkedin.com/in/khethelo-ntsele-18a85b428/", // Replace with your profile URL.
  cv: "assets/Khethelo_Ntsele_CV.pdf",
  cvIsTemplate: false
};

document.documentElement.classList.add("js");
document.querySelectorAll("[data-name]").forEach(el => { el.textContent = profile.name; });
document.title = `${profile.name} | Python & AI Developer`;
document.getElementById("code-name").textContent = JSON.stringify(profile.name);
document.getElementById("email-link").href = `mailto:${profile.email}`;
document.getElementById("email-display").textContent = profile.email;
document.querySelectorAll("[data-social]").forEach(el => { el.href = profile[el.dataset.social]; });
document.querySelectorAll("[data-linkedin-unavailable]").forEach(button => {
  button.addEventListener("click", () => {
    window.alert("This feature hasn’t been added yet.");
  });
});
const cvButton = document.getElementById("cv-link");
if (!profile.cvIsTemplate && profile.cv) {
  const cvLink = document.createElement("a");
  cvLink.id = cvButton.id;
  cvLink.className = cvButton.className;
  cvLink.href = profile.cv;
  cvLink.download = "";
  cvLink.textContent = "Download CV";
  cvButton.replaceWith(cvLink);
  document.getElementById("cv-note").hidden = true;
}
document.getElementById("year").textContent = new Date().getFullYear();

const toggle = document.querySelector(".menu-toggle");
const navigation = document.getElementById("nav-links");
function closeMenu() {
  navigation.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open navigation");
}
toggle.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  const wasOpen = navigation.classList.contains("open");
  closeMenu();
  if (wasOpen) {
    const section = document.getElementById(link.hash.slice(1));
    const heading = section?.querySelector("h1, h2");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      setTimeout(() => heading.focus({ preventScroll: true }), 0);
    }
  }
}));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && navigation.classList.contains("open")) {
    closeMenu();
    toggle.focus();
  }
});
document.addEventListener("click", event => { if (!event.target.closest(".nav")) closeMenu(); });
const wideScreen = window.matchMedia("(min-width: 761px)");
wideScreen.addEventListener("change", () => {
  if (!wideScreen.matches && navigation.contains(document.activeElement)) toggle.focus();
  closeMenu();
});

if ("IntersectionObserver" in window) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reducedMotion) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("pending");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".skill-card, .project-card, .timeline article").forEach(el => {
      el.classList.add("reveal", "pending");
      revealObserver.observe(el);
    });
  }
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navigation.querySelectorAll("a").forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
  document.querySelectorAll("main section[id]").forEach(section => sectionObserver.observe(section));
}



