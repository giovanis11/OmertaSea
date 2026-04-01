const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");
const bookingForm = document.querySelector("#booking-form");
const formNote = document.querySelector("#form-note");
const currentYear = document.querySelector("#current-year");
const carousels = document.querySelectorAll("[data-carousel]");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";

    navToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    });
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (bookingForm && formNote) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formNote.textContent =
      "Thanks. The form interaction is ready. Next step: connect it to email or WhatsApp.";
    formNote.classList.add("is-success");
    bookingForm.reset();
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

carousels.forEach((carousel) => {
  const track = carousel.querySelector(".fleet-track");
  const slides = Array.from(carousel.querySelectorAll(".fleet-slide"));
  const prevButton = carousel.querySelector(".fleet-control-prev");
  const nextButton = carousel.querySelector(".fleet-control-next");

  if (!track || slides.length === 0 || !prevButton || !nextButton) {
    return;
  }

  let currentIndex = 0;

  const render = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === currentIndex);
    });
  };

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    render();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    render();
  });

  render();
});
