import "./components/ColorBox.js";

// https://developer.chrome.com/blog/entry-exit-animations/

const container = document.querySelector(".container");

document.body.addEventListener("click", () => {
  const colorBox = document.createElement("color-box");
  container.append(colorBox);
});
