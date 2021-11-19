export default {
    template: "#keyword-list",
    props: ["data", "type"],
    computed: {
        keywordType() {
            return this.type === "keyword";
        },
        historyType() {
            return this.type === "history";
        },
    },
    methods: {
        onClickItem(keyword) {
            this.$emit("@click", keyword);
        },
        onRemoveItem(keyword) {
            this.$emit("@remove", keyword);
        },
    },
};
