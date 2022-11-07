<template>
  <div class="wrapper">
    <div class="modal">
      <div class="close" @click="close()">X</div>
      <ul class="main">
        <li v-for="(platform, index) in platforms" :key="index"><a :href="platform.url" target="_blank"><img
            :src="require(`@/assets/${platform.label}.png`)" :alt="platform.label"/>{{ platform.label }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      platforms: [
        {
          label: 'Spotify',
          // url: 'https://open.spotify.com/show/7qp2xN3wvPc2aqJcCVV8FD',
          url: 'https://open.spotify.com/show/24WLp9BB3seP2Vg0Ar7twl',
        },
        {
          label: 'Apple Podcast',
          // url: 'https://podcasts.apple.com/us/podcast/st%C3%A9r%C3%A9o-libre/id1468910081?uo=4',
          url: 'https://podcasts.apple.com/be/podcast/st%C3%A9r%C3%A9o-libre/id1652153153?l=fr',
        },
        {
          label: 'Deezer',
          // url: 'https://www.deezer.com/us/show/3477317',
          url: 'https://www.deezer.com/fr/show/5318617',
        },
        // {
        //   label: 'Anchor',
        //   url: 'https://anchor.fm/stereo-libre',
        // },
        {
          label: 'Google-Podcasts',
          url: 'https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy9jMWY4Y2ZjL3BvZGNhc3QvcnNz',
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
  color: #2b2b2b;

  .modal {
    position: relative;
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 2rem 7rem 2rem 3rem;
    border-radius: 5px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.5);
    @media screen and (max-width: 576px) {
    padding: 1rem 2rem 1rem 1rem;
    }

    .close {
      cursor: pointer;
      font-weight: bold;
      position: absolute;
      color: white;
      background: #343434;
      border-radius: 50%;
      padding: 4px 12px;
      top: -10px;
      right: -10px;
    }

    .main {
      list-style: none;
      text-align: left;
      padding-left: 0;

      li {
        //min-width: 15rem;
        padding: 0 2rem;
        margin: 0 0 15px 0;
        padding-bottom: 1rem;
        border-bottom: 1px solid #f7f7f7;

        &:first-child {
          margin-top: .5rem
        }

        &:last-child {
          margin-bottom: 0;
        }
      }

      a {
        text-decoration: none;
        color: #2b2b2b;

        img {
          display: inline-block;
          vertical-align: middle;
          margin-right: 30px;
          height: 32px;
          width: 32px;
        }
      }
    }
  }
}
</style>
