<template>
  <div>
    <div class="card-header">
      <h4>EPISODES</h4>
      <p>Et encore il n'y a pas tout :)</p>
    </div>
    <div class="list" v-for="post in posts" :key="post.id">
      <router-link :to="'/episode/'+post.id">
        <p v-html="(post.title.rendered).toUpperCase()"></p>
        <p style="color: #828282; font-size: small">{{ format(post.date) }} |
          <router-link :to="'/category/'+getCategory(post.categories.find(id => id !== 4)).id">
            {{ getCategory(post.categories.find(id => id !== 4)).name }}
          </router-link>
        </p>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import moment from "moment";

export default {
  name: "Episodes",
  computed: {
    ...mapState('post', ['posts']),
    ...mapGetters('post', ["getCategoryById"])
  },
  methods: {
    format(date) {
      return moment(date).format('DD MMMM YYYY')
    },
    getCategory(id) {
      return this.getCategoryById(id)
    }
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