<template>
  <div class="wrapper">
    <img id="logo" alt="logo" src="@/assets/logo-sl.jpg">
    <!--    <img id="header" alt="header" src="@/assets/couv.jpg">-->
    <div class="text">
      <h1>STEREO LIBRE</h1>
      <p>Le rendez-vous du libertinage musical, enfin déconfiné.
        Deux animateurs et chacun sa playlist de retour en
        studio.</p>
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
  background-image: url("../assets/couv-16-9.jpg");
  background-size: cover;
  background-position: center 15%;
  height: 25rem;
  position: relative;
}

.text {
  color: white;
}

.text p {
  font-size: 1rem;
  background: black;
  opacity: 70%;
  border-radius: 5px;
  padding: .2rem 1rem;
  margin: 2rem auto 0;
  width: fit-content;
}

.text h1 {
  font-size: 3rem;
  padding-top: 3rem;
}


#logo {
  height: 30%;
  position: absolute;
  bottom: 0;
  left: 3%;
}


</style>
