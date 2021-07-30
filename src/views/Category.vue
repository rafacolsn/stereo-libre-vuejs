<template>
  <div class="content">
    <div class="card-header" :style="'border-bottom: 1rem solid ' + color">
      <h4>{{ category.name.toUpperCase() }}</h4>
      <div class="navigation">
        <div v-if="!getPrev.id">&nbsp;</div>
        <router-link v-if="getPrev.id" :to="'/category/' + getPrev.id">&lt;&nbsp;{{getPrev.name}}</router-link>
        <router-link v-if="getNext.id" :to="'/category/' + getNext.id">{{getNext.name}}&nbsp;&gt;</router-link>
      </div>
    </div>
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

export default {
  name: "Category",
  computed: {
    ...mapState("post", ["loading", "postsByCategories", "color", "category"]),
    ...mapGetters('post', ['getCategoryById', "getColorById", "filteredCategories"]),
    getPrev() {
      let index = this.filteredCategories.indexOf(this.category);
      let prevItem = {};
      if (index > 0 && index <= this.filteredCategories.length - 1) {
        prevItem = this.filteredCategories[index - 1]
      }
      return prevItem
    },
    getNext() {
      let index = this.filteredCategories.indexOf(this.category);
      let nextItem = {};
      if (index >= 0 && index < this.filteredCategories.length - 1) {
        nextItem = this.filteredCategories[index + 1]
      }
      return nextItem
    },
    podcast() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.postsByCategories.sort((a, b) => {
        return new Date(b.date.valueOf()) - new Date(a.date.valueOf())
      })
    }
  },
  components: {
    Card,
    PulseLoader
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