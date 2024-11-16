<template>
  <div class="txt">
    <div class="input-wrapper">
      <input
          type="text"
          v-model="searchQuery"
          placeholder="Rechercher un podcast..."
      />
      <span v-if="searchQuery.length" class="clear-icon" @click="clearSearch">&times;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  computed: {
    searchQuery: {
      get() {
        return this.$store.state.post.searchQuery;
      },
      set(value) {
        this.$store.commit("post/setSearchQuery", value)
      }
    },
  },
  methods: {
    clearSearch() {
      this.$store.commit('post/setSearchQuery', '')
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 576px) {
  .txt {
    inline-size: 99%;
    overflow: hidden;
  }
}

.input-wrapper {
  position: relative;
  display: inline-block;
  input{
    width: 250px;
  }
}

.clear-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 18px;
  color: #ccc;
}

.clear-icon:hover {
  color: #000;
}

.dropdown {
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown li {
  padding: 10px;
  cursor: pointer;
}
</style>
