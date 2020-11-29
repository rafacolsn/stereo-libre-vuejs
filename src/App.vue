<template>
  <div id="app">
    <Header></Header>
    <h1>Stéréo Libre</h1>
<!--    <nav>-->
<!--      <ul>-->
<!--        <li>STEREO LIBRE</li>-->
<!--        <li>EPISODES</li>-->
<!--      </ul>-->
<!--    </nav>-->

    <Cards></Cards>
    <footer class="footer">{{footer}}</footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Cards from './views/Cards.vue'
import moment from "moment";

export default {
  name: 'App',
  computed :{
    footer() {
      return "Jérôme Tielemans & Raphaël Colson @ Stéréo Libre - " + moment().year()
    }
  },
  components: {
    Header,
    Cards
  },
  created() {
    moment.locale('fr');
  }
}
</script>

<style>
#app {
  font-family: Montserrat, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #555555;
  /*margin-top: 60px;*/
  line-height: 1.7;
  font-size: 15px;
}
</style>
