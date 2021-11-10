import FormView from "../views/FormView.js";
import ResultView from "../views/ResultView.js";
import TabView from "../views/TabView.js";
import KeywordView from "../views/KeywordView.js";
import HistoryView from "../views/HistoryView.js";
import SearchModel from "../models/SearchModel.js";
import KeywordModel from "../models/KeywordModel.js";
import HistoryModel from "../models/HistoryModel.js";

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

        KeywordView.setup(document.querySelector("#keywords")).on(
            "@click",
            (e) => this.onClickKeyword(e.detail.keyword)
        );

        HistoryView.setup(document.querySelector("#search-history"))
            .on("@click", (e) => this.onClickHistory(e.detail.keyword))
            .on("@remove", (e) => this.onClickRemoveButton(e.detail.keyword));

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
        this.addKeywordToHistory(input);
        KeywordView.hide();
    },

    renderView() {
        console.log(tag, "renderView()");
        TabView.setActiveTab(this.selectedTab);
        if (this.selectedTab === `추천 검색어`) {
            this.fetchSearchKeyword();
            HistoryView.hide();
        } else if (this.selectedTab === `최근 검색어`) {
            this.fetchHistoryKeyword();
            KeywordView.hide();
        }

        ResultView.hide();
        TabView.show();
    },

    search(query) {
        console.log(tag, "search()", query);
        FormView.setValue(query);
        SearchModel.list(query).then((data) => {
            this.onSearchResult(data);
        });
    },

    fetchSearchKeyword() {
        KeywordModel.list().then((data) => {
            KeywordView.render(data);
        });
    },

    fetchHistoryKeyword() {
        HistoryModel.list().then((data) => {
            HistoryView.render(data);
        });
    },

    onSearchResult(data = []) {
        ResultView.render(data);
        TabView.hide();
        KeywordView.hide();
        HistoryView.hide();
    },

    onReset() {
        this.renderView();
        console.log(tag, "onReset()");
    },

    onClickKeyword(keyword) {
        this.search(keyword);
        this.addKeywordToHistory(keyword);
    },

    onClickHistory(keyword) {
        this.search(keyword);
        this.addKeywordToHistory(keyword);
    },

    onClickRemoveButton(keyword) {
        HistoryModel.remove(keyword);
        this.fetchHistoryKeyword();
    },

    addKeywordToHistory(keyword) {
        HistoryModel.add(keyword);
    },
};
