import chroma from "chroma-js";

window.chroma = chroma;

const getRandomColor = () => chroma.random().hex();

class ColorBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --size: 95px;
        --color: black;
      }

      .container {
        display: grid;
        place-items: center;
        color: var(--text-color, #fff);
        font-family: "Victor Mono", monospace;
        font-size: 1.2rem;
        font-weight: bold;
        width: var(--size);
        height: var(--size);
        background: var(--color);
        border-radius: 5px;
        border: 4px solid white;
        box-shadow:
          -3px -3px 15px #0005 inset,
          3px 3px 4px #0008;
        user-select: none;
      }

      /*
      :host {
        opacity: 0;
      }
      */

    `;
  }

  connectedCallback() {
    const defaultColor = getRandomColor();
    const color = this.getAttribute("color") || defaultColor;
    const isValidColor = chroma.valid(color);
    this.color = isValidColor ? color : defaultColor;
    this.render();
    this.showAnimation();
    this.update();
  }

  showAnimation() {
    const n = Math.floor(Math.random() * 4);

    const options = {
      duration: 500,
      easing: "ease",
      fill: "forwards"
    };

    n === 0 && this.animate([{ opacity: "0" }, { opacity: "1" }], options);
    n === 1 && this.animate([{ scale: "0" }, { scale: "1" }], options);
    n === 2 && this.animate([{ translate: "0 -200px" }, { translate: "0 0" }], options);
    n === 3 && this.animate([{ scale: "0", rotate: "0" }, { scale: "1", rotate: "360deg" }], options);
  }

  setText(hex) {
    const container = this.shadowRoot.querySelector(".container");
    const isValidContrast = chroma.contrast("#ffffff", hex) > 4.5;
    container.textContent = chroma(hex).hex();
    this.style.setProperty("--text-color", isValidContrast ? "white" : "black");
  }

  update() {
    this.setText(this.color);
    this.style.setProperty("--color", this.color);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ColorBox.styles}</style>
    <div class="container off">
    </div>`;
  }
}

customElements.define("color-box", ColorBox);
