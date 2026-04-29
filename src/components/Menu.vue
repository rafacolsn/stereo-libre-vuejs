<template>
  <nav>
    <img v-if="$mq === 'mobile' && ! showMobileMenu" @click="showMobileMenu = ! showMobileMenu"
         src="../assets/icon_menu.png" alt="icon menu" width="75px">
    <div @click="showMobileMenu = !showMobileMenu" class="close" v-if="$mq === 'mobile' ? showMobileMenu : false">x
    </div>
    <ul :class="$mq" v-if="$mq === 'mobile' ? showMobileMenu : true">
      <li :class="zoom">
        <router-link to="/">STEREO LIBRE</router-link>
      </li>
      <li>
        <a>CATEGORIES</a>
        <ul class="subMenu">
          <router-link class="subElement" :key="category.id" :to="'/category/'+category.id"
                       v-for="category in categories">
            <li>
              {{ (category.name.toUpperCase()) }}
            </li>
          </router-link>
        </ul>

      </li>
      <li :class="zoom">
        <router-link to="/history">LE GRENIER</router-link>
      </li>
      <li :class="zoom">
        <router-link to="/us">NOUS</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Menu",
  data() {
    return {
      showMobileMenu: false
    }
  },
  computed: {
    ...mapState('post', ['categories']),
    zoom() {
      return this.$mq === 'desktop' ? 'zoom' : '';
    }
  }
}
</script>

<style scoped lang="scss">
nav {
  width: 100%;
  background-color: #fff;
  font-size: 1.2rem;
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
    cursor: pointer;

    .subMenu {
      display: flex;
      flex-direction: column;
      position: absolute;
      z-index: 99999;
      filter: drop-shadow(0 0 0.2rem #b8b8b8);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s ease, visibility 0.2s ease;

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

    &:hover {
      .subMenu {
        opacity: 1;
        visibility: visible;
      }
    }
  }
}


li a {
  text-decoration: none;
  color: #2a2a2a;
}
</style>