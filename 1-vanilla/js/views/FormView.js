import View from './View.js';

const tag = '[FormView]';

const FormView = Object.create(View);

FormView.setup = function (element) {
    this.init(element);
    this.inputElement = element.querySelector('[type=text]');
    this.resetElement = element.querySelector('[type=reset]');
    this.showResetButton(false);
};

FormView.showResetButton = function(show = true){
    this.resetElement.style.display = show ? 'block' : 'none';
}

export default FormView;