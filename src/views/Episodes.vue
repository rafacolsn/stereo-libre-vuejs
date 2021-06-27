<template>
  <div>
    <div class="card-header">
      <h4>EPISODES</h4>
      <p>Et encore il n'y a pas tout :)</p>
    </div>
    <div class="list" v-for="post in posts" :key="post.id">
      <a class="episode" href="">
        <p :style="'color:' + color" v-html="(post.title.rendered).toUpperCase()"></p>
      </a>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Episodes",
  computed: {
    ...mapState('post', ['posts'])
  },
  created() {
    this.$store.dispatch('post/getEpisodes')
  }
}
</script>

<style scoped>
h3 {
}
.episode {
  text-decoration: none;
  color: #555555;
}
.list {
  padding: .7rem 0;
  background: #E3E3E3;
}
</style>