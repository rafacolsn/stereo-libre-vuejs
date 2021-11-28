<template>
  <div class="card-header">
    <h4 v-html="title"></h4>
    <p v-if="postData" class="postData">{{ postData }}</p>
    <p><a class="pointer" @click="showModal = true">S'abonner</a></p>
    <Modal v-if="showModal" v-on:modalEvent="choosePlatform"></Modal>
    <Select v-if="this.$route.name !== 'nous'"></Select>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
import Select from "@/components/Select";

export default {
  name: "CardHeader",
  props: {
    title: {
      type: String,
      default: "NOS PODCASTS"
    },
    postData: String
  },
  data() {
    return {
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
    },
  },
  components: {
    Modal,
    Select
  }
}
</script>

<style scoped lang="scss">

</style>