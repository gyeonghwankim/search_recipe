import View from "./View.js";

const tag = "[TabView]";
const TabView = Object.create(View);

TabView.setup = function (element) {
    this.init(element);
    this.tabs = Array.from(this.el.querySelectorAll("li"));
    this.bindEvents();
    return this;
};

TabView.bindEvents = function () {
    this.tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            this.emit("@select", { tabName: tab.innerText });
        });
    });
};

TabView.setActiveTab = function (tabName) {
    Array.from(this.el.querySelectorAll("li")).forEach((li) => {
        li.className = li.innerHTML === tabName ? "active" : "";
    });
};

export default TabView;
