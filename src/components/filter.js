import { Component } from "../lib/react.js";
import styledComponent from "../lib/styled-components.js";
import ListMovie from "./list-movie.js";
import { scrollInfinity } from "../utils/scroll-infinity.js";
import { createChildren } from "../lib/react-element.js";
import { dynamicStyle } from "../utils/dynamic-style.js";

const navStyle = styledComponent.nav`
  inline-size: auto;
  block-size: 30px;
  margin: 0;
  justify-content: space-between;
  align-items:center;
`;

const ulStyle = styledComponent.ul`
  margin: 0;
  list-style: none;
  gap: 3rem;
  padding: 0;
  display:flex;
`;
const liStyle = styledComponent.li`
  margin: 0;
  font: var(--body2-bold);
  display: flex;
  align-items: center;
`;
const filterButtonStyle = styledComponent.button`
  background: transparent;
  padding: 0;
  margin: 0;
  font: var(--button)
  text-decoration: none;
  user-select: none;
  border: 0;
  cursor: pointer;
`;
const formStyle = styledComponent.form`
  inline-size: 33rem;
  min-width: 9rem;
`;
const inputSearchStyle = styledComponent.input`
  border-radius: 8px 0px 0px 8px;
  border: 1px solid #FED941;
  inline-size: 100%;
  block-size: 2.75rem;
  outline: none;
  padding: 0 1rem 0 1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const containerButtomStyle = styledComponent.div`
  block-size: 2.75rem;
  inline-size: 4.5rem;
  margin: 0;
  position: relative;
  cursor: pointer;
  box-sizing: content-box;
`;
const inputButtomStyle = styledComponent.input`
  border-radius: 0px 8px 8px 0px;
  block-size: 2.75rem;
  inline-size: 100%;
  margin: 0;
  padding: 0;
  border: 1px solid #FED941;
  position: absolute;
  inset-inline-start: 0;
  background: #FED941;
  cursor: pointer;
`;
const iconSearchStyle = styledComponent.i`
  position: absolute;
  inset-inline-start: 20px;
  inset-block-start: 12px;
  font-size: 1.25rem;
`;
const navMobileStyle = styledComponent.nav`
  position: fixed;
  inset-block-start: 0;
  inset-inline-start: 0;
  inline-size: 100%;
  block-size: 100vh;
  background: transparent;
  backdrop-filter: blur(80px);
  margin: 0;
  display: none;
  justify-content: center;
  padding-block-start: 10rem;
`;
const ulMobileStyle = styledComponent.ul`
  margin: 0;
  list-style: none;
  gap: 3rem;
  padding: 0;
  display:flex;
  flex-direction: column;
  align-items:center;
`;
const liMobileStyle = styledComponent.li`
  margin: 0;
  font: var(--body2-bold);
  display: flex;
  align-items: center;
`;
const filterButtonMobileStyle = styledComponent.button`
  background: transparent;
  padding: 0;
  margin: 0;
  font: var(--button)
  text-decoration: none;
  user-select: none;
  color: var(--primary);
  border: 0;
  cursor: pointer;
`;
const buttonMobileStyle = styledComponent.button`
  block-size: 2rem;
  inline-size: 2rem;
  margin: 0;
  padding: 0;
  border: 0;
  position: relative;
  cursor: pointer;
  box-sizing: content-box;
  background: transparent;
  justify-content: space-between;
  align-items:center;
`;
const iconNavMobileStyle = styledComponent.i`
  font-size: 2rem;
  position: absolute;
  inset-block-start:0;
  inset-inline-start:0;
  z-index: 1;
`;
const iconSearchMobileStyle = styledComponent.i`
  font-size: 2rem;
`;

const containerTMDB = styledComponent.a`
  inline-size: 12rem;
  block-size: 2rem;
  position: absolute;
  inset-inline-start: -5rem;
  inset-block-start: 30rem;
  display:flex;
  transform: rotate(90deg);
`;

const containerTMDBMobile = styledComponent.a`
  inline-size: 12rem;
  block-size: 2rem;
  position: absolute;
  inset-block-start: 30rem;
