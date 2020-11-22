<template>
  <div class="card">
    <div class="tag">{{ (category.name).toUpperCase() }}</div>
    <div class="img_wrapper">
      <img :src="image.guid.rendered" alt="" class="image">
    </div>
    <h4 v-html="(post.title.rendered).toUpperCase()"></h4>
    <div class="postData">{{ postData }}</div>
    <div v-html="post.content.rendered"></div>
  </div>
</template>

<script>
import moment from 'moment';

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
      image: '',
      category: null
    }
  },
  computed: {
    postData() {
      moment.locale('fr');
      return moment(this.post.date).format('DD MMMM YYYY') + ' | ' + this.category.name
    }
  },
  created() {
    fetch(`https://stereolibre.be/wp-json/wp/v2/media/${this.post.featured_media}`).then(resp => {
      resp.json().then(r => {
        this.image = r
      })
    })
    fetch(`https://stereolibre.be/wp-json/wp/v2/categories/${this.post.categories[1]}`).then(resp => {
      resp.json().then(r => {
        this.category = r
      })
    })
  }
}
</script>

<style scoped>
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

.tag {
  position: absolute;
  top: 5%;
  left: 0;
  background: #05822E;
  color: white;
  padding: .3rem 1rem .3rem 2rem;
  border-radius: 0 5px 5px 0;
}

.img_wrapper {
  max-height: 15rem;
  width: 20rem;
  overflow: hidden;
  border-radius: 10px;

}

.image {
  max-width: 100%;
  /*min-height: 100%;*/
}

h4 {
  /*text-align: center;*/
  color: #05822E;
}
</style>
