import View from "./View.js";
const tag = "[FormView]";

const FormView = Object.create(View);

FormView.setup = function (element) {
    this.init(element);
    this.inputElement = element.querySelector("[type=text]");
    this.resetElement = element.querySelector("[type=reset]");
    this.showResetButton(false);
    this.bindEvents();
    return this;
};

FormView.showResetButton = function (show = true) {
    this.resetElement.style.display =
        show && this.inputElement.value.length ? "block" : "none";
};

FormView.bindEvents = function () {
    this.on("submit", (e) => e.preventDefault());
    this.inputElement.addEventListener("keyup", (e) => this.onKeyup(e));
    this.resetElement.addEventListener("click", (e) =>
        this.onClickResetButton(e)
    );
};

FormView.onKeyup = function (e) {
    const enter = 13;
    this.showResetButton(this.inputElement.value.length);
    if (!this.inputElement.value.length) this.emit("@reset");
    if (e.keyCode !== enter) return;
    this.emit("@submit", { input: this.inputElement.value });
};

FormView.onClickResetButton = function (e) {
    this.emit("@reset");
    this.showResetButton(false);
};

export default FormView;
