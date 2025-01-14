// Menu
document.addEventListener("DOMContentLoaded", () => {
  const burgerIcon = document.querySelector(".header__burger");
  const menu = document.querySelector(".header__menu");
  const overlay = document.querySelector(".header__overlay");
  const closeButton = document.querySelector(".header__menu-close");
  const navLinks = document.querySelectorAll(".header__nav-link");
  const heroButton = document.querySelector(".hero__button");
  const heroWrapper = document.querySelector(".hero__wrapper");

  const openMenu = () => {
    menu.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("menu-open");
    if (heroButton) heroButton.classList.add("hidden");
  };

  const closeMenu = () => {
    menu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
    if (heroButton) heroButton.classList.remove("hidden");
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    const mobileSuffix = "-mobile";
    const isMobile = window.innerWidth < 768;
    const targetHref = e.target.getAttribute("href");

    if (targetHref.includes("index.html")) {
      window.location.href =
        isMobile &&
        (targetHref.includes("content-section") ||
          targetHref.includes("our-services") ||
          targetHref.includes("our-products"))
          ? `${targetHref}${mobileSuffix}`
          : targetHref;
      return;
    }

    const targetId = targetHref.replace("#", "");

    let targetElement = null;

    if (targetId === "top") {
      closeMenu();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    } else {
      targetElement = document.getElementById(
        isMobile && document.getElementById(`${targetId}${mobileSuffix}`)
          ? `${targetId}${mobileSuffix}`
          : targetId
      );
    }

    if (targetElement) {
      closeMenu();
      const scrollOffset = window.innerWidth > 1280 ? 150 : 110;
      const scrollPosition = targetElement.offsetTop - scrollOffset;
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  burgerIcon.addEventListener("click", openMenu);
  overlay.addEventListener("click", closeMenu);
  closeButton.addEventListener("click", closeMenu);
  navLinks.forEach((link) => {
    link.addEventListener("click", handleLinkClick);
  });

  if (heroWrapper) {
    const handleScroll = () => {
      const wrapperBottom = heroWrapper.getBoundingClientRect().bottom;
      if (wrapperBottom < 0) {
        heroButton?.classList.add("fixed");
      } else {
        heroButton?.classList.remove("fixed");
      }
    };

    window.addEventListener("scroll", handleScroll);
  }

  // Contact form
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("contact-name").value;
      const email = document.getElementById("contact-email").value;
      const subject =
        document.getElementById("contact-subject").value || "No Subject";
      const message = document.getElementById("contact-message").value;

      const sendGridAPIKey =
        "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";

      try {
        const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sendGridAPIKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personalizations: [
              { to: [{ email: "nikitadudukalo2@gmail.com" }] },
            ],
            from: { email: "projectbiz24@gmail.com" },
            subject: subject,
            content: [
              {
                type: "text/plain",
                value: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
              },
            ],
          }),
        });

        if (response.ok) {
          alert("Message sent successfully!");
          contactForm.reset();
        } else {
          const error = await response.json();
          console.error("Error sending message:", error);
          alert("Failed to send message. Please try again later.");
        }
      } catch (error) {
        console.error("Request failed:", error);
        alert("An error occurred. Please try again later.");
      }
    });
  }
});

// This script dynamically sets the current year
document.getElementById("current-year").textContent = new Date().getFullYear();
