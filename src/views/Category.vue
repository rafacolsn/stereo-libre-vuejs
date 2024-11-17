<template>
  <div v-if="!loading" class="content">
    <card-header :episodes="sortedEpisodes" :title="title"
                 :style="headerStyle" with-select></card-header>
    <div v-if="loading" class="loading">
      Un moment svp, ça arrive... :)
      <pulse-loader :color="color"></pulse-loader>
    </div>
    <div class="cards">
      <Card v-for="podcast in sortedEpisodes" :key="'podcast_'+podcast.id" :post="podcast"></Card>
    </div>

  </div>
</template>

<script>
import Card from "@/components/Card";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import {mapGetters, mapState} from "vuex";
import CardHeader from "@/components/CardHeader";

export default {
  name: "Category",
  computed: {
    ...mapState("post", ["loading", "color", "category"]),
    ...mapGetters('post', ['getCategoryById', "getColorById", "sortedEpisodesByCategory"]),
    title() {
      return this.category?.name?.toUpperCase()
    },
    sortedEpisodes() {
      return this.sortedEpisodesByCategory;
    },
    headerStyle() {
      return `border-bottom: 1rem solid ${this.color}`;
    }
  },
  components: {
    Card,
    PulseLoader,
    CardHeader
  },
  watch: {
    '$route.params.id': {
      handler: async function (value) {
        if (this.category && this.category.id === value) {
          return;
        }
        await this.$store.dispatch("post/getPostsByCategoryId", value);
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
</style>