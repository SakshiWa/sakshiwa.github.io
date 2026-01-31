// Initialize EmailJS
(function () {
  emailjs.init("mLiet-PW56279mtsL"); // Replace with your EmailJS public key
})();

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 5px 30px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.05)";
  }
});

// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  // Animate hamburger
  const spans = hamburger.querySelectorAll("span");
  spans[0].style.transform = navMenu.classList.contains("active")
    ? "rotate(45deg) translateY(8px)"
    : "none";
  spans[1].style.opacity = navMenu.classList.contains("active") ? "0" : "1";
  spans[2].style.transform = navMenu.classList.contains("active")
    ? "rotate(-45deg) translateY(-8px)"
    : "none";
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections
document
  .querySelectorAll(
    ".section-title, .about-content, .skills-grid, .projects-grid, .contact-content",
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Add stagger animation to skill cards
const skillCards = document.querySelectorAll(".skill-card");
skillCards.forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.animation = `fadeInUp 3s ease forwards`;
  card.style.animationDelay = `${0.1 * index}s`;
});

// Add stagger animation to project cards
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.animation = `fadeInUp 3s ease forwards`;
  card.style.animationDelay = `${0.2 * index}s`;
});

// Form handling with EmailJS
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = contactForm.querySelector(".btn-submit");
  submitBtn.classList.add("loading");
  submitBtn.disabled = true;

  // Get form data
  const formData = {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
    to_email: "waghsakshi003@gmail.com",
  };

  // Send email using EmailJS
  emailjs
    .send("service_2e8pg99", "template_swp4bx4", formData)
    .then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);

        // Show success message
        formStatus.textContent =
          "Message sent successfully! I'll get back to you soon.";
        formStatus.className = "form-status success show";

        // Reset form
        contactForm.reset();

        // Hide status after 5 seconds
        setTimeout(() => {
          formStatus.classList.remove("show");
        }, 5000);
      },
      function (error) {
        console.log("FAILED...", error);

        // Show error message
        formStatus.textContent =
          "Oops! Something went wrong. Please try again or email me directly.";
        formStatus.className = "form-status error show";

        // Hide status after 5 seconds
        setTimeout(() => {
          formStatus.classList.remove("show");
        }, 5000);
      },
    )
    .finally(function () {
      // Re-enable submit button
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
    });
});

// Add floating animation to profile image
const profileImg = document.querySelector(".profile-img");
let floatDirection = 1;

setInterval(() => {
  const currentTransform = window.getComputedStyle(profileImg).transform;
  const matrix = new WebKitCSSMatrix(currentTransform);
  const currentY = matrix.m42;

  if (currentY >= 10) floatDirection = -1;
  if (currentY <= -10) floatDirection = 1;

  profileImg.style.transform = `translateY(${currentY + floatDirection * 0.5}px)`;
}, 50);

// Parallax effect for sections
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(
    ".home-content, .home-image",
  );

  parallaxElements.forEach((el) => {
    const speed = el.classList.contains("home-content") ? 0.5 : 0.3;
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.style.color = "";
    if (link.getAttribute("href").slice(1) === current) {
      link.style.color = "var(--primary-green)";
    }
  });
});

// Add typing effect to home section
const typingText = document.querySelector(".title");
const originalText = typingText.textContent;
typingText.textContent = "";
let charIndex = 0;

function typeWriter() {
  if (charIndex < originalText.length) {
    typingText.textContent += originalText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 100);
  }
}

// Start typing effect after page load
window.addEventListener("load", () => {
  setTimeout(typeWriter, 1500);
});

// Lazy load images
const images = document.querySelectorAll("img");
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.opacity = "0";
      img.style.transition = "opacity 3s ease";
      setTimeout(() => {
        img.style.opacity = "1";
      }, 100);
      observer.unobserve(img);
    }
  });
});

images.forEach((img) => imageObserver.observe(img));

console.log("Portfolio website loaded successfully! 🎉");
console.log("Don't forget to configure EmailJS with your credentials:");
console.log("1. Sign up at https://www.emailjs.com/");
console.log("2. Create an email service");
console.log("3. Create an email template");
console.log(
  "4. Replace YOUR_PUBLIC_KEY, YOUR_SERVICE_ID, and YOUR_TEMPLATE_ID in script.js",
);
