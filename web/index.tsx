import "react-hot-loader";
import React from "react";
import { render } from "react-dom";
import App from "./App";
import { init } from "./links";

let fontCss = document.getElementById("font");
if (fontCss === null) {
  fontCss = document.createElement("link");
  fontCss.id = "font";
  fontCss.setAttribute("rel", "stylesheet");
  fontCss.setAttribute(
    "href",
    "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
  );
  document.body.appendChild(fontCss);
}

let el = document.getElementById("app");
if (el === null) {
  el = document.createElement("div");
  el.id = "app";
  document.body.appendChild(el);
}
render(<App />, el);
init();

if (module.hot) {
  module.hot.accept();
}
