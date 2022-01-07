import { render } from "./react-dom.js";

export function createElement(type, props, content) {
  const $element = document.createElement(type);

  $element.textContent = content;

  for (const key in props) {
    if(key === 'children'){
      if (Array.isArray(props[key])) {
        props[key].forEach((el) => {
          render(el, $element);
        });
      } else {
        render(props[key], $element);
      }
    }if (key.startsWith("on")) {
      const evento = key.replace('on','').toLowerCase()
      $element.addEventListener("resize", props[key]);
    } else {
      $element.setAttribute(key, props[key]);
    }
  }

  return $element;
}

export function createChildren(type, props, content) {
  return createElement(type, props, content);
}