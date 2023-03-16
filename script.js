'use strict';

const body = document.querySelector('body');
const toggle = document.querySelector('.inputs');
const themes = document.querySelectorAll('input[type="radio"]');
const keyboard = document.querySelector('.keyboard');

toggle.addEventListener('click', function (e) {
  if (!e.target.classList.contains('active') && e.target.type === 'radio') {
    themes.forEach(el => el.classList.remove('active'));
    e.target.classList.add('active');
    body.className = '';
    body.classList.add(`${e.target.id}`);
  }
});

window.addEventListener('load', function (e) {
  if (
    this.matchMedia &&
    this.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    themes.forEach(el => el.classList.remove('active'));
    themes[2].classList.add('active');
    body.className = '';
    body.classList.add(`theme-3`);
  } else if (
    this.matchMedia &&
    this.matchMedia('(prefers-color-scheme: light)').matches
  ) {
    themes.forEach(el => el.classList.remove('active'));
    themes[1].classList.add('active');
    body.className = '';
    body.classList.add(`theme-2`);
  } else {
    themes.forEach(el => el.classList.remove('active'));
    themes[0].classList.add('active');
    body.className = '';
    body.classList.add(`theme-1`);
  }
});

let str = '';
let n = false;
keyboard.addEventListener('click', function (e) {
  const output = document.querySelector('.output');
  if (!e.target.classList.contains('key')) return;
  if (e.target.textContent === 'del') {
    if (n) {
      str = '';
    } else {
      str = str.slice(0, -1);
      str = str.replaceAll('.', ',').replaceAll('*', 'x');
    }
  } else if (e.target.textContent === '=') {
    str = str.replaceAll(',', '.').replaceAll('x', '*');
    str = `${eval(str)}`.replace('.', ',');
    n = true;
  } else if (e.target.textContent === 'reset') {
    str = '';
  } else {
    str += e.target.value;
  }
  n = false;
  output.textContent = str;
});
