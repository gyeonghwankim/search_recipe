<template id="tabs">
  <ul class="tabs">
    <li
      v-for="(tab, index) in tabs"
      v-bind:class="{ active: tab === selectedTab }"
      v-on:click="onClickTab(tab)"
      v-bind:key="index"
    >
      {{ tab }}
    </li>
  </ul>
</template>

<script>
export default {
  template: "#tabs",
  props: ["tabs", "selectedTab"],
  methods: {
    onClickTab(tab) {
      this.$emit("@change", tab);
    }
  }
};
</script>
