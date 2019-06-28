import "react-hot-loader";
import React from "react";
import { render } from "react-dom";
import App from "./App";
import { initStorage } from "./links";

function init() {
  const fontCss = document.createElement("link");
  fontCss.setAttribute("rel", "stylesheet");
  fontCss.setAttribute(
    "href",
    "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
  );
  document.body.appendChild(fontCss);
  const el = document.createElement("div");
  document.body.appendChild(el);
  render(<App />, el);
  initStorage();
}

init();
