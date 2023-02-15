const headerSection = document.querySelector(".header");
const landingSection = document.querySelector(".landing");
const funfactsSection = document.querySelector(".fun-facts");
const funfactNumbers = document.querySelectorAll(".fun-facts .text >h1");
const navs = document.querySelectorAll(".header a");
const sections = document.querySelectorAll("body > div");

const eventNavs = document.querySelectorAll(".navs-tab ul li");
const eventCards = document.querySelectorAll(".courses .cards .row > .col-12");
let currentTab = "Show All";

let started = false;

window.addEventListener("scroll", () => {
  let current = "";
  if (window.scrollY >= landingSection.offsetTop) {
    headerSection.style.cssText = `
   top:30px;
    `;
  }
  if (window.scrollY >= landingSection.offsetTop + 900) {
    headerSection.style.cssText = `
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    background-color: #7a6ad8;
    border-radius: 0 0 25px 25px;
    z-index:999;`;
  } else {
    headerSection.style.cssText = `
    `;
  }
  if (window.scrollY >= funfactsSection.offsetTop - 600) {
    if (!started) {
      funfactNumbers.forEach((number) => startCount(number));
    }
    started = true;
  }
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 500) {
      current = section.id;
      navs.forEach((nav) => {
        if (nav.classList.contains(current)) {
          removeActive(navs);
          nav.classList.add("active");
        }
      });
    }
  });
});

navs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    removeActive(navs);
    e.target.classList.add("active");
  });
});

eventNavs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    showCategory(tab, eventCards);
    removeActive(eventNavs);
    e.target.classList.add("active");
  });
});

//functions
function startCount(el) {
  let goal = el.dataset.max;
  let count = setInterval(() => {
    el.textContent = `${parseInt(el.textContent) + 1}+`;
    if (el.textContent == goal + "+") {
      clearInterval(count);
    }
  }, 4000 / goal);
}

function showCategory(clickedTab, e) {
  currentTab = `${clickedTab.innerHTML}`;
  e.forEach((e) => {
    if (e.dataset.type == currentTab) {
      e.style.display = "block";
    } else {
      e.style.display = "none";
    }
    if (currentTab == "Show All") {
      e.style.display = "block";
    }
  });
}
function removeActive(navs) {
  navs.forEach((e) => {
    e.classList.remove("active");
  });
}
