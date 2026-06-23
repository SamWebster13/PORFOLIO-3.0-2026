const sections = [
  document.querySelector("#start-screen"),
  document.querySelector("#surface"),
  document.querySelector("#undercity"),
  document.querySelector("#bunkers"),
  document.querySelector("#deep"),
  document.querySelector("#core")
].filter(Boolean);

let currentSection = 0;
let isMoving = false;

function goToSection(index) {
  if (index < 0 || index >= sections.length || isMoving) return;

  currentSection = index;
  document.querySelectorAll(".arcade-map a").forEach((link, i) => {
  link.classList.toggle("active", i === currentSection - 1);
});
  isMoving = true;

  sections[currentSection].scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  setTimeout(() => {
    isMoving = false;
  }, 850);
}

window.addEventListener("wheel", (event) => {
  event.preventDefault();

  if (isMoving) return;

  if (event.deltaY > 20) {
    goToSection(currentSection + 1);
  } else if (event.deltaY < -20) {
    goToSection(currentSection - 1);
  }
}, { passive: false });

document.querySelector("#press-start")?.addEventListener("click", () => {
  goToSection(1);
});

document.querySelectorAll(".arcade-map a").forEach((link, index) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    goToSection(index + 1);
  });
});

window.addEventListener("keydown", (event) => {
  if (isMoving) return;

  if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
    goToSection(currentSection + 1);
  }

  if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
    goToSection(currentSection - 1);
  }
});