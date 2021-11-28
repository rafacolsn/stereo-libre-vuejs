<template>
  <div class="content">
    <card-header :title="category.name.toUpperCase()" :style="'border-bottom: 1rem solid ' + color"></card-header>
    <div v-if="loading" class="loading">
      Un moment svp, ça arrive... :)
      <pulse-loader :color="color"></pulse-loader>
    </div>
    <div v-if="!loading" class="cards">
      <Card v-for="post in podcast" :key="post.id" :post="post"></Card>
    </div>

  </div>
</template>

<script>
import Card from "@/components/Card";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import {mapGetters, mapState} from "vuex";
import CardHeader from "@/components/CardHeader";

export default {
  name: "Category",
  computed: {
    ...mapState("post", ["loading", "postsByCategories", "color", "category"]),
    ...mapGetters('post', ['getCategoryById', "getColorById", "filteredCategories"]),
    podcast() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.postsByCategories.sort((a, b) => {
        return new Date(b.date.valueOf()) - new Date(a.date.valueOf())
      })
    }
  },
  components: {
    Card,
    PulseLoader,
    CardHeader
  },
  async created() {
    let id = parseInt(this.$route.params.id);
    await this.$store.dispatch('post/getCategories');
    this.$store.commit('post/setColor', this.getColorById(id)[id]);
    this.$store.commit('post/setCategory', this.getCategoryById(id));
    await this.$store.dispatch('post/getPostsByCategoryId', id);
  },
  watch: {
    async $route(to) {
      let id = parseInt(to.params.id);
      this.$store.commit('post/setColor', this.getColorById(id)[id]);
      this.$store.commit('post/setCategory', this.getCategoryById(id));
      await this.$store.dispatch('post/getPostsByCategoryId', parseInt(to.params.id));
    }
  },
}
</script>

<style scoped>
.card-header {
  min-height: 9rem;
}
</style>