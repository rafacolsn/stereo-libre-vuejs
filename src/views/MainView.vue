<template>
  <div class="content">
    <card-header :episodes="podcasts" title="NOS PODCASTS" with-search></card-header>
    <div v-if="loading" class="loading">
      Un moment svp, ça arrive... :)
      <pulse-loader color="#E09900"></pulse-loader>
    </div>
    <div class="cards" v-if="!loading">
      <Card v-for="post in podcasts" :key="'post_'+post.id" :post="post"></Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card';
import {mapGetters, mapState} from 'vuex';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import CardHeader from "@/components/CardHeader";

export default {
  name: "MainView",
  computed: {
    ...mapState("post", ["loading", 'searchQuery']),
    ...mapGetters("post", ['filteredPodcasts', "sortedLastEpisodes"]),
    podcasts() {
      return this.searchQuery ? this.filteredPodcasts : this.sortedLastEpisodes;
    },
  },
  methods: {},
  async mounted() {
    this.$store.commit("post/setSearchQuery", '')
    await this.$store.dispatch('post/getLastEpisodes');
  },
  components: {
    Card,
    PulseLoader,
    CardHeader
  }
}
</script>

<style scoped>

.filter {
  background: #E3E3E3;
  text-align: right;
  padding-right: 1rem;
}

.select {
  border: 0;
  background: #E3E3E3;
}

.option {
  background: #242424;
  color: #E3E3E3;
}

.loading {
  background: #E3E3E3;
  padding: 5rem 0;
  font-size: 3rem;
  color: #828282;
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif
}
</style>
