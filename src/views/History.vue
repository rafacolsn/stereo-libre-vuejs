<template>
  <div class="content wrapper">
    <card-header :episodes="podcasts" title="Liste des épisodes" :with-search="true" :with-select="false"></card-header>

    <div class="episodes-list">
      <h2>Liste des épisodes</h2>
      <div class="episodes-timeline">
        <div v-for="episode in podcasts" :key="episode.id" class="episode-item">
          <div class="episode-date">{{ new Date(episode.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' }) }}</div>
          <div class="episode-info">
            <router-link :to="{ name: 'episode', params: { id: episode.id } }" class="episode-title" v-html="episode.title"></router-link>
            <div class="episode-category">{{ episode.category.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import CardHeader from "@/components/CardHeader";
import { mapState, mapGetters } from 'vuex';

export default {
  name: "History",
  components: {
    CardHeader
  },
  computed: {
    ...mapState('post', ['episodes', "loading", 'searchQuery']),
    ...mapGetters("post", ['filteredPodcasts']),
    sortedEpisodes() {
      return [...this.episodes].sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    podcasts() {
      return this.searchQuery ? this.filteredPodcasts : this.sortedEpisodes;
    },
  },
  mounted() {
    if (this.episodes.length === 0) {
      this.$store.dispatch('podcast/getAll');
    }    
    this.$store.commit("post/setSearchQuery", '');
  }
}
</script>

<style scoped lang="scss">
@media screen and (max-width: 850px) {
  .flex {
    flex-direction: column;
  }
  .img {
    min-height: 16rem;
    border-bottom-right-radius: 0;
  }
}

@media screen and (min-width: 750px) {
.img {
  min-width: 30rem;
  min-height: 20rem;
  }
}

.flex {
  display: flex;
}
.img {
  background-image: url('../assets/nous-trois.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 0 0 0 10px;
}

.text {
  text-align: left;
  background-color: #f3f3f3;
  border-radius: 0 0 10px 0;
}

p {
  padding: 1rem;
}

a {
  text-decoration: underline;
}

.episodes-list {
  margin-top: 2rem;
}

.episodes-list h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.episodes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

@media screen and (max-width: 600px) {
  .episodes-grid {
    grid-template-columns: 1fr;
  }
}

.episode-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.2s;
}

.episode-card:hover {
  transform: translateY(-5px);
}

.episode-card a {
  text-decoration: none;
  color: inherit;
  display: block;
}

.episode-content {
  padding: 1rem;
}

.episode-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.episode-date {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

</style>