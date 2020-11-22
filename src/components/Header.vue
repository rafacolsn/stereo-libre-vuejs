<template>
  <div class="wrapper">
    <img id="logo" alt="header" src="@/assets/logo-sl.jpg">
    <img id="header" alt="header" src="@/assets/couv.jpg">
    <div class="text">
      <h1>STEREO LIBRE</h1>
      <p>
        Le rendez-vous du libertinage musical, enfin déconfiné.
        Deux animateurs et chacun sa playlist de retour en
        studio.
      </p></div>
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
  /*!*width: 100%;*!*/
  overflow: hidden;
  /*content: "";*/
  /*display: block;*/
  position: absolute;
  /*!*min-height: 25rem;*!*/
  top: calc(0% - 10rem);
  left: 0;
  /*margin-bottom: 25rem;*/
  /*border: 2px solid red;*/

}
h1{
  font-size: 2.5rem;
}
.text {
  color: white;
  position: absolute;
  top: 20%;
  left: 25%;
  /*filter: drop-shadow(0 0 0.75rem #ffffff);*/

}

.text p {
  font-size: 1rem;
  background: black;
  border-radius: 5px;
  padding: .2rem 1rem;
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
