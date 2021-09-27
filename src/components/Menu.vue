<template>
  <nav>
    <img v-if="$mq === 'mobile' && ! showMobileMenu" @click="showMobileMenu = ! showMobileMenu"
         src="../assets/icon_menu.png" alt="icon menu" width="75px">
    <div @click="showMobileMenu = !showMobileMenu" class="close" v-if="$mq === 'mobile' ? showMobileMenu : true">x</div>
    <ul :class="$mq" v-if="$mq === 'mobile' ? showMobileMenu : true">
      <li :class="$mq ==='desktop' ? 'zoom': ''">
        <router-link to="/home">STEREO LIBRE</router-link>
      </li>
      <li @click="show()">
        <a style="cursor: pointer">CATEGORIES</a>
        <ul class="subMenu" v-if="showSubMenu">
          <li class="subElement" v-for="category in filteredCategories" :key="category.id">
            <router-link :to="'/category/'+category.id">{{ (category.name.toUpperCase()) }}</router-link>
          </li>
        </ul>

      </li>
      <li class="zoom">
        <router-link to="/episodes">EPISODES</router-link>
      </li>
      <li class="zoom">
        <router-link to="/nous">NOUS</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Menu",
  data() {
    return {
      showSubMenu: false,
      showMobileMenu: false
    }
  },
  computed: {
    ...mapGetters('post', ['filteredCategories'])
  },
  methods: {
    show() {
      this.showSubMenu = ! this.showSubMenu
    }
  }
}
</script>

<style scoped lang="scss">
nav {
  width: 100%;
  background-color: #fff;
  /*color: #0a0a0a;*/
  font-size: 1.2rem;
  //font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  font-weight: bold;
}
.close {
  position: absolute;
  top: 0;
  right: 15px;
  color: #dedede;
  cursor: pointer;
}
.mobile {
  display: flex;
  flex-direction: column;
  background-color: rgb(130, 130, 130);

  & li {
    text-align: left;
    margin-left: 1rem;
    font-size: 14px;
  }

  & li a {
    color: white;
    font-weight: normal;
  }

}

.desktop {

  display: flex;
  justify-content: flex-end;
  margin-right: 10%;

  & li {
    list-style: none;
    padding: .5rem 1rem;
    position: relative;

    & .subMenu {
      display: flex;
      flex-direction: column;
      position: absolute;
      z-index: 5555;
      filter: drop-shadow(0 0 0.75rem #b8b8b8);


      & .subElement {
        background-color: #000000;
        opacity: .8;
        color: white;
        border-bottom: 1px solid white;
        font-weight: normal;
        font-size: 15px;

        &:hover {
          opacity: 1;
        }

        &:first-child {
          border-radius: 10px 10px 0 0;
        }

        &:last-child {
          border-radius: 0 0 10px 10px;
        }

        & a {
          color: white;
        }
      }
    }
  }
}


li a {
  text-decoration: none;
  color: #2a2a2a;
}
</style>