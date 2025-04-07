document.addEventListener("DOMContentLoaded", function () {
  // Accordion functionality
  const accordionButtons = document.querySelectorAll(".accordion-button");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Toggle active class for the button
      this.classList.toggle("active");

      // Get the next element (accordion content)
      const content = this.nextElementSibling;

      // Toggle active class for the content
      content.classList.toggle("active");

      // Update max-height for smooth animation
      if (content.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "8px";
      } else {
        content.style.maxHeight = 0;
      }

      // Close other accordion items
      accordionButtons.forEach((otherButton) => {
        if (otherButton !== button) {
          otherButton.classList.remove("active");
          const otherContent = otherButton.nextElementSibling;
          otherContent.classList.remove("active");
          otherContent.style.maxHeight = 0;
        }
      });
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Add scroll animation for elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(
    ".service-card, .reason-card, .testimonial-card, .section-intro"
  );
  animateElements.forEach((element) => {
    observer.observe(element);
  });

  // Add hover effect for service cards
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.15)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "var(--box-shadow)";
    });
  });
});

function openNav() {
  document.getElementById("mySidepanel").style.width = "100%";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

document.getElementById("mySidepanel").addEventListener("click", function (e) {
  if (e.target.tagName === "A" && !e.target.classList.contains("closebtn")) {
    closeNav();
  }
});

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}
