import { createElement, createChildren } from "../lib/react-element.js";
import { Component } from "../lib/react.js";
import styledComponent from "../lib/styled-components.js";
import { movieBanner, trailerMovie } from "../services/data.js";

const bannerStyle = styledComponent.section`
  inline-size: auto;
  display: flex;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
`;

const containerMovieBannerStyle = styledComponent.div`
  position: absolute;
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-behavior: smooth;
`;

const movieStyle = styledComponent.div`
  block-size: auto;
  background-size: cover;
  flex-shrink: 0;
  border-radius: 8px;
  position: relative;
  display: grid;
  background-position-x: center;
`;

const playButtonBannerStyle = styledComponent.button`
  grid-area: play;
  inline-size: auto;
  block-size: 3rem;
  border-radius: 0.25rem;
  background: var(--primary);
  padding: 0 2rem;
  border: 1px solid var(--primary);
  font: var(--button);
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: var(--black);
  box-sizing: content-box;
  cursor: pointer;
`;
const addButtonBannerStyle = styledComponent.button`
  grid-area: add;
  inline-size: auto;
  block-size: 3rem;
  border-radius: 0.25rem;
  padding: 0 2rem;
  background: var(--black);
  border: 1px solid var(--primary);
  font: var(--button);
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: var(--primary);
  box-sizing: content-box;
  cursor: pointer;
`;
const selectedBannerStyle = styledComponent.div`
  inline-size: 5rem;
  block-size: 2rem;
  position: relative;
  inset-block-end: -100%;
  display:flex;
  gap: 1rem;
  align-items: center;
`;

const textSelectedBannerStyle = styledComponent.a`
  line-height: 0;
  font-size: 0;
  color: transparent;
`;

const refStyle = styledComponent.div`
  inline-size: 1rem;
  block-size: 1rem;
  margin: 0;
  border-radius: 50%;
`;
function background(url) {
  return `background: url('${url}');`;
}

const { imgPathMovie, idMovie } = await movieBanner();

class Banner extends Component {
  eventTrailerMovie = async (event) => {
    const id = event.path.find(el => el.id != undefined && el.id != '').id
    const data = await trailerMovie({id : id});

    if(data.results.length != 0){
      window.location = `https://www.youtube.com/watch?v=${data.results[0].key}`;
    }else{
      window.alert('Pelicula no cuenta con Trailer');
    }
  };

  render() {
    return bannerStyle(
      {
        class: "banner",
        role: "region",
        "aria-label": "Banner",
        children: [
          containerMovieBannerStyle({
            class: "container-movie-banner",
            children: [
              movieStyle(
                {
                  class: "movie-banner",
                  id: "movie-banner-1",
                  children: [
                    playButtonBannerStyle(
                      {
                        "aria-label": "Boton Reproducir Trailer Banner",
                        onClick: this.eventTrailerMovie,
                        class: "button-banner play",
                        id: idMovie[0],
                        children: [
                          createChildren("i", { class: "icon-icon-play" }),
                          createChildren("p", {}, "VER AHORA"),
                        ],
                      },
                      ""
                    ),
                    addButtonBannerStyle(
                      {
                        "aria-label": "Boton Agregar Trailer Banner",
                        class: "button-banner add",
                        children: [
                          createChildren("i", { class: "icon-icon-plus" }),
                          createChildren("p", {}, "VER DESPUÉS"),
                        ],
                      },
                      ""
                    ),
                  ],
                },
                "",
                background(imgPathMovie[0])
              ),
              movieStyle(
                {
                  class: "movie-banner",
                  id: "movie-banner-2",
                  children: [
                    playButtonBannerStyle(
                      {
                        "aria-label": "Boton Reproducir Trailer Banner",
                        onClick: this.eventTrailerMovie,
                        class: "button-banner play",
                        id: idMovie[1],
                        children: [
                          createChildren("i", { class: "icon-icon-play" }),
                          createChildren("p", {}, "VER AHORA"),
                        ],
                      },
                      ""
                    ),
                    addButtonBannerStyle(
                      {
                        "aria-label": "Boton Agregar Trailer Banner",
                        class: "button-banner add",
                        children: [
                          createChildren("i", { class: "icon-icon-plus" }),
                          createChildren("p", {}, "VER DESPUÉS"),
                        ],
                      },
                      ""
                    ),
                  ],
                },
                "",
                background(imgPathMovie[1])
              ),
              movieStyle(
                {
                  class: "movie-banner",
                  id: "movie-banner-3",
                  children: [
                    playButtonBannerStyle(
                      {
                        "aria-label": "Boton Reproducir Trailer Banner",
                        onClick: this.eventTrailerMovie,
                        class: "button-banner play",
                        id: idMovie[2],
                        children: [
                          createChildren("i", { class: "icon-icon-play" }),
                          createChildren("p", {}, "VER AHORA"),
                        ],
                      },
                      ""
                    ),
                    addButtonBannerStyle(
                      {
                        "aria-label": "Boton Agregar Trailer Banner",
                        class: "button-banner add",
                        children: [
                          createChildren("i", { class: "icon-icon-plus" }),
                          createChildren("p", {}, "VER DESPUÉS"),
                        ],
                      },
                      ""
                    ),
                  ],
                },
                "",
                background(imgPathMovie[2])
              ),
            ],
          }),
          selectedBannerStyle({
            class: "selected-banner",
            children: [
              textSelectedBannerStyle(
                { href: "#movie-banner-1", children: refStyle({}, "") },
                "Select Banner First"
              ),
              textSelectedBannerStyle(
                { href: "#movie-banner-2", children: refStyle({}, "") },
                "Select Banner Second"
              ),
              textSelectedBannerStyle(
                { href: "#movie-banner-3", children: refStyle({}, "") },
                "Select Banner Third"
              ),
            ],
          }),
        ],
      },
      ""
    );
  }
}

export default Banner;
