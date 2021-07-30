<template>
  <div>
    <div class="card-header">
      <h4>NOS PODCASTS</h4>
      <p><a class="pointer" @click="showModal = true">S'abonner</a></p>
      <Modal v-if="showModal" v-on:modalEvent="choosePlatform"></Modal>
    </div>
    <div v-if="loading" class="loading">
      Un moment svp, ça arrive... :)
      <pulse-loader color="#E09900"></pulse-loader>
    </div>
    <div class="cards" v-if="!loading">
      <Card v-for="post in podcast" :key="post.id" :post="post"></Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card';
import Modal from '@/components/Modal'
import {mapState, mapGetters} from 'vuex';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: "Cards",
  data() {
    return {
      showModal: false,
    }
  },
  computed: {
    ...mapState("post", ["loading", "posts"]),
    ...mapGetters("post", ["filteredCategories"]),
    podcast() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.posts.sort((a, b) => {
        return new Date(b.date.valueOf()) - new Date(a.date.valueOf())
      })
    }
  },
  methods: {
    choosePlatform(event) {
      switch (event) {
        case 'spotify':
          console.log(event);
          break;
        default:
          this.showModal = false

      }
    },
  },
  beforeDestroy() {
    this.$store.commit('post/resetLastPostByCategories')
    this.$store.commit('post/resetPostsByCategories')
  },
  async created() {
    await this.$store.dispatch("post/getOnePostPerCategories");
  },
  components: {
    Card,
    Modal,
    PulseLoader
  }
}
</script>

<style scoped>

.filter {
  background: #E3E3E3;
  text-align: right;
  padding-right: 1rem;
}

.select {
  border: 0;
  background: #E3E3E3;
}

.option {
  background: #242424;
  color: #E3E3E3;
}

.loading {
  background: #E3E3E3;
  padding: 5rem 0;
  font-size: 3rem;
  color: #828282;
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif
}
</style>
