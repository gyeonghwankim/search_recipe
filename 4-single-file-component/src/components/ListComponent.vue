<template id="keyword-list">
  <div v-if="data.length">
    <ul class="list">
      <li
        v-for="(item, index) in data"
        v-on:click="onClickItem(item.keyword)"
        v-bind:key="index"
      >
        <span v-if="keywordType" class="number">{{ index + 1 }}</span>
        <span v-if="historyType" class="date">{{ item.date }}</span>
        {{ item.keyword }}

        <button
          v-if="historyType"
          class="btn-remove"
          v-on:click.stop="onRemoveItem(item.keyword)"
        ></button>
      </li>
    </ul>
  </div>
  <div v-else>
    <span v-if="keywordType">추천 검색어가 없습니다</span>
    <span v-if="historyType">최근 검색어가 없습니다</span>
  </div>
</template>

<script>
export default {
  template: "#keyword-list",
  props: ["data", "type"],
  computed: {
    keywordType() {
      return this.type === "keyword";
    },
    historyType() {
      return this.type === "history";
    }
  },
  methods: {
    onClickItem(keyword) {
      this.$emit("@click", keyword);
    },
    onRemoveItem(keyword) {
      this.$emit("@remove", keyword);
    }
  }
};
</script>
