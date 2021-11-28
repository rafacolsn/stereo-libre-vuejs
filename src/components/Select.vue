<template>
  <div>
    <select name="list" id="list" @change="redirect($event)" :value="defaultId">
      <option v-for="post in sortedList" :value="post.id" :key="'select_'+post.id">
        <p v-html="post.title.rendered"></p> -
        <p style="color: #828282; font-size: small">{{ format(post.date) }} -
          {{ getCategory(post).name }}
        </p>
      </option>
    </select>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import moment from "moment";

export default {
  name: "Select",
  computed: {
    ...mapState('post', ['list', 'postsByCategories']),
    ...mapGetters('post', ["getCategoryById"]),
    selectedList() {
      if (this.$route.name === 'category') {
        return this.postsByCategories;
      }
      return this.list
    },
    sortedList() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.selectedList.sort((a, b) => {
        return new Date(b.date.valueOf()) - new Date(a.date.valueOf())
      })
    },
    defaultId() {
      if (this.$route.name === 'category') {
        return this.postsByCategories[0].id;
      }
      if (this.$route.params.id) {
        return this.$route.params.id;
      }
      return this.sortedList[0].id
    }
  },
  methods: {
    redirect(event) {
      this.$router.push('/episode/' + event.target.value);
    },
    format(date) {
      return moment(date).format('DD MMMM YYYY')
    },
    getCategory(post) {
      let id = post.categories.find(id => id !== 6) === undefined ?
          post.categories.find(id => id === 6) :
          post.categories.find(id => id !== 6);
      return this.getCategoryById(id)
    }
  },
  async created() {
  }
}
</script>

<style scoped>
</style>