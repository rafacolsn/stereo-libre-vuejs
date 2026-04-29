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

  input {
    width: 250px;
    padding: 0.5rem 2.2rem 0.5rem 0.9rem;
    border: 1.5px solid #ccc;
    border-radius: 20px;
    background: #f3f3f3;
    font-family: inherit;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      border-color: #555;
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.08);
    }
  }
}

.clear-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 18px;
  color: #aaa;
  transition: color 0.15s ease;

  &:hover {
    color: #000;
  }
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
