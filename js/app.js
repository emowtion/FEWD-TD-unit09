const hamburger = document.getElementById("open-nav");
const navigation = document.getElementById("navigation");
const menu = document.getElementById("menu");
const languages = document.getElementById("languages");
const languageLink = languages.querySelectorAll("a");

const home = document.querySelector("#home");
const backToTop = document.querySelector(".back-to-top");

const homeLink = document.querySelector("#homeLink");
const aboutLink = document.querySelector("#aboutLink");
const projectsLink = document.querySelector("#projectsLink");
const contactLink = document.querySelector("#contactLink");
const aboutTitle = document.querySelector(".about__title");
const aboutParagraph = document.querySelector(".about__paragraph");
const projectsTitle = document.querySelector(".projects__title");
const nameLabel = document.querySelector(".name-label");
const messageLabel = document.querySelector(".message-label");
const submitbtn = document.querySelector(".submitbtn");

let setLanguage = localStorage.getItem("language");

// NAVIGATION HAMBURGER OPEN / CLOSE
function openNav() {
  navigation.classList.toggle("nav-open");
  menu.classList.toggle("nav-active");
  gsap.from(".nav-active li", {
    duration: 0.6,
    x: 100,
    opacity: 0,
    stagger: 0.25,
    ease: "power4.out",
  });
  gsap.from(languages, { duration: 0.5, y: -50, delay: 0.6 });
  gsap.from(".social-icon", {
    duration: 0.4,
    y: 100,
    delay: 0.6,
  });
}

//GENERATE THE PROJECT DIVS
function generateProjects() {
  const projectsDiv = document.getElementById("projects");
  let projectsHTML = "<h1>Projects</h1>";
  projectsDiv.innerHTML = "";
  projects[setLanguage].forEach((project, index) => {
    let title = project.title;
    let description = project.description;
    let image = project.image;
    let github = project.github;
    let liveLink = project.live;
    let challenges = project.challenges;
    let learned = project.learned;

    projectsHTML += `
  <div class="project" data-index="${index}">
            <h2 class="project__title">${title}</h2>
            <img class="project__image" src="${image}" alt="">
            <p class="project__description">${description}</p>
            <div class="project__challenges">
              <h3>Challenges</h3>
              <p class="project__challenges">${challenges}</p>
            </div>
            <div class="project__learned">
              <h3 class="project__learned">Lessons Learned</h3>
              <p class="project__learned">${learned}</p>
            </div>
            <ul class="project__technologies">`;

    project.tech.forEach((technologie) => {
      projectsHTML += `<li class="project__technology">${technologie}</li>`;
    });
    projectsHTML += `
            </ul>
            <div class="project__links">
              <a href="${liveLink}" class="project__link project__live" target="blank">Live Version</a>
              <a href="${github}" class="project__link project__github" target="blank">Github</a>
            </div>
          </div>`;
  });
  projectsDiv.innerHTML = projectsHTML;
}

// Generate the content based on the saved / chosen language
function generateContent(lang) {
  homeLink.textContent = content[lang].homeLink;
  // aboutLink.textContent = content[lang].aboutLink;
  projectsLink.textContent = content[lang].projectsLink;
  contactLink.textContent = content[lang].contactLink;
  // aboutTitle.textContent = content[lang].aboutTitle;
  // aboutParagraph.textContent = content[lang].aboutParagraph;
  projectsTitle.textContent = content[lang].projectsTitle;
  nameLabel.textContent = content[lang].nameLabel;
  messageLabel.textContent = content[lang].messageLabel;
  submitbtn.textContent = content[lang].submitbtn;
}

// check wether there's a last used language stored in localStorage if there is load it otherwise load English content.
function prefferedLanguage() {
  // check if there's something in localstorage already
  // if not set to English
  // add the styling to the currently selected class
  setLanguage = localStorage.getItem("language");
  if (setLanguage === "dutch") {
    setLanguage = "dutch";
    languageLink.forEach((lang) => {
      if (lang.getAttribute("data-language") === "dutch") {
        lang.classList.add("active-lang");
        generateContent("dutch");
      }
    });
  } else {
    setLanguage = "english";
    languageLink.forEach((lang) => {
      if (lang.getAttribute("data-language") === "english") {
        lang.classList.add("active-lang");
        generateContent("english");
      }
    });
  }
}

// animations on the project cards. move from right when they come in view and when passed move then left
// when the user scrolls up again they will work the other way around so they come back from where they dissapeared to.
function loadAnimations() {
  gsap.set(".project", { x: 500, opacity: 0 });
  ScrollTrigger.batch(".project", {
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        x: 0,
        stagger: 0.4,
      }),
    onLeave: (batch) =>
      gsap.to(batch, {
        opacity: 0,
        x: -500,
      }),
    onEnterBack: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        x: 0,
        stagger: 0.4,
      }),
    onLeaveBack: (batch) =>
      gsap.to(batch, {
        opacity: 0,
        x: 500,
      }),
    start: "20px bottom",
    end: "center top",
  });

  ScrollTrigger.addEventListener("refreshInit", () =>
    gsap.set(".project", { y: 0 })
  );
}

// add inFocus class to the .input-wrapper which will move the labels above the input fields
function inFocus(x) {
  x.parentNode.classList.add("inFocus");
}

// when the input loses focus without a value the label will move back down
function validate(x) {
  if (x.value === "") {
    x.parentNode.classList.remove("inFocus");
  }
}

//when another language is clicked save change to local storage en gernate Content and project again.
// had to reload the animations here aswell since they stoped working after the content refresh.
languageLink.forEach((link) => {
  link.addEventListener("click", () => {
    languages.querySelector(".active-lang").classList.remove("active-lang");
    link.classList.add("active-lang");
    const lang = link.getAttribute("data-language");
    setLanguage = lang;
    localStorage.setItem("language", setLanguage);
    generateContent(lang);
    generateProjects();
    loadAnimations();
  });
});

// open/close nav when hamburger/X is clicked
hamburger.addEventListener("click", openNav);
// close nav only when one of the links is clicked
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    openNav();
  }
});

// make the back to top button disapear when the user starts scrolling
window.addEventListener("scroll", () => {
  if (scrollY > home.scrollHeight / 2) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

prefferedLanguage();
generateProjects();
loadAnimations();
