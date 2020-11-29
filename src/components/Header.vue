<template>
  <div class="wrapper">
    <img id="logo" alt="logo" src="@/assets/logo-sl.jpg">
    <img id="header" alt="header" src="@/assets/couv.jpg">
    <div class="text">
      <h1>STEREO LIBRE</h1>
      <p>
        Le rendez-vous du libertinage musical, enfin déconfiné.
        Deux animateurs et chacun sa playlist de retour en
        studio.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
.wrapper {
  height: 100%;
  max-height: calc(100% - 10rem);
  overflow: hidden;
  position: absolute;
  top: calc(0% - 10rem);
  left: 0;
  /*background: #05822E;*/
  /*background-image: url("../assets/couv.jpg");*/
}
h1{
  font-size: 3rem;
  margin-bottom: 4rem;
}
.text {
  color: white;
  position: absolute;
  top: 20%;
  left: 25%;
}

.text p {
  font-size: 1rem;
  background: black;
  border-radius: 5px;
  padding: .2rem 1rem;
  margin-top: 20rem;
}


#header {
  width: 100%;
  /*height: 35rem;*/
}

#logo {
  height: 30%;
  position: absolute;
  bottom: 0;
  left: 3%;
}


</style>
