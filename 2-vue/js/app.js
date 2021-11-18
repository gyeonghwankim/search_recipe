import SearchModel from "./models/SearchModel.js";

new Vue({
    el: "#app",
    data: {
        query: "",
        submitted: false,
        searchResult: [],
    },
    methods: {
        onSubmit(e) {
            this.search();
        },
        onReset(e) {
            this.resetForm();
            this.resetResult();
        },
        onKeyup(e) {
            if (!this.query.length) this.onReset(e);
        },
        search() {
            SearchModel.list().then((data) => {
                this.searchResult = data;
                this.submitted = true;
            });
        },

        resetForm() {
            this.query = "";
        },
        resetResult() {
            this.searchResult = [];
            this.submitted = false;
        },
    },
});
