<template>
  <div class="txt">
    <select v-if="sortedList" name="list" id="list" @change="redirect($event)">
      <option v-for="post in sortedList" :value="post.id" :key="'select_'+post.id">
        <span v-html="post.title.rendered"></span> -
        <span style="color: #828282; font-size: small">{{ format(post.date) }}</span>
      </option>
    </select>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "MySelect",
  props:{
    episodes: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedList() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.episodes.sort((a, b) => {
        return new Date(b.date.valueOf()) - new Date(a.date.valueOf())
      })
    }
  },
  methods: {
    redirect(event) {
      this.$router.push('/episode/' + event.target.value);
    },
    format(date) {
      return moment(date).format('DD MMMM YYYY')
    },
  }
}
</script>

<style scoped>
@media screen and (max-width: 576px) {
  .txt {
    inline-size: 99%;
    overflow: hidden;
    /*max-width: 150px;*/
  }
}
</style>