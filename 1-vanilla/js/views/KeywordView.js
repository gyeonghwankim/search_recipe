import View from "./View.js";

const tag = "[KeywordView]";
const KeywordView = Object.create(View);

KeywordView.setup = function (element) {
    this.init(element);
    return this;
};

KeywordView.render = function (data = [], message) {
    console.log(tag, "render()", data);
    this.el.innerHTML = data.length ? this.getKeywordHtml(data) : `${message}`;
    this.bindEvents();
    this.show();
};

KeywordView.getKeywordHtml = function (data) {
    return (
        data.reduce((html, item, index) => {
            html += `<li data-keyword="${item.keyword}">
            <span class="number">${index + 1}</span>
            ${item.keyword}
            </li>
            `;
            return html;
        }, '<ul class="list">') + "</ul>"
    );
};

KeywordView.bindEvents = function () {
    Array.from(this.el.querySelectorAll("li")).forEach((li) => {
        li.addEventListener("click", (e) => this.onClickKeyword(e));
    });
};

KeywordView.onClickKeyword = function (e) {
    const { keyword } = e.currentTarget.dataset;
    this.emit("@click", { keyword });
};

export default KeywordView;
