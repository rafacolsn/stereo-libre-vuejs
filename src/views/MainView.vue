<template>
  <div class="content">
    <card-header :episodes="podcasts" :title="title" :with-search="!isCategory" :with-select="isCategory"
                 :style="headerStyle"></card-header>
    <div v-if="loading" class="loading">
      Un moment svp, ça arrive... :)
      <pulse-loader :color="color"></pulse-loader>
    </div>
    <div class="cards" v-else>
      <Card v-for="podcast in podcasts" :key="'podcast_'+podcast.id" :podcastId="podcast.id"></Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card';
import {mapGetters, mapState} from 'vuex';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import CardHeader from "@/components/CardHeader";
import {getColorById} from "@/utils/colors";

export default {
  name: "MainView",
  metaInfo() {
    if (this.isCategory) {
      if (!this.category) return {};
      const name = this.category.name;
      return {
        title: name,
        meta: [
          {vmid: 'description', name: 'description', content: `Tous les épisodes de Stéréo Libre dans la catégorie ${name}.`},
          {vmid: 'og:title', property: 'og:title', content: name},
          {vmid: 'og:description', property: 'og:description', content: `Tous les épisodes de Stéréo Libre dans la catégorie ${name}.`},
        ]
      };
    }
    return {};
  },
  computed: {
    ...mapState("post", ["loading", 'searchQuery']),
    ...mapGetters("post", ['filteredPodcasts', 'findCategory', "sortedLastEpisodes", "getCategoryById", "sortedEpisodesByCategory"]),
    isCategory() {
      return this.$route.name === 'category';
    },
    title() {
      return this.isCategory ? (this.category?.name || '').toUpperCase() : "NOS PODCASTS";
    },
    headerStyle() {
      return this.isCategory ? `border-bottom: 1rem solid ${this.color}` : ''
    },
    podcasts() {
      if (this.isCategory) {
        return this.sortedEpisodesByCategory(this.$route.params.id);
      }
      return this.searchQuery ? this.filteredPodcasts : this.sortedLastEpisodes;
    },
    color() {
      return getColorById(this.category?.id || 0)
    },
    category() {
      return this.findCategory(this.$route.params.id)
    },
  },
  async mounted() {
    this.$store.commit("post/setSearchQuery", '');
  },
  components: {
    Card,
    PulseLoader,
    CardHeader,
  },
};
</script>

<style scoped>
.loading {
  background: #E3E3E3;
  padding: 5rem 0;
  font-size: 3rem;
  color: #828282;
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
}
</style>
