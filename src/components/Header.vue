<template>
  <div class="wrapper" :class="$mq">
    <img id="cover" alt="img" :src="randomImage()" class="image" :class="$mq">
    <img v-if="$mq !== 'mobile'" id="logo" alt="logo" src="@/assets/logo-sl.jpg">
    <div class="text" :class="$mq">
      <h1>STEREO LIBRE</h1>
      <p id="subtitle">Le rendez-vous du libertinage musical. Un thème, des animateurs, chacun sa playlist.</p>
      <p id="social"></p>
      <div class="wrap">
        <ul class="platform">
          <li v-for="(platform, index) in platforms" :key="index"><a :href="platform.url" target="_blank"><img
              :src="require(`@/assets/${platform.label}.png`)" width="25" :alt="platform.label"
              :title="platform.label"/></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {platforms} from "@/utils/platforms";

export default {
  data() {
    return {
      text: "S'abonner au podcast 🖣",
      typingSpeed: 80,
      platforms: platforms
    }
  },
  name: "Header",
  methods: {
    randomImage() {
      let images = [
        require('@/assets/IMG_7808.jpg'),
        require('@/assets/IMG_7810.jpg'),
        require('@/assets/IMG_7812.jpg'),
        require('@/assets/IMG_9772.jpg'),
        require('@/assets/IMG_9783.jpg'),
        require('@/assets/IMG_9828.jpg'),
      ]
      return `${images[Math.floor(Math.random() * images.length)]}`;
    },
    typeWriter() {
      const social = document.getElementById("social");
      let index = 0;
      const {text, typingSpeed} = this;

      const type = () => {
        if (index < text.length) {
          social.innerHTML += text.charAt(index);
          index++;
          setTimeout(type, typingSpeed);
        }
      };

      type();
    },
  },
  mounted() {
    this.typeWriter();
  },
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
    flex-direction: column;
    align-items: center;
  }
}

#social {
  white-space: nowrap;
  overflow: hidden;
}

#subtitle {
  font-size: 1.2rem;
  color: white;
  display: inline-block;
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
    display: block;
    text-align: center;
    padding: 1rem;
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

#social {
  margin-top: 1rem;
  border-radius: 0;
}

.wrap {
  display: flex;
  justify-content: center;
  align-items: center;

  &.mobile {
    flex-direction: column;
  }
}

.platform {
  list-style: none;
  display: flex;

  &.mobile {
    justify-content: center;
  }

  li {
    padding: 1rem 1rem 0;

    img {
      transition: transform 0.3s ease, filter 0.3s ease;
      animation: pulse 2s infinite;
    }

    img:hover {
      filter: brightness(1.2);
    }
  }

  li:nth-child(1) img {
    animation-delay: 0s;
  }

  li:nth-child(2) img {
    animation-delay: 0.1s;
  }

  li:nth-child(3) img {
    animation-delay: 0.2s;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
