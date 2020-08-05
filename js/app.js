// SWIPER JS
var mySwiper = new Swiper(".swiper-container", {
  // Optional parameters
  // loop: true,
  allowTouchMove: false,
  slidesPerView: 3,
  centeredSlides: true,
  effect: "fade",
  speed: 500,
  distance: 10,
  // mousewheel: true,
  // width: 300,

  // If we need pagination
  // pagination: {
  //   el: ".swiper-pagination",
  // },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let swiperContainer = document.getElementById("swiper-container");
let swiperWrapper = document.getElementById("swiper-wrapper");
let projectTitle = document.getElementById("project-title");

swiperContainer.addEventListener("click", (e) => {
  if (
    e.target.classList[0] === "swiper-button-next" ||
    e.target.classList[0] === "swiper-button-prev"
  ) {
    projectTitle.textContent = projects[mySwiper.realIndex].title;
  }
});

// NAVIGATION HAMBURGER OPEN / CLOSE
const hamburger = document.getElementById("open-nav");
const navigation = document.getElementById("navigation");
const menu = document.getElementById("menu");

function openNav() {
  navigation.classList.toggle("nav-open");
  menu.classList.toggle("nav-active");
}

hamburger.addEventListener("click", openNav);
