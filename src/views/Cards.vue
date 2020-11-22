<template>
  <div class="cards">

      <Card v-for="post in posts" :key="post.id" :post="post"></Card>
  </div>
</template>

<script>
import Card from '@/components/Card';
export default {
  name: "Cards",
  data() {
    return {
      posts: []
    }
  },

  created() {
    fetch('https://stereolibre.be/wp-json/wp/v2/posts/?categories=12&per_page=100').then(resp => {
      resp.json().then(r => this.posts = r)

    })
  },
  components: {
    Card
  }
}
</script>

<style scoped>
.cards {
  background: #E3E3E3;
  display: flex;
  flex-flow: wrap;
}
</style>
