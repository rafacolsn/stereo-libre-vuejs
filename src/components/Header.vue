<template>
  <div class="wrapper">
    <img id="cover" alt="img" :src="randomImage()" class="image">
    <img id="logo" alt="logo" src="@/assets/logo-sl.jpg">
    <div class="text" :class="$mq">
      <h1>STEREO LIBRE</h1>
      <p>Le rendez-vous du libertinage musical, enfin déconfiné.
        Deux animateurs et chacun sa playlist de retour en
        studio.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    randomImage() {
      let images = [
        require('@/assets/IMG_7808.jpg'),
        require('@/assets/IMG_7810.jpg'),
        require('@/assets/IMG_7812.jpg')
      ]
      return `${images[Math.floor(Math.random() * images.length)]}`;
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  height: 25rem;
  position: relative;
  background-color: black;
  border-radius: 50px;
  margin: auto;
  width: 99%;
  display: flex;
}

.image {
  max-height: 25rem;
  border-radius: 50px 0 0 50px;
}

.text {
  color: white;
  padding: 7rem 1rem 1rem 1rem;

  &.mobile {
    display: none;
  }
}

.text p {
  font-size: 1rem;
  background: black;
  opacity: 70%;
  border-radius: 5px;
  padding: .2rem 1rem;
}

.text h1 {
  font-size: 3rem;
}


#logo {
  height: 30%;
  position: absolute;
  bottom: 0;
  left: 3%;
}


</style>
