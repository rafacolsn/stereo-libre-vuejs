<template>
  <div class="content wrapper">
    <card-header :episodes="sortedEpisodesByCategory" with-select
                 :title="episode.title.rendered.toUpperCase().replace(/(&RSQUO);/g, '\'')" :post-data="postData"
                 :style="'border-bottom: 1rem solid ' + color"></card-header>
    <div class="tag" :style="'background:' + color +';'">
      <router-link :to="'/category/'+episode.category.id">{{ tag }}</router-link>
    </div>
    <div class="data">
      <div v-if="loading" class="loading">
        Un moment svp, ça arrive... :)
        <pulse-loader :color="color"></pulse-loader>
      </div>
      <div v-if="! loading" class="img_wrapper">
        <img :src="episode.imageUrl" :alt="episode.title.rendered" class="image">
      </div>
      <div class="text" v-html="episode.content.rendered"></div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import moment from "moment";
import CardHeader from "@/components/CardHeader";
import {getColorById} from "@/utils/colors";

export default {
  name: "Episode",
  computed: {
    ...mapState('post', ['episode', 'loading']),
    ...mapGetters('post', ["sortedEpisodesByCategory"]),
    postData() {
      return moment(this.episode.date).format('DD MMMM YYYY')
    },
    tag() {
      return (this.episode.category.name).toUpperCase()
    },
    color() {
      return getColorById(this.episode.category.id);
    },
  },
  watch: {
    '$route.params.id': {
      handler: async function (value) {
        await this.$store.dispatch('post/getEpisode', value);
      },
      immediate: true
    }
  },
  components: {
    CardHeader
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