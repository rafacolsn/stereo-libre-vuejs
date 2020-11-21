<template>
  <div>
    <h1>Stéréo Libre</h1>
    <ul>
      <li v-for="post in posts" :key="post.id"><span v-html="post.title.rendered"></span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {
      posts: []
    }
  },

  created() {
    fetch('https://stereolibre.be/wp-json/wp/v2/posts/?categories=10&per_page=100').then(resp => {
      resp.json().then(r => this.posts = r)

    })
  }
}
</script>

<style scoped>

</style>
