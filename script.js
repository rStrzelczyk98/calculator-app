"use strict";

const body = document.querySelector("body");
const toggle = document.querySelector(".inputs");
const themes = document.querySelectorAll('input[type="radio"]');
const keyboard = document.querySelector(".keyboard");
let str = "";
let n = false;

toggle.addEventListener("click", function (e) {
  if (!e.target.classList.contains("active") && e.target.type === "radio") {
    themes.forEach((el) => el.classList.remove("active"));
    e.target.classList.add("active");
    body.className = "";
    body.classList.add(`${e.target.id}`);
  }
});

window.addEventListener("load", function (e) {
  if (
    this.matchMedia &&
    this.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    themes.forEach((el) => el.classList.remove("active"));
    themes[2].classList.add("active");
    body.classList.add(`${themes[2].id}`);
  } else if (
    this.matchMedia &&
    this.matchMedia("(prefers-color-scheme: light)").matches
  ) {
    themes.forEach((el) => el.classList.remove("active"));
    themes[1].classList.add("active");
    body.classList.add(`${themes[1].id}`);
  } else {
    themes.forEach((el) => el.classList.remove("active"));
    themes[0].classList.add("active");
    body.classList.add(`${themes[0].id}`);
  }
  body.classList.remove("hidden");
});

keyboard.addEventListener("click", function (e) {
  const output = document.querySelector(".output");
  if (!e.target.classList.contains("key")) return;
  if (
    /[-+x\/\,]/.test(str[0]) &&
    (e.target.classList.contains("operator") ||
      e.target.classList.contains("dot"))
  )
    return;

  if (str === "Infinity" || str === "NaN" || str === "undefined") {
    str = "";
    output.textContent = str;
    return;
  }
  if (e.target.textContent === "del") {
    if (n) {
      str = "";
    } else {
      str = str.slice(0, -1);
      str = str.replaceAll(".", ",").replaceAll("*", "x");
    }
  }
  if (!/[x\/\.\,]/.test(str[0]) && e.target.textContent === "=") {
    str = str.replaceAll(",", ".").replaceAll("x", "*");
    str = `${eval(str)}`;
    output.textContent = str === "NaN" || str === "undefined" ? "error" : str;
    n = true;
    return;
  }
  if (e.target.textContent === "reset") {
    str = "";
  }
  n = false;
  str += e.target.value;
  output.textContent = str;
});
