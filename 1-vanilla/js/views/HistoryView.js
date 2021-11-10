import View from "./View.js";

const tag = "[HistoryView]";
const HistoryView = Object.create(View);

HistoryView.message = {
    NO_HISTORY: "최근 검색어가 없습니다.",
};

HistoryView.setup = function (element) {
    this.init(element);
    return this;
};

HistoryView.render = function (data = []) {
    console.log(tag, "render()", data);
    this.el.innerHTML = data.length
        ? this.getHistoryHtml(data)
        : this.message.NO_HISTORY;
    this.bindEvents();
    this.show();
};

HistoryView.getHistoryHtml = function (data) {
    return (
        data.reduce((html, item) => {
            html += `<li data-keyword="${item.keyword}">
            ${item.keyword}
            <span class="date">${item.date}</span>
            <button class="btn-remove"></button>
            </li>
            `;
            return html;
        }, '<ul class="list">') + "</ul>"
    );
};

HistoryView.bindEvents = function () {
    Array.from(this.el.querySelectorAll("li")).forEach((li) => {
        li.addEventListener("click", (e) => this.onClickHistory(e));
    });
    Array.from(this.el.querySelectorAll("button.btn-remove")).forEach(
        (removeButton) => {
            removeButton.addEventListener("click", (e) => {
                e.stopPropagation();
                this.onClickRemoveButton(removeButton.parentElement.dataset);
            });
        }
    );
};

HistoryView.onClickHistory = function (e) {
    const { keyword } = e.currentTarget.dataset;
    this.emit("@click", { keyword });
};

HistoryView.onClickRemoveButton = function (e) {
    const { keyword } = e;
    this.emit("@remove", { keyword });
};

export default HistoryView;
