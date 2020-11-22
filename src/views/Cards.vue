<template>
  <div class="content">
    <div class="card-header"><h4>NOS PODCASTS</h4></div>
    <div class="cards">
      <Card v-for="post in posts" :key="post.id" :post="post"></Card>
    </div>
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
.content {
  /*margin from header*/
  margin: 45rem auto 0;
  width: 80%;
}
.card-header {
  background: black;
  color: white;
  min-height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-header h4 {
    font-size: 2rem;
}
.cards {
  background: #E3E3E3;
  display: flex;
  flex-flow: wrap;
  /*border: 2px solid blue;*/
  justify-content: center;
}
</style>
