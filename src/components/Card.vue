<template>
  <router-link v-if="podcast" :to="'/episode/'+podcast.id">
    <div class="card">
      <div class="tag" :style="'background:' + color+';'">
        <router-link :to="'/category/'+podcast.category.id">{{ tag }}</router-link>
      </div>
      <div class="img_wrapper">
        <img :src="imageUrl" v-if="imageUrl" :alt="podcast.title" class="image">
        <pulse-loader v-else :color="color || '#899499'" style="float: right; padding-right: 1rem"></pulse-loader>
      </div>

      <h4 :style="'color:' + color" v-html="title.replace(/(&RSQUO);/g, '\'')"></h4>
      <div class="postData">{{ podcastData }}</div>
      <div class="text" v-html="podcast.excerpt"></div>
    </div>
  </router-link>
</template>

<script>
import moment from 'moment';
import {mapGetters, mapState} from 'vuex';
import {getColorById} from "@/utils/colors";
import PulseLoader from 'vue-spinner/src/BounceLoader.vue';

export default {
  name: "Card",
  props: {
    podcastId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      podcast: null,
      imageUrl: null,
    }
  },
  computed: {
    ...mapState('post', ['loading']),
    ...mapGetters('post', ["findEpisode"]),
    title() {
      return this.podcast?.title?.toUpperCase() || '';
    },
    podcastData() {
      return this.podcast ? moment(this.podcast.date).format('DD MMMM YYYY') + ' | ' + this.podcast.category.name : '';
    },
    tag() {
      return this.podcast ? (this.podcast.category.name).toUpperCase() : '';
    },
    color() {
      return this.podcast ? getColorById(this.podcast.category.id) : '';
    }
  },
  methods: {
    updateImageUrl() {
      if (this.podcast) {
        this.imageUrl = this.podcast.imageUrl;
      }
    }
  },
  async created() {
    this.podcast = this.findEpisode(this.podcastId);
    if (this.podcast && !this.podcast.imageUrl) {
      await this.$store.dispatch('post/getImage', {episodeId: this.podcast.id, mediaId: this.podcast.mediaId});
    }
    this.updateImageUrl();
  },
  watch: {
    podcast: {
      handler(newPodcast) {
        if (newPodcast) {
          this.updateImageUrl();
        }
      },
      immediate: true,
    }
  },

  components: {
    PulseLoader
  }
}
</script>


<style lang="scss" scoped>
.card {
  max-width: 20rem;
  background: white;
  border-radius: 10px;
  padding: 2rem;
  filter: drop-shadow(0 0 0.75rem #b8b8b8);
  margin: 2rem;
  flex-basis: 25%;
  position: relative;
  text-align: left;
}

h4 {
  margin-top: 1rem;
}

.postData {
  margin-bottom: 1rem;
}

.img_wrapper {
  min-height: 10rem;
  max-height: 20rem;
  width: 20rem;
  overflow: hidden;
  border-radius: 10px;
}

.image {
  //min-width: 100%;
  max-width: 100%;
  //min-height: 100%;
  max-height: 100%;
}
</style>
