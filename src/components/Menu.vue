<template>
  <nav>
    <ul>
      <li class="zoom">
        <router-link to="/home">STEREO LIBRE</router-link>
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
export default {
  name: "Menu"
}
</script>

<style scoped>
nav {
  width: 100%;
  background-color: #fff;
  /*color: #0a0a0a;*/
  font-size: 1.2rem;
  font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  font-weight: bold;
}

ul {
  display: flex;
  justify-content: flex-end;
  margin-right: 10%;
}

li {
  list-style: none;
  padding: .5rem 1rem;
}

li a {
  text-decoration: none;
  color: #2a2a2a;
}
</style>