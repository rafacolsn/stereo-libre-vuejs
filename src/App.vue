<template>
  <div id="app">
    <Header></Header>
    <h1>Stéréo Libre</h1>
    <Cards></Cards>

  </div>
</template>

<script>
import Header from './components/Header'
import Cards from './views/Cards.vue'

export default {
  name: 'App',
  components: {
    Header,
    Cards
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
  margin-top: 60px;
  line-height: 1.7;
  font-size: 15px;
}
</style>
