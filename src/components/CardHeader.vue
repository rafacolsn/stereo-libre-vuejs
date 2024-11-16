<template>
  <div class="card-header">
    <h4 v-html="title"></h4>
    <p v-if="postData" class="postData">{{ postData }}</p>
    <Search v-if="withSearch"></Search>
    <Select v-if="withSelect"></Select>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Select from "@/components/Select.vue";

export default {
  name: "CardHeader",
  props: {
    title: {
      type: String,
      default: "NOS PODCASTS"
    },
    postData: String,
    withSearch: {
      type: Boolean,
      default: false
    },
    withSelect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showModal: false,
    }
  },
  components: {
    Select,
    Search
  }
}
</script>

<style scoped lang="scss">

</style>