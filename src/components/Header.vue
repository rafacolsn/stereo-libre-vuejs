<template>
  <div class="wrapper" :class="$mq">
    <img id="cover" alt="img" :src="randomImage()" class="image" :class="$mq">
    <img id="logo" alt="logo" src="@/assets/logo-sl.jpg">
    <div class="text" :class="$mq">
      <h1>STEREO LIBRE</h1>
      <p>Le rendez-vous du libertinage musical. Un thème, des animateurs, chacun sa playlist.</p>
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
  align-items: center;

  &.mobile {
    height: unset;
    width: 100%;
  }


}

.image {
  max-height: 25rem;
  border-radius: 50px 0 0 50px;

  &.mobile {
    max-width: 100%;
    border-radius: 14px;
  }

}

.text {
  flex: 1;
  color: white;

  &.mobile {
    display: none;
  }
}

.text p {
  font-size: 1rem;
  background: black;
  opacity: 0.7;
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
