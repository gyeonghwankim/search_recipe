import FormView from "../views/FormView.js";
import ResultView from "../views/ResultView.js";
import TabView from "../views/TabView.js";
import KeywordView from "../views/KeywordView.js";
import SearchModel from "../models/SearchModel.js";

const tag = "[MainController]";

export default {
    init() {
        FormView.setup(document.querySelector("form"))
            .on("@submit", (e) => this.onSubmit(e.detail.input))
            .on("@reset", (e) => this.onReset());

        ResultView.setup(document.querySelector("#search-result"));

        TabView.setup(document.querySelector("#tabs")).on("@select", (e) =>
            this.onSelect(e.detail.tabName)
        );

        KeywordView.setup(document.querySelector("#keywords"));

        this.selectedTab = `추천 검색어`;
        this.renderView();
    },

    onSelect(tabName) {
        this.selectedTab = tabName;
        this.renderView();
    },

    onSubmit(input) {
        console.log(tag, "onSubmit()", input);
        this.search(input);
    },

    renderView() {
        console.log(tag, "renderView()");
        TabView.setActiveTab(this.selectedTab);
        ResultView.hide();
        KeywordView.render(this.selectedTab, ["a", "b"]);
    },

    search(query) {
        console.log(tag, "search()", query);
        //search API
        SearchModel.list(query).then((data) => {
            this.onSearchResult(data);
        });
    },

    onSearchResult(data = []) {
        ResultView.render(data);
    },

    onReset() {
        ResultView.hide();
        console.log(tag, "onReset()");
    },
};
