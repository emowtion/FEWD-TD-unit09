const hamburger = document.getElementById("open-nav");
const navigation = document.getElementById("navigation");
const menu = document.getElementById("menu");

const languages = document.getElementById("languages");
const languageLink = languages.querySelectorAll("a");

const homeTitle = document.querySelector(".home__title");
const homeParagraph = document.querySelector(".home__paragraph");

let setLanguage = "english";

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

hamburger.addEventListener("click", openNav);
menu.addEventListener("click", openNav);

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

    projectsHTML += `
  <div class="project" data-index="${index}">
            <h2 class="project__title">${title}</h2>
            <img class="project__image" src="${image}" alt="">

            <p class="project__description">${description}</p>
            <ul class="project__technologies">`;

    project.tech.forEach((technologie) => {
      projectsHTML += `<li class="project__technology">${technologie}</li>`;
    });
    projectsHTML += `
            </ul>
            <div class="project__links">
              <a href="${liveLink}" class="project__link project__live">Live Version</a>
              <a href="${github}" class="project__link project__github">Github</a>
            </div>
          </div>`;
  });
  projectsDiv.innerHTML = projectsHTML;
}

generateProjects();

// CHANGE LANGUAGE

languageLink.forEach((lang) => {
  lang.addEventListener("click", () => {
    languages.querySelector(".active-lang").classList.remove("active-lang");
    lang.classList.add("active-lang");
    const attr = lang.getAttribute("language");
    homeTitle.textContent = content[attr].title;
    homeParagraph.textContent = content[attr].paragraph;
    setLanguage = attr;
    generateProjects();
  });
});
