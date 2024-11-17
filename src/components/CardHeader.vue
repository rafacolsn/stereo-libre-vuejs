<template>
  <div class="card-header">
    <h4 v-html="title"></h4>
    <p v-if="postData" class="postData">{{ postData }}</p>
    <Search v-if="withSearch"></Search>
    <my-select :episodes="episodes" v-if="withSelect"></my-select>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import MySelect from "@/components/MySelect.vue";

export default {
  name: "CardHeader",
  props: {
    title: {
      type: String,
      default: "NOS PODCASTS"
    },
    postData: String,
    episodes: {
      type: Array,
      required: true
    },
    withSearch: {
      type: Boolean,
      default: false
    },
    withSelect: {
      type: Boolean,
      default: false
    }
  },
  components: {
    MySelect,
    Search
  }
}
</script>

<style scoped lang="scss">

</style>