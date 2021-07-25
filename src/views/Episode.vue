<template>
  <div v-if="! loading" class="wrapper">
    <div class="card-header">
      <h4 v-html="post.title.rendered"></h4>
      <p class="postData">{{ postData }}</p>
      <div class="navigation">
        <a :href="'/episode/' + getNext" v-html="'<'"></a>
        <a :href="'/episode/' + getPrev" v-html="'>'"></a>
      </div>
    </div>
    <div class="tag" :style="'background:' + color"><a href="">{{ tag }}</a></div>
    <div class="data">
      <div class="img_wrapper">
        <img :src="image.guid.rendered" :alt="post.title.rendered" class="image">
      </div>
      <div class="text" v-html="post.content.rendered"></div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import moment from "moment";

export default {
  name: "Episode",
  data: () => {
    return {
      category: {
        name: null
      },
      color: null
    }
  },
  computed: {
    ...mapState('post', ['post', 'image', 'loading']),
    ...mapGetters('post', ["getPostById", "getColorById", "getCategoryById", "episodesIds"]),
    postData() {
      return moment(this.post.date).format('DD MMMM YYYY')
    },
    tag() {
      return (this.category.name).toUpperCase()
    },
    getPrev() {
      let prevItem = this.$route.params.id;
      let index = this.episodesIds.indexOf(parseInt(this.$route.params.id));
      if(index > 0 && index < this.episodesIds.length - 1) {
        prevItem = this.episodesIds[index - 1]
      }
      return prevItem
    },
    getNext() {
      let nextItem = this.$route.params.id;
      let index = this.episodesIds.indexOf(parseInt(this.$route.params.id));
      if(index >= 0 && index < this.episodesIds.length - 1) {
        nextItem = this.episodesIds[index + 1]
      }
      return nextItem
    }

  },
  async mounted() {
    await this.$store.dispatch('post/getEpisode', parseInt(this.$route.params.id))
    let id = 4;
    id = this.post.categories.find(id => id !== 4); // a post has 2 categories, has we don't want the 4th (Episodes)
    this.category = this.getCategoryById(id)
    this.color = this.getColorById(id)[id] + ';';
  },
}
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin: 0 1rem;
}

.card-header {
  border-radius: 10px 10px 0 0;
  padding-top: 1rem;
  align-items: unset;
}

h4 {
  margin: 0 1rem;
}

.text {
  text-align: left;
  padding: 1rem;
  background-color: #f3f3f3;
  border-radius: 0 0 10px 0;
  overflow-y: auto;
  max-height: 18rem;
}

::v-deep .powerpress_player {
  margin-top: 2rem;
}


.img_wrapper {
  max-height: 20rem;
  max-width: 20rem;
}

.image {
  max-width: 100%;
  min-height: 100%;
}

.data {
  display: flex;

  overflow: hidden;
  border-radius: 0 0 10px 10px;
}

.tag {
  position: absolute;
  top: 1rem;
  left: 0;
  padding: .3rem 1rem .3rem .5rem;
  border-radius: 0 5px 5px 0;

  a {
    color: white;
  }
}

</style>