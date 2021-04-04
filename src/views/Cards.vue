<template>
  <div class="content">
    <div class="card-header">
      <h4>NOS PODCASTS</h4>
      <p><a @click="showModal = true">S'abonner</a></p>
      <Modal v-if="showModal" v-on:modalEvent="choosePlatform"></Modal>
    </div>
    <div class="cards" v-if="! loading">
      <Card v-for="post in lastPostByCategories" :key="post.id" :post="post"></Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card';
import Modal from '@/components/Modal'
import {mapState, mapGetters} from 'vuex';

export default {
  name: "Cards",
  data() {
    return {
      showModal: false,
    }
  },
  computed: {
    ...mapState("post", ["loading", "posts", "categories", "lastPostByCategories"]),
    ...mapGetters("post", ["categoriesIds"]),
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
    }
  },
  created() {
    this.categoriesIds.map(id => {
      this.$store.dispatch("post/getOnePostByCategoryId", id);
    })
    this.$store.dispatch("post/getPosts");
    this.$store.dispatch("post/getCategories");
  },
  components: {
    Card,
    Modal
  }
}
</script>

<style scoped>
.content {
  /*margin from header*/
  margin: 35rem auto 0;
  width: 80%;
}

.card-header {
  background: black;
  color: white;
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-header h4 {
  font-size: 2rem;
  margin-bottom: 0;
}

.cards {
  background: #E3E3E3;
  display: flex;
  flex-flow: wrap;
  /*border: 2px solid blue;*/
  justify-content: center;
}
</style>
