import SearchModel from "./models/SearchModel.js";
import KeywordModel from "./models/KeywordModel.js";
import HistoryModel from "./models/HistoryModel.js";

new Vue({
    el: "#app",
    data: {
        query: "",
        submitted: false,
        searchResult: [],
        tabs: ["추천 검색어", "최근 검색어"],
        selectedTab: "",
        keywords: [],
        history: [],
    },
    created() {
        this.selectedTab = this.tabs[0];
        this.fetchKeyword();
        this.fetchHistory();
    },
    methods: {
        onSubmit(query) {
            this.query = query;
            this.search(query);
        },
        onReset(e) {
            this.resetForm();
            this.resetResult();
        },
        onKeyup(e) {
            if (!this.query.length) this.onReset(e);
        },
        search(query) {
            SearchModel.list().then((data) => {
                this.searchResult = data;
                this.submitted = true;
            });
            HistoryModel.add(query);
            this.fetchHistory();
        },
        resetForm() {
            this.query = "";
        },
        resetResult() {
            this.searchResult = [];
            this.submitted = false;
        },
        onClickTab(tab) {
            this.selectedTab = tab;
        },
        fetchKeyword() {
            KeywordModel.list().then((data) => {
                this.keywords = data;
            });
        },
        fetchHistory() {
            HistoryModel.list().then((data) => {
                this.history = data;
            });
        },
        deleteItem(keyword) {
            HistoryModel.remove(keyword);
            this.fetchHistory();
        },
    },
});
