<template>
  <div class="txt">
    <select v-if="episodes" name="list" id="list" @change="redirect($event)">
      <option v-for="podcast in episodes" :value="podcast.id" :key="'select_'+podcast.id">
        <span v-html="podcast.title"></span> -
        <span style="color: #828282; font-size: small">{{ format(podcast.date) }}</span>
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