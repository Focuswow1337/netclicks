// ПЕРЕМЕННЫЕ
const leftMenu = document.querySelector(".left-menu"),
  hamburger = document.querySelector(".hamburger");

let imagesForCard = document.querySelectorAll(".tv-card__img");

imagesForCard.forEach((item) => {
  // let imagesCard = document.querySelector(".tv-card__img");
  let oldImagesCard = item.getAttribute("src");

  item.addEventListener("mouseover", () => {
    let newImagesCard = item.getAttribute("data-backdrop");

    if (!(newImagesCard === "")) {
      item.setAttribute("src", newImagesCard);
    }
  });

  item.addEventListener("mouseout", () => {
    item.setAttribute("src", oldImagesCard);
  });
});

const changeImageCard = () => {
  let imagesCard = document.querySelector(".tv-card__img");
  let oldImagesCard = imagesCard.getAttribute("src");

  imagesCard.addEventListener("mouseover", () => {
    let newImagesCard = imagesCard.getAttribute("data-backdrop");
    imagesCard.setAttribute("src", newImagesCard);
  });

  imagesCard.addEventListener("mouseout", () => {
    imagesCard.setAttribute("src", oldImagesCard);
  });
};

// changeImageCard();

// СОБЫТИЯ. ОБРАБОТЧИКИ СОБЫТИЙ

// Открытие/закрыти меню по кнопке
hamburger.addEventListener("click", (event) => {
  leftMenu.classList.toggle("openMenu");
  hamburger.classList.toggle("open");
});
// Закрытие меню при клике вне меню
document.addEventListener("click", (event) => {
  if (!event.target.closest(".left-menu")) {
    leftMenu.classList.remove("openMenu");
    hamburger.classList.remove("open");
  }
});

// открытие dropdown
leftMenu.addEventListener("click", (event) => {
  const target = event.target;
  const dropdown = target.closest(".dropdown");
  if (dropdown) {
    dropdown.classList.toggle("active");
    leftMenu.classList.add("openMenu");
    hamburger.classList.add("open");
  }
});
// ФУНКЦИИ

// ВЫЗОВ ФУНКЦИИ
