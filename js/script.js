document.addEventListener("DOMContentLoaded", () => {
  // Menu
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

  // This script dynamically sets the current year
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const heroContainer = document.querySelector(".hero__container");
  if (heroContainer) {
    heroContainer.style.display = "";
  }

  // Set background images for hero__image and hero__image--mobile
  const desktopHeroImage = document.querySelector(".hero__image");
  const mobileHeroImage = document.querySelector(".hero__image--mobile");

  if (desktopHeroImage) {
    desktopHeroImage.style.backgroundImage = 'url("./images/hero.webp")';
  }

  if (mobileHeroImage) {
    mobileHeroImage.style.backgroundImage = 'url("./images/hero-mobile.webp")';
  }
});
