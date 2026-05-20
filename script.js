const images = [
  "Images/Type=01.png",
  "Images/Type=02.png",
  "Images/Type=03.png",
  "Images/Type=04.png",
  "Images/Type=05.png",
  "Images/Type=06.png",
];

let activeIndex = 0;

const slidesContainer = document.querySelector(".slides");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const dotsContainer = document.querySelector(".dots");

function createSlides() {
  images.forEach((url, index) => {
    const slide = document.createElement("div");
    slide.classList.add("slide");

    slide.dataset.index = index;

    const img = document.createElement("img");
    img.src = url;
    img.alt = `Slide ${index + 1}`;
    /*     slide.innerHTML = `<img src = '${url}' alt = "Slide ${index + 1}">`;
     */
    slide.append(img);
    slidesContainer.append(slide);
  });
}
let isFirstRender = true;
createSlides();
updateSlider();
createDots();
updateDots();

function updateSlider() {
  const slides = document.querySelectorAll(".slide");

  slides.forEach((slide, index) => {
    slide.classList.remove("active", "slide-prev", "slide-next", "hidden");

    const prevIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;

    if (index === activeIndex) {
      slide.classList.add("active");
    } else if (!isFirstRender && index === prevIndex) {
      slide.classList.add("slide-prev");
    } else if (index === nextIndex) {
      slide.classList.add("slide-next");
    } else {
      slide.classList.add("hidden");
    }
  });
}

nextBtn.addEventListener("click", () => {
  nextBtn.classList.add("active");
  setTimeout(() => {
    nextBtn.classList.remove("active");
  }, 200);

  activeIndex++;

  if (activeIndex >= images.length) {
    activeIndex = 0;
  }
  isFirstRender = false;
  updateSlider();
  updateDots();
});

prevBtn.addEventListener("click", () => {
  prevBtn.classList.add("active");
  setTimeout(() => {
    prevBtn.classList.remove("active");
  }, 200);

  activeIndex--;
  if (activeIndex < 0) {
    activeIndex = images.length - 1;
  }
  isFirstRender = false;
  updateSlider();
  updateDots();
});

function createDots() {
  images.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");

    if (index === 0) {
      dot.classList.add("active");
    }

    dotsContainer.append(dot);
  });
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === activeIndex);
  });
}
