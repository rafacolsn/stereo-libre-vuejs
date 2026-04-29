<template>
  <div class="episode-page">
    <div v-if="loading" class="loading">
      Un moment svp, ça arrive... :)
      <pulse-loader :color="color"></pulse-loader>
    </div>

    <template v-else>
      <div class="hero" :style="heroStyle">
        <div class="hero-gradient">
          <div class="hero-content">
            <router-link class="category-tag" :to="'/category/'+podcast.category.id" :style="'background:' + color">
              {{ tag }}
            </router-link>
            <h1 v-html="title"></h1>
            <p class="episode-date">{{ date }}</p>
          </div>
        </div>
      </div>

      <div class="episode-nav" :style="'background:' + color">
        <my-select :episodes="episodesFromCategory" :current-id="podcast.id" />
      </div>

      <div class="episode-body">
        <audio-player v-if="audioSrc" :src="audioSrc" :color="color" />
        <div class="episode-content" v-html="podcast.content"></div>
      </div>
    </template>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import moment from "moment";
import MySelect from "@/components/MySelect";
import AudioPlayer from "@/components/AudioPlayer";
import {getColorById} from "@/utils/colors";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
  name: "Episode",
  data() {
    return {
      podcast: null,
      imageUrl: null,
      color: '#899499'
    }
  },
  computed: {
    ...mapState('post', ['loading']),
    ...mapGetters('post', ["findEpisode", 'sortedEpisodesByCategory']),
    title() {
      return this.podcast?.title?.toUpperCase().replace(/(&RSQUO);/g, "'") || '';
    },
    date() {
      return moment(this.podcast.date).format('DD MMMM YYYY');
    },
    tag() {
      return (this.podcast.category.name).toUpperCase();
    },
    episodesFromCategory() {
      return this.sortedEpisodesByCategory(this.podcast.category.id);
    },
    audioSrc() {
      if (!this.podcast?.content) return null;
      const match = this.podcast.content.match(/src="([^"]+\.mp3[^"]*)"/);
      return match ? match[1] : null;
    },
    heroStyle() {
      return this.imageUrl
        ? { backgroundImage: `url(${this.imageUrl})` }
        : { backgroundColor: '#1a1a1a' };
    }
  },
  methods: {
    updateImageUrl() {
      if (this.podcast) {
        this.imageUrl = this.podcast.imageUrl;
        this.color = getColorById(this.podcast.category.id);
      }
    }
  },
  async created() {
    this.podcast = this.findEpisode(this.$route.params.id);
    if (this.podcast && !this.podcast.imageUrl) {
      await this.$store.dispatch('post/getImage', {episodeId: this.podcast.id, mediaId: this.podcast.mediaId});
    }
    this.updateImageUrl();
  },
  watch: {
    '$route.params.id': {
      handler(newId) {
        if (newId) {
          this.podcast = this.findEpisode(newId);
          this.updateImageUrl();
        }
      },
      immediate: true,
    }
  },
  components: {
    MySelect,
    AudioPlayer,
    PulseLoader
  }
}
</script>

<style scoped lang="scss">
.episode-page {
  width: 100%;
}

.loading {
  padding: 5rem;
  font-size: 1.5rem;
  text-align: center;
}

/* ── Hero ── */
.hero {
  width: 100%;
  height: 60vh;
  min-height: 320px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}


.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%);
  display: flex;
  align-items: flex-end;
}

.hero-content {
  padding: 2.5rem 3rem;
  color: white;
  max-width: 900px;
}

.category-tag {
  display: inline-block;
  padding: 0.25rem 0.9rem;
  border-radius: 4px;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 0.8rem;
  text-decoration: none;

  &:hover {
    filter: brightness(1.15);
  }
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.2;
  margin: 0 0 0.5rem;
  color: white;
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
}

.episode-date {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.75);
  margin: 0;
}

@media screen and (max-width: 600px) {
  .hero {
    height: 50vh;
  }

  .hero-content {
    padding: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }
}

/* ── Nav strip ── */
.episode-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 2rem;

  ::v-deep select {
    background: transparent;
    border: 1.5px solid rgba(255,255,255,0.6);
    border-radius: 6px;
    color: white;
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
    cursor: pointer;
    max-width: 600px;
    width: 100%;

    option {
      background: #222;
      color: white;
    }

    &:focus {
      outline: none;
      border-color: white;
    }
  }
}

/* ── Body ── */
.episode-body {
  max-width: 780px;
  margin: 0 auto;
  padding: 2.5rem 2rem 4rem;
}

.episode-content {
  font-size: 1rem;
  line-height: 1.75;
  color: #333;
  text-align: left;

  ::v-deep p {
    margin-bottom: 1.2rem;
  }

  ::v-deep .powerpress_player,
  ::v-deep .wp-audio-shortcode,
  ::v-deep audio {
    display: none;
  }

  ::v-deep a {
    color: inherit;
    text-decoration: underline;
  }
}

@media screen and (max-width: 600px) {
  .episode-body {
    padding: 1.5rem 1rem 3rem;
  }
}
</style>
