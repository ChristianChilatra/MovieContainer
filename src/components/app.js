import { Component } from "../lib/react.js";
import { createElement, createChildren } from "../lib/react-element.js";
import styledComponent from "../lib/styled-components.js";
import Header from "./header.js";
import Banner from "./banner.js";
import ListMovie from "./list-movie.js";

const AppStyle = styledComponent.div`
  background: transparent;
  inline-size: auto;
  block-size: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const titleStyle = styledComponent.h1`
  font: var(--headline1);
  margin: 0;
`;

const containerMovieStyle = styledComponent.div`
  inline-size: 100%;
  block-size: auto;
  display:grid;
  grid-gap: 1rem;
  justify-content: center;
`;
class App extends Component {


  async render() {

    return createElement("body", {
      children: [
        new Header().render(),
        AppStyle(
          {
            class: "wrapper",
            children: [
              new Banner().render(),
              titleStyle({ class: "titleFilter" }, ""),
              containerMovieStyle(
                {
                  class: "containerMovieStyle",
                  children: [
                    ...(await new ListMovie({ page: 1 }).render()),
                  ],
                },
                ""
              ),
              createElement("div", { class: "colaider" }, ""),
            ],
          },
          ""
        ),
      ],
    });
  }
}

export default App;
