const loader = document.getElementById("loader");

window.addEventListener("load", () => {
    window.setTimeout(() => {
        loader?.classList.add("hidden");
    }, 520);
});

const typingTarget = document.getElementById("typing");
const words = ["Sviluppatore web", "Problem solver", "Tech operator"];
let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingTarget) return;

    const current = words[wordIndex];
    typingTarget.textContent = current.slice(0, letterIndex);

    if (!deleting && letterIndex < current.length) {
        letterIndex += 1;
        window.setTimeout(typeEffect, 72);
        return;
    }

    if (!deleting && letterIndex === current.length) {
        deleting = true;
        window.setTimeout(typeEffect, 1050);
        return;
    }

    if (deleting && letterIndex > 0) {
        letterIndex -= 1;
        window.setTimeout(typeEffect, 42);
        return;
    }

    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    window.setTimeout(typeEffect, 180);
}

typeEffect();

const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.18 });

revealElements.forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".header-index a");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
    });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => sectionObserver.observe(section));

const glow = document.querySelector(".cursor-glow");
const trail = document.querySelector(".cursor-trail");
let trailX = window.innerWidth / 2;
let trailY = window.innerHeight / 2;

document.addEventListener("mousemove", (event) => {
    if (!glow || !trail || window.matchMedia("(pointer: coarse)").matches) return;

    glow.style.opacity = "0.95";
    trail.style.opacity = "0.7";

    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;

    trailX += (event.clientX - trailX) * 0.13;
    trailY += (event.clientY - trailY) * 0.13;

    trail.style.left = `${trailX}px`;
    trail.style.top = `${trailY}px`;
});

const reticle = document.querySelector(".hud-reticle");
let reticleTime = 0;

function animateReticle() {
    if (!reticle) return;

    const x = 54 + Math.sin(reticleTime * 0.018) * 10;
    const y = 46 + Math.cos(reticleTime * 0.014) * 8;

    reticle.style.left = `${x}%`;
    reticle.style.top = `${y}%`;

    reticleTime += 1;
    window.requestAnimationFrame(animateReticle);
}

animateReticle();

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".header-index");

menuToggle?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("open") ?? false;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        nav?.classList.remove("open");
        menuToggle?.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    });
});
