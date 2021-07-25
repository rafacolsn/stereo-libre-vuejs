<template>
  <div id="app">
    <Menu></Menu>
    <Header></Header>
    <h1>Stéréo Libre</h1>
    <div class="content">
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
  created() {
    moment.locale('fr');
  }
}
</script>

<style>
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
  /*margin-top: 60px;*/
  line-height: 1.7;
  font-size: 16px;
}

.content {
  /*margin from header*/
  margin: 28rem auto 0;
  width: 80%;
}

.card-header {
  background: black;
  color: white;
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.pointer {
  cursor: pointer;
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
