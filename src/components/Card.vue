<template>
  <router-link :to="'/episode/'+post.id">
    <div class="card">
      <div class="tag" :style="'background:' + color">
        <router-link :to="'/category/'+category.id">{{ tag }}</router-link>
      </div>
      <div class="img_wrapper">
        <img v-if="image" :src="imageUrl" :alt="post.title.rendered" class="image">
      </div>
      <h4 :style="'color:' + color" v-html="(post.title.rendered).toUpperCase()"></h4>
      <div class="postData">{{ postData }}</div>
      <div class="text" v-html="post.excerpt.rendered"></div>
    </div>
  </router-link>
</template>

<script>
import moment from 'moment';
import {mapGetters} from 'vuex';

export default {
  name: "Card",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      image: {},
      category: {
        name: null
      },
      color: null
    }
  },
  computed: {
    ...mapGetters('post', ['getCategoryById', 'getColorById']),
    postData() {
      return moment(this.post.date).format('DD MMMM YYYY') + ' | ' + this.category.name
    },
    tag() {
      return (this.category.name).toUpperCase()
    },
    imageUrl() {
      return this.image.media_details.sizes.medium_large ?
          this.image.media_details.sizes.medium_large.source_url :
          this.image.media_details.sizes.full.source_url
    },
  },
  created() {
    const id = this.post.categories.find(id => id !== 4); // a post has 2 categories, has we don't want the 4th (Episodes)
    this.category = this.getCategoryById(id)
    this.color = this.getColorById(id)[id] + ';';


    fetch(`https://stereolibre.be/wp-json/wp/v2/media/${this.post.featured_media}`).then(resp => {
      resp.json().then(r => {
        this.image = r
      })
    })
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
  max-height: 15rem;
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
