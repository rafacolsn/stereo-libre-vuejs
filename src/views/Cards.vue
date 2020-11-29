<template>
  <div class="content">
    <div class="card-header">
      <h4>NOS PODCASTS</h4>
      <h5><a @click="showModal = true">S'abonner</a></h5>
      <Modal v-if="showModal" v-on:modalEvent="choosePlatform"></Modal>
    </div>
    <div class="cards">
      <Card v-for="post in posts" :key="post.id" :post="post"></Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card';
import Modal from '@/components/Modal'

export default {
  name: "Cards",
  data() {
    return {
      posts: [],
      showModal: false,
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
    }
  },
  created() {
    fetch('https://stereolibre.be/wp-json/wp/v2/posts/?categories=12&per_page=100').then(resp => {
      resp.json().then(r => this.posts = r)

    })
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
