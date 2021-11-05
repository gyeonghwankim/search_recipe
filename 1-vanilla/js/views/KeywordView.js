import View from "./View.js";

const tag = "[KeywordView]";
const KeywordView = Object.create(View);

KeywordView.setup = function (element) {
    this.init(element);
    return this;
};

KeywordView.render = function (selectedTab, data = []) {
    console.log(tag, "render()", selectedTab, data);
    this.el.innerHTML = this.getKeywordHtml(data);
    this.show();
};

KeywordView.getKeywordHtml = function (data) {
    return (
        data.reduce((html, item) => {
            html += `<li>${item}</li>`;
            return html;
        }, "<ul>") + "</ul>"
    );
};

export default KeywordView;
