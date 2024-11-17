<template>
  <router-link v-if="post" :to="'/episode/'+post.id">
    <div class="card">
      <div class="tag" :style="'background:' + color+';'">
        <router-link :to="'/category/'+post.category.id">{{ tag }}</router-link>
      </div>
      <div class="img_wrapper">
        <img v-if="post.imageUrl" :src="post.imageUrl" :alt="post.title.rendered" class="image">
      </div>
      <h4 :style="'color:' + color" v-html="title.replace(/(&RSQUO);/g, '\'')"></h4>
      <div class="postData">{{ postData }}</div>
      <div class="text" v-html="post.excerpt.rendered"></div>
    </div>
  </router-link>
</template>

<script>
import moment from 'moment';
import {mapState} from 'vuex';
import {getColorById} from "@/utils/colors";

export default {
  name: "Card",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('post', ['loading']),
    title() {
      return this.post.title.rendered.toUpperCase();
    },
    postData() {
      return moment(this.post.date).format('DD MMMM YYYY') + ' | ' + this.post.category.name
    },
    tag() {
      return (this.post.category.name).toUpperCase()
    },
    color() {
      return getColorById(this.post.category.id);
    },
  },
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