`;


class Filter extends Component {

  eventAll = async () => {
    const page = 1;

    const $listMovie = document.querySelector(".container-list-movie");
    const $title = document.querySelector(".filter-title");
    const listMovie = await new ListMovie({
      page,
    }).render();

    $title.textContent = "Populares";
    $listMovie.innerHTML = "";

    listMovie.forEach(($el) => {
      $listMovie.appendChild($el);
    });
    scrollInfinity();
  };

  eventMostValue = async () => {
    const page = 1;
    const filter = "desc";

    const $listMovie = document.querySelector(".container-list-movie");
    const $title = document.querySelector(".filter-title");
    const listMovie = await new ListMovie({
      page,
      filter,
    }).render();

    $title.textContent = "Más Valoradas";
    $listMovie.innerHTML = "";

    listMovie.forEach(($el) => {
      $listMovie.appendChild($el);
    });

    scrollInfinity(filter);
  };

  eventLeastValue = async () => {
    const page = 1;
    const filter = "asc";

    const $listMovie = document.querySelector(".container-list-movie");
    const $title = document.querySelector(".filter-title");
    const listMovie = await new ListMovie({
      page,
      filter,
    }).render();

    $title.textContent = "Menos Valoradas";
    $listMovie.innerHTML = "";

    listMovie.forEach(($el) => {
      $listMovie.appendChild($el);
    });

    scrollInfinity(filter);
  };

  renderNav() {
    return navStyle(
      {
        class: "nav",
        children: [
          ulStyle(
            {
              class: "list-nav",
              children: [
                liMobileStyle({
                  children: filterButtonStyle(
                    {
                      class: "all filter",
                      ariaLabel: "Boton Filtrar Todos",
                      onClick: this.eventAll,
                    },
                    "Todas"
                  ),
                }),
                liMobileStyle({
                  children: filterButtonStyle(
                    {
                      ariaLabel: "Boton Filtrar Mas Valorados",
                      class: "most-value filter",
                      onClick: this.eventMostValue,
                    },
                    "Más valoradas"
                  ),
                }),
                liMobileStyle({
                  children: filterButtonStyle(
                    {
                      ariaLabel: "Boton Filtrar Menos Valorados",
                      class: "least-value filter",
                      onClick: this.eventLeastValue,
                    },
                    "Menos valoradas"
                  ),
                }),
              ],
            },
            ""
          ),
          containerTMDB(
            {
              class: "container-TMDB",
              href: "https://www.themoviedb.org/",
              children: [
                createChildren("img", {
                  class: "logo-TMDB",
                  src: "../../icon/logo-TMDB.svg",
                  alt: "Logo Atribuciones API TMDB",
                  height: 32,
                  width: 192,
                }),
              ],
            },
            ""
          ),
        ],
      },
      ""
    );
  }

  eventShowNav = () => {
    const $navMobile = document.querySelector(".nav-mobile");
    const $iconNavhMobile = document.querySelector("#menu-mobile");

    if(!this.isShowMobile){
      $navMobile.style.display = "flex"
    }

    if (!this.isShowMobile) {
      $navMobile.style.display = "flex";
      $iconNavhMobile.className = "icon-icon-close-yellow";
      this.isShowMobile = true;
    } else {
      $navMobile.style.display = "none";
      $iconNavhMobile.className = "icon-icon-hamburger-yellow";
      this.isShowMobile = false;
    }

  }

  renderNavMobile() {
    return buttonMobileStyle(
      {
        onClick: this.eventShowNav,
        // onResize: this.eventDynamicHeader,
        class: "button-nav-mobile",
        children: [
          iconNavMobileStyle(
            {
              ariaLabel: "Boton Desplegar Menu",
              class: "icon-icon-hamburger-yellow",
              id: "menu-mobile",
            },
            ""
          ),
          navMobileStyle(
            {
              class: "nav-mobile",
              children: [
                ulMobileStyle(
                  {
                    class: "list-nav",
                    children: [
                      liStyle({
                        children: filterButtonMobileStyle(
                          {
                            ariaLabel: "Boton Filtrar Todos",
                            class: "all filter",
                            onClick: this.eventAll,
                          },
                          "Todas"
                        ),
                      }),
                      liStyle({
                        children: filterButtonMobileStyle(
                          {
                            ariaLabel: "Boton Filtrar Mas Valorados",
                            class: "most-value filter",
                            onClick: this.eventMostValue,
                          },
                          "Más valoradas"
                        ),
                      }),
                      liStyle({
                        children: filterButtonMobileStyle(
                          {
                            ariaLabel: "Boton Filtrar Menos Valorados",
                            class: "least-value filter",
                            onClick: this.eventLeastValue,
                          },
                          "Menos valoradas"
                        ),
                      }),
                    ],
                  },
                  ""
                ),
                containerTMDBMobile(
                  {
                    class: "container-TMDB-mobile",
                    href: "https://www.themoviedb.org/",
                    children: [
                      createChildren("img", {
                        class: "logo-TMDB",
                        src: "../../icon/logo-TMDB.svg",
                        alt: "Logo Atribuciones API TMDB",
                      }),
                    ],
                  },
                  ""
                ),
              ],
            },
            ""
          ),
        ],
      },
      ""
    );
  }

  eventSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = formData.get("search");

    const page = 1;
    const filter = "search";

    const $listMovie = document.querySelector(".container-list-movie");
    const $title = document.querySelector(".filter-title");

    if (query === "") {
      this.eventAll();
    } else {
      const listMovie = await new ListMovie({
        page,
        filter,
        query,
      }).render();

      $title.textContent = `"${query}"`;
      $listMovie.innerHTML = "";

      listMovie.forEach(($el) => {
        $listMovie.appendChild($el);
      });

      scrollInfinity(filter, query);
    }
  };

  renderSearch() {
    return formStyle({
      role: "region",
      "aria-label": "Form",
      class: "search",
      onSubmit: this.eventSubmit,
      children: [
        inputSearchStyle(
          {
            role: "region",
            "aria-label": "Search",
            type: "search",
            name: "search",
            id: "search",
            placeholder: "Busca tu Pelicula",
          },
          ""
        ),
        containerButtomStyle(
          {
            role: "region",
            "aria-label": "Boton Buscar",
            class: "container-buttom",
            children: [
              inputButtomStyle(
                { type: "submit", value: "", name: "submit" },
                ""
              ),
              iconSearchStyle({ class: "icon-icon-search" }, ""),
            ],
          },
          ""
        ),
      ],
    });
  }

  eventShowSearch = () => {

    const $logo = document.querySelector(".container-logo");
    const $iconSearchMobile = document.querySelector("#search-mobile");
    const $formSearch = document.querySelector(".search");
    const $iconNavhMobile = document.querySelector(".button-nav-mobile");

    if (!this.isShowMobile) {
      $formSearch.style.display = "flex";
      $logo.style.display = "none";
      $iconNavhMobile.style.display = "none"
      $iconSearchMobile.className = "icon-icon-back-yellow";
      this.isShowMobile = true;
    } else {
      $formSearch.style.display = "none";
      $logo.style.display = "block";
      $iconNavhMobile.style.display = "block";
      $iconSearchMobile.className = "icon-icon-search-yellow";
      this.isShowMobile = false;
    }
  };

  eventDynamicHeader = () => {

    if (this.props.isInnerHeight === 0) {

      this.props.isInnerHeight = window.innerHeight;
    }

    const $formSearch = document.querySelector(".search");
    const $logo = document.querySelector(".logo");
    const $iconSearchMobile = document.querySelector("#search-mobile");
    const $iconNavhMobile = document.querySelector(".button-nav-mobile");

    if (window.screen.width > 1200) {
      $formSearch.style.display = "flex";
      $logo.style.display = "block";
      $iconNavhMobile.style.display = "none";
    }
    else if (
      window.screen.width < 1200 &&
      window.screen.height == this.props.isInnerHeight
    ) {
      $formSearch.style.display = "none";
      $logo.style.display = "block";
      $iconNavhMobile.style.display = "block";
      $iconSearchMobile.className = "icon-icon-search-yellow";
    }
  };

  renderSearchMobile() {
    return buttonMobileStyle(
      {
        onClick: this.eventShowSearch,
        onResize: this.eventDynamicHeader,
        "aria-label": "Boton Buscar Pelicula",
        class: "button-search-mobile",
        children: iconSearchMobileStyle(
          { class: "icon-icon-search-yellow", id: "search-mobile" },
          ""
        ),
      },
      ""
    );
  }
}

export default Filter;
