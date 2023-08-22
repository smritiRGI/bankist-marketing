"use strict";

const headerElement = document.querySelector(".header");
const featureElement = document.querySelector(".features");
const learnMoreElement = document.querySelector(".btn--scroll-to");
const navBarLinks = document.querySelector(".nav__links");
const navLinks = document.querySelectorAll(".nav__link");
const operationsTabContainer = document.querySelector(
  ".operations__tab__container"
);
const operationsTabs = document.querySelectorAll(".operations__tab");
const operationsContent = document.querySelectorAll(".operations__text");
const navElement = document.querySelector(".nav");
const slideElements = document.querySelectorAll(".slide");
const leftSliderElement = document.querySelector(".slider__btn--left");
const rightSliderElement = document.querySelector(".slider__btn--right");

const message = document.createElement("div");
message.classList.add("cookie__message");
message.innerHTML = `<div>We use cookies for imporved functionality & analytics. <button class="cookie__button"> Got it!</button></div>`;
headerElement.append(message);
document.querySelector(".cookie__button").addEventListener("click", () => {
  message.remove();
});

// smooth scrolling
learnMoreElement.addEventListener("click", () => {
  // const slcoords = featureElement.getBoundingClientRect();
  // const scrollposX = window.pageXOffset;
  // // position of scroll currently
  // const scrollposY = window.pageYOffset;
  // // top is the relative to viewport
  // window.scrollTo(slcoords.left + scrollposX, slcoords.top + scrollposY);

  // // for smooth behaviour
  // window.scrollTo({
  //   left: slcoords.left + scrollposX,
  //   top: slcoords.top + scrollposY,
  //   behavior: "smooth",
  // });

  // new way
  featureElement.scrollIntoView({ behavior: "smooth" });
});

// This can be done by event delegation easily
// console.log(navLinks);
// navLinks.forEach((navLink) => {
//   navLink.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = navLink.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

navBarLinks.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

operationsTabContainer.addEventListener("click", function (e) {
  // if span is clicked then without this we will get the span element
  const clicked = e.target.closest(".operations__tab");
  // console.log(clicked);
  // console.log(clicked.dataset.tab);
  // if the whitespace between buttons is clicked.
  if (!clicked) return;
  // console.log(operationsTabs);
  // make all operations inactive
  operationsTabs.forEach((tab) =>
    tab.classList.remove("operations__tab__active")
  );
  // hide all operations content
  operationsContent.forEach((content) => content.classList.add("hidden"));
  clicked.classList.add("operations__tab__active");
  document
    .querySelector(`.operations__text__${clicked.dataset.tab}`)
    .classList.remove("hidden");
});

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    // console.log(e.target);
    const link = e.target;
    // console.log(e.target.closest(".nav"));
    const siblings = e.target.closest(".nav").querySelectorAll(".nav__link");
    const logo = e.target.closest(".nav").querySelector("img");
    // console.log(siblings);
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// navElement.addEventListener("mouseover", function (e) {
//   handleHover(e, 0.5);
// });

// navElement.addEventListener("mouseout", function (e) {
//   handleHover(e, 1);
// });

// better way
navElement.addEventListener("mouseover", handleHover.bind(0.5));
navElement.addEventListener("mouseout", handleHover.bind(1));

// console.log(window);
// scroll events are bad for performance since they are fired everytime we scroll
// window.addEventListener("scroll", function (e) {
//   if (window.scrollY >= 900) {
//     navElement.classList.add("nav__sticky");
//   }
//   if (window.scrollY < 900) {
//     navElement.classList.remove("nav__sticky");
//   }
// });
const navHeight = navElement.getBoundingClientRect().height;

const obsFunction = (enteries, observer) => {
  console.log(enteries);
  const [entry] = enteries;
  if (!entry.isIntersecting) navElement.classList.add("nav__sticky");
  else navElement.classList.remove("nav__sticky");
};
// console.dir(obsFunction);
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
// const observer = new IntersectionObserver(obsFunction, obsOptions);
// observer.observe(operationsTabContainer);

const headerObserver = new IntersectionObserver(obsFunction, obsOptions);
headerObserver.observe(headerElement);

let currSlide = 0;
// taking into account zero based indexing
const maxSlides = 2;

const sectionObsOptions = {
  root: null,
  threshold: 0.05,
};

const sectionObsFunction = (enteries, observer) => {
  const [entry] = enteries;
  if (!entry.isIntersecting) featureElement.classList.add("reveal");
  else featureElement.classList.remove("reveal");
  observer.unobserve(featureElement);
};
const sectionObserver = new IntersectionObserver(
  sectionObsFunction,
  sectionObsOptions
);
sectionObserver.observe(featureElement);

slideElements.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});

leftSliderElement.addEventListener("click", function () {
  if (currSlide === 0) {
    currSlide = maxSlides;
  } else currSlide--;
  slideElements.forEach((slide, indx) => {
    slide.style.transform = `translateX(${(indx - currSlide) * 100}%)`;
  });
});

rightSliderElement.addEventListener("click", function () {
  if (currSlide === maxSlides) {
    currSlide = 0;
  } else currSlide++;
  slideElements.forEach((slide, indx) => {
    slide.style.transform = `translateX(${(indx - currSlide) * 100}%)`;
  });
});
