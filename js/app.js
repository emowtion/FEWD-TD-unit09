const hamburger = document.getElementById("open-nav");
const navigation = document.getElementById("navigation");
const menu = document.getElementById("menu");

const languages = document.getElementById("languages");
const languageLink = languages.querySelectorAll("a");

const aboutTitle = document.querySelector(".about__title");
const aboutParagraph = document.querySelector(".about__paragraph");

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

// CHANGE LANGUAGE
function generateContent(lang) {
  aboutTitle.textContent = content[lang].aboutTitle;
  aboutParagraph.textContent = content[lang].aboutParagraph;
}

function prefferedLanguage() {
  // check if there's something in localstorage already
  // if not set to English
  // add the styling to the currently selected class
  setLanguage = localStorage.getItem("language");
  if (setLanguage === "dutch") {
    setLanguage = "dutch";
    languageLink.forEach((lang) => {
      if (lang.getAttribute("language") === "dutch") {
        lang.classList.add("active-lang");
        generateContent("dutch");
      }
    });
  } else {
    setLanguage = "english";
    languageLink.forEach((lang) => {
      if (lang.getAttribute("language") === "english") {
        lang.classList.add("active-lang");
        generateContent("english");
      }
    });
  }
}

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

languageLink.forEach((link) => {
  link.addEventListener("click", () => {
    languages.querySelector(".active-lang").classList.remove("active-lang");
    link.classList.add("active-lang");
    const lang = link.getAttribute("language");
    setLanguage = lang;
    localStorage.setItem("language", setLanguage);
    generateContent(lang);
    generateProjects();
    loadAnimations();
  });
});
hamburger.addEventListener("click", openNav);
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    openNav();
  }
});

prefferedLanguage();
generateProjects();
loadAnimations();
