// ПЕРЕМЕННЫЕ
const leftMenu = document.querySelector(".left-menu"),
  hamburger = document.querySelector(".hamburger"),
  modal = document.querySelector(".modal"),
  tvShowList = document.querySelector(".tv-shows__list"),
  tvShows = document.querySelector(".tv-shows"),
  tvCardImg = document.querySelector(".tv-card__img"),
  modalTitle = document.querySelector(".modal__title"),
  genresList = document.querySelector(".genres-list"),
  rating = document.querySelector(".rating"),
  description = document.querySelector(".description"),
  modalLink = document.querySelector(".modal__link"),
  searchFormInput = document.querySelector(".search__form-input"),
  searchForm = document.querySelector(".search__form");

// КОНСТАНТЫ
const IMG_URL = "https://image.tmdb.org/t/p/w185_and_h278_bestv2",
  API_KEY = "5189f5be8b28c15f8b6340d26142c3ec",
  SERVER = "https://api.themoviedb.org/3";

// ПРЕЛОУДЕР
const loading = document.createElement("div");
loading.className = "loading";

class DBService {
  getData = async (url) => {
    const res = await fetch(url);

    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Не удалось получить данные по адресу ${url}`);
    }
  };

  getTestData = () => {
    return this.getData("test.json");
  };

  getTestCard = () => {
    return this.getData("card.json");
  };

  getSearchResult = (query) => {
    return this.getData(
      `${SERVER}/search/tv?api_key=${API_KEY}&query=${query}&language=ru-RU`
    );
  };

  getTvShow = (id) => {
    return this.getData(`${SERVER}/tv/${id}?api_key=${API_KEY}&language=ru-RU`);
  };
}

const result = new DBService().getSearchResult("Няня");

console.log(result);
// РЕНДЕР КАРТОЧЕК
const renderCard = (response) => {
  tvShowList.textContent = "";

  response.results.forEach((item) => {
    const {
      backdrop_path: backdrop,
      name: title,
      poster_path: poster,
      vote_average: vote,
      id,
    } = item;

    const posterIMG = poster ? IMG_URL + poster : "img/no-poster.jpg";
    const backdropIMG = backdrop ? IMG_URL + backdrop : "";
    const voteElem = vote ? `<span class="tv-card__vote">${vote}</span>` : "";

    const card = document.createElement("li");
    card.idTV = id;
    card.className = "tv-shows__item";
    card.innerHTML = `
            <a href="#" id=${id} class="tv-card">
                ${voteElem}
                <img class="tv-card__img"
                  src="${posterIMG}"
                  data-backdrop="${backdropIMG}"
                  alt="${title}">
                <h4 class="tv-card__head">${title}</h4>
            </a>`;
    loading.remove();
    tvShowList.append(card);
  });
};

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = searchFormInput.value.trim();

  if (value) {
    tvShows.append(loading);
    new DBService().getSearchResult(value).then(renderCard);
  }
  searchFormInput.value = "";
});

// ФУНКЦИИ

// ЗАМЕНА Изображений карточек фильмов

const changeImage = (event) => {
  const card = event.target.closest(".tv-shows__item");

  if (card) {
    const img = card.querySelector(".tv-card__img");

    if (img.dataset.backdrop) {
      [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
    }
  }
};

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
  event.preventDefault();
  const target = event.target;
  const dropdown = target.closest(".dropdown");
  if (dropdown) {
    dropdown.classList.toggle("active");
    leftMenu.classList.add("openMenu");
    hamburger.classList.add("open");
  }
});

// открытие модального окна
tvShowList.addEventListener("click", (event) => {
  event.preventDefault();

  const target = event.target;
  const card = target.closest(".tv-card");

  if (card) {
    new DBService()
      .getTvShow(card.id)
      .then(
        ({
          poster_path: posterPath,
          name: title,
          genres,
          vote_average: voteAverage,
          overview,
          homepage,
        }) => {
          tvCardImg.src = IMG_URL + posterPath;
          tvCardImg.alt = title;
          modalTitle.textContent = title;
          // genresList.innerHTML = response.genres.reduse((acc, item) => `${acc}<li>${item.name}</li>`, "");
          genresList.textContent = "";
          for (const item of genres) {
            genresList.innerHTML += `<li>${item.name}</li>`;
          }
          rating.textContent = voteAverage;
          description.textContent = overview;
          modalLink.href = homepage;
        }
      )
      .then(() => {
        document.body.style.overflow = "hidden";
        modal.classList.remove("hide");
      });
  }
});

// закрытие модального окна

modal.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("modal") ||
    event.target.closest(".cross")
  ) {
    document.body.style.overflow = "";
    modal.classList.add("hide");
  }
});

// Замена картинок в карточке
tvShowList.addEventListener("mouseover", changeImage);
tvShowList.addEventListener("mouseout", changeImage);

// ВЫЗОВ ФУНКЦИИ
