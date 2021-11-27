<template>
  <div id="app">
    <Menu></Menu>
    <Header></Header>
    <div>
      <router-view></router-view>
    </div>
    <footer class="footer">{{ footer }}</footer>
  </div>
</template>

<script>
import Header from './components/Header'
import moment from "moment";
import Menu from "@/components/Menu";

export default {
  name: 'App',
  computed: {
    footer() {
      return "Jérôme Tielemans & Raphaël Colson @ Stéréo Libre - " + moment().format('MMMM Y')
    }
  },
  components: {
    Header,
    Menu
  },
  async created() {
    await this.$store.dispatch('post/getCategories');
    await this.$store.dispatch('post/getEpisodes');
    moment.locale('fr');
  }
}
</script>

<style lang="scss">
/*reset css*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}

body {
  line-height: 1;
}

ol, ul {
  list-style: none;
}

blockquote, q {
  quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}

a, a:hover, a:active {
  text-decoration: none;
  color: #555555;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

#app {
  font-family: Montserrat, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #555555;
  line-height: 1.7;
  font-size: 16px;
}

.content {
  /*margin from header*/
  margin: 3rem auto 0;
  width: 90%;
}

.card-header {
  background: black;
  border-radius: 10px 10px 0 0;
  color: white;
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin: 0 1rem;
}

@media screen and (max-width: 992px) {
  .content {
    width: 100%;
  }

  .navigation {
    flex-direction: column;
  }
}

.navigation a {
  color: #d3d3d3;

  &:hover {
    color: white;
  }
}

.tag {
  position: absolute;
  top: 3rem;
  left: 0;
  padding: .3rem 1rem .3rem 2rem;
  border-radius: 0 5px 5px 0;

  a {
    color: white;

    &:hover {
      color: black;
    }
  }
}

.zoom {
  transition: all .2s ease-in-out;
}

.zoom:hover {
  transform: scale(1.1);
}

.pointer {
  cursor: pointer;
  color: white;
}

.cards {
  background: #E3E3E3;
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-flow: wrap;
  /*border: 2px solid blue;*/
  justify-content: center;
}

.card-header h4 {
  font-size: 2rem;
  margin-bottom: 0;
}

.footer {
  margin: 1rem 0;
  font-size: .8rem;
  font-family: 'Roboto Mono', Monaco, courier, monospace
}
</style>
