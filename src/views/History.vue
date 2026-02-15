<template>
  <div class="content wrapper">
    <card-header :episodes="podcasts" title="Liste des épisodes" :with-search="true" :with-select="false"></card-header>

    <div class="episodes-list">
      <div class="episodes-grid">
        <div v-for="episode in podcasts" :key="episode.id" class="episode-card">
          <router-link :to="{ name: 'episode', params: { id: episode.id } }">
            <div class="episode-content">
              <div class="date-block">
                <span class="date-text">{{ new Date(episode.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) }}</span>
              </div>
              <div class="separator"></div>
              <div class="content-block">
                <h3 v-html="episode.title"></h3>
                <p class="episode-category">{{ episode.category?.name || 'Unknown' }}</p>
              </div>
            </div>
          </router-link>
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
      return [...this.episodes].filter(e => e.category).sort((a, b) => new Date(b.date) - new Date(a.date));
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.episode-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;
}

.episode-card:hover {
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.episode-card a {
  text-decoration: none;
  color: inherit;
  display: block;
}

.episode-content {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.date-block {
  flex-shrink: 0;
  text-align: center;
  min-width: 100px;
}

.date-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
  display: block;
}

.separator {
  width: 1px;
  height: 60px;
  background-color: #ddd;
  flex-shrink: 0;
}

.content-block {
  flex: 1;
}

.content-block h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
  color: #333;
}

.episode-category {
  margin: 0;
  color: #999;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

</style>