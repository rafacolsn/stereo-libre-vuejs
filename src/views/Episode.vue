<template>
  <div class="content wrapper">
    <div v-if="loading" class="loading">
      Un moment svp, ça arrive... :)
      <pulse-loader :color="color"></pulse-loader>
    </div>
    <template v-else>
      <card-header :episodes="episodesFromCategory" with-select
                   :title="podcast.title.toUpperCase().replace(/(&RSQUO);/g, '\'')" :post-data="date"
                   :style="'border-bottom: 1rem solid ' + color"></card-header>
      <div class="tag" :style="'background:' + color +';'">
        <router-link :to="'/category/'+podcast.category.id">{{ tag }}</router-link>
      </div>
      <div class="data">
        <div class="img_wrapper">
          <img :src="imageUrl" :alt="podcast.title" class="image">
        </div>
        <div class="text" v-html="podcast.content"></div>
      </div>
    </template>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import moment from "moment";
import CardHeader from "@/components/CardHeader";
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
    date() {
      return moment(this.podcast.date).format('DD MMMM YYYY')
    },
    podcastData() {
      return this.podcast ? moment(this.podcast.date).format('DD MMMM YYYY') + ' | ' + this.podcast.category.name : '';
    },
    tag() {
      return (this.podcast.category.name).toUpperCase()
    },
    episodesFromCategory() {
      return this.sortedEpisodesByCategory(this.podcast.category.id);
    },
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
    CardHeader, PulseLoader
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
}

@media screen and (max-width: 992px) {
  .content {
    width: 90%;
  }
}

.card-header {
  padding-top: 1rem;
}

h4 {
  margin: 0 1rem;
}

.text {
  text-align: left;
  padding: 1rem;
  background-color: #f3f3f3;
  border-radius: 0 0 10px 0;
  overflow-y: auto;
  max-height: 18rem;
  flex: auto;
}

@media screen and (max-width: 576px) {
  .text {
    max-height: fit-content;
  }
}

::v-deep .powerpress_player {
  margin-top: 2rem;
}


.img_wrapper {
  height: 20rem;
  background-color: #f3f3f3;
}

.image {
  object-fit: contain;
  object-position: left;
  min-width: 20rem;
  height: 20rem;
}

.data {
  display: flex;
  overflow: hidden;
  border-radius: 0 0 10px 10px;
}

@media screen and (max-width: 576px) {
  .data {
    flex-direction: column;
  }
}

.tag {
  top: 1rem;
  padding: .3rem 1rem .3rem .5rem;
}

</style>