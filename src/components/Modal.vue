<template>
  <div class="wrapper">
    <div class="modal">
      <div class="close" @click="close()">x</div>
      <div class="content">{{ message }}</div>
      <div>
        <div :key="index" v-for="(platform, index) in platforms" @click="onClick(choice.value)"><img :src="'@/assets/' + platform.icon" alt="Spotify"/> {{ platform.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
  },
  data() {
      return {
        platforms: [
          {
            label: 'Spotify',
            url: 'https://open.spotify.com/show/7qp2xN3wvPc2aqJcCVV8FD',
            icon: "Spotify.png"
          },
          {
            label: 'iTunes',
            url: 'https://podcasts.apple.com/us/podcast/st%C3%A9r%C3%A9o-libre/id1468910081?uo=4',
            icon: "@/src/assets/Spotify.png"
          },
        ]

      }
  },
  methods: {
    onClick(event) {
      this.$emit('modalEvent', event);
    },
    close() {
      this.$emit('modalEvent', false);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 21000;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .modal {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    padding: 20px;
    width: 30%;
    border-radius: 2px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.5);

    .close {
      font-weight: bold;
      position: absolute;
      top: 10px;
      right: 15px;
    }

    .content {
      padding: 50px;
    }
  }
}
</style>
