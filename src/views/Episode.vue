<template>
  <div class="wrapper">
    <div class="card-header">
      <h4 v-html="post.title.rendered.toUpperCase()"></h4>
      <p class="postData">{{ postData }}</p>
      <div class="navigation">
        <div v-if="!getPrev.id">&nbsp;</div>
        <router-link v-if="getPrev.id" :to="'/episode/' + getPrev.id">&lt;&nbsp;<span v-html="getPrev.title.rendered"></span></router-link>
        <router-link v-if="getNext.id" :to="'/episode/' + getNext.id"><span v-html="getNext.title.rendered"></span>&nbsp;&gt;</router-link>
      </div>
    </div>
    <div class="tag" :style="'background:' + color +';'">
      <router-link :to="'/category/'+category.id">{{ tag }}</router-link>
    </div>
    <div class="data">
      <div v-if="! loading" class="img_wrapper">
        <img :src="imageUrl" :alt="post.title.rendered" class="image">
      </div>
      <div class="text" v-html="post.content.rendered"></div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import moment from "moment";

export default {
  name: "Episode",
  computed: {
    ...mapState('post', ['posts', 'post', 'image', 'category', 'color', 'loading']),
    ...mapGetters('post', ["getPostById", "getColorById", "getCategoryById"]),
    postData() {
      return moment(this.post.date).format('DD MMMM YYYY')
    },
    tag() {
      return (this.category.name).toUpperCase()
    },
    imageUrl() {
      return this.image.media_details.sizes.medium_large ?
          this.image.media_details.sizes.medium_large.source_url :
          this.image.media_details.sizes.full.source_url
    },
    getPrev() {
      let index = this.posts.map(post => post.id).indexOf(this.post.id);
      let prevItem = {};
      if (index > 0 && index <= this.posts.length - 1) {
        prevItem = this.posts[index - 1]
      }
      return prevItem
    },
    getNext() {
      let index = this.posts.map(post => post.id).indexOf(this.post.id);
      let nextItem = {};
      if (index >= 0 && index < this.posts.length - 1) {
        nextItem = this.posts[index + 1]
      }
      return nextItem
    }

  },
  async created() {
    await this.$store.dispatch('post/getEpisodes');
    await this.$store.dispatch('post/getEpisode', parseInt(this.$route.params.id));
  },
  watch: {
    async $route(to) {
      await this.$store.dispatch('post/getEpisode', parseInt(to.params.id));
    }
  },
}
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
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

.tag {
  position: absolute;
  top: 1rem;
  left: 0;
  padding: .3rem 1rem .3rem .5rem;
  border-radius: 0 5px 5px 0;
}

a {
  color: white;
}
</style>