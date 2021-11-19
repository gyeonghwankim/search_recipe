<template>
  <div>
    <header>
      <h2 class="container">검색</h2>
    </header>
    <div class="container">
      <search-form
        v-bind:value="query"
        v-on:@submit="onSubmit"
        v-on:@reset="onReset"
      ></search-form>
      <div class="content">
        <div v-if="submitted">
          <search-result v-bind:data="searchResult" v-bind:query="query">
          </search-result>
        </div>
        <div v-else>
          <tabs
            v-bind:tabs="tabs"
            v-bind:selected-tab="selectedTab"
            v-on:@change="onClickTab"
          ></tabs>
          <div v-if="selectedTab === tabs[0]">
            <keyword-list
              v-bind:data="keywords"
              type="keyword"
              v-on:@click="onSubmit"
            ></keyword-list>
          </div>
          <div v-else>
            <keyword-list
              v-bind:data="history"
              type="history"
              v-on:@click="onSubmit"
              v-on:@remove="deleteItem"
            ></keyword-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchModel from "./models/SearchModel.js";
import KeywordModel from "./models/KeywordModel.js";
import HistoryModel from "./models/HistoryModel.js";

import FormComponent from "./components/FormComponent.vue";
import ListComponent from "./components/ListComponent.vue";
import ResultComponent from "./components/ResultComponent.vue";
import TabComponent from "./components/TabComponent.vue";

export default {
  name: "app",
  data() {
    return {
      query: "",
      submitted: false,
      searchResult: [],
      tabs: ["추천 검색어", "최근 검색어"],
      selectedTab: "",
      keywords: [],
      history: []
    };
  },
  components: {
    "search-form": FormComponent,
    "search-result": ResultComponent,
    "keyword-list": ListComponent,
    tabs: TabComponent
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
      SearchModel.list().then(data => {
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
      KeywordModel.list().then(data => {
        this.keywords = data;
      });
    },
    fetchHistory() {
      HistoryModel.list().then(data => {
        this.history = data;
      });
    },
    deleteItem(keyword) {
      HistoryModel.remove(keyword);
      this.fetchHistory();
    }
  }
};
</script>
