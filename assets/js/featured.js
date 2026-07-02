const slides = Array.from(document.querySelectorAll(".featured-slide"));
const dots = Array.from(document.querySelectorAll(".dot"));

const prevButton = document.querySelector("#prev-project");
const nextButton = document.querySelector("#next-project");

let currentSlide = 0;

function showSlide(index) {
  if (slides.length === 0) return;

  const previousSlide = currentSlide;

  if (index < 0) {
    currentSlide = slides.length - 1;
  } else if (index >= slides.length) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentSlide);
  });

  pausePreviousSlide(previousSlide);

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function pausePreviousSlide(previousIndex) {
  const previousSlide = slides[previousIndex];
  if (!previousSlide) return;

  previousSlide.querySelectorAll("iframe").forEach((iframe) => {
    const src = iframe.getAttribute("src");
    iframe.setAttribute("src", src);
  });
}

prevButton?.addEventListener("click", () => {
  showSlide(currentSlide - 1);
});

nextButton?.addEventListener("click", () => {
  showSlide(currentSlide + 1);
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const targetSlide = Number(dot.dataset.slide);
    showSlide(targetSlide);
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
    showSlide(currentSlide - 1);
  }

  if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
    showSlide(currentSlide + 1);
  }
});

showSlide(0);

document.querySelectorAll(".media-gallery").forEach((gallery) => {
  const frames = Array.from(gallery.querySelectorAll(".media-frame"));
  const buttons = Array.from(gallery.querySelectorAll(".media-dot"));

  function showMedia(index) {
    frames.forEach((frame, i) => {
      frame.classList.toggle("active", i === index);
    });

    buttons.forEach((button, i) => {
      button.classList.toggle("active", i === index);
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      showMedia(Number(button.dataset.media));
    });
  });

  showMedia(0);
});