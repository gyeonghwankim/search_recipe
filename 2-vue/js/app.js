new Vue({
    el: "#app",
    data: {
        query: "",
    },
    methods: {
        onSubmit(e) {
            debugger;
        },
        onReset(e) {
            this.query = "";
            console.log("onReset");
            // ToDo 검색결과를 숨기는 로직 추가
        },
        onKeyup(e) {
            if (!this.query.length) this.onReset(e);
        },
    },
});
