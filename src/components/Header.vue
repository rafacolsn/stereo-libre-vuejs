<template>
  <div class="header-wrapper" :class="$mq">
    <img id="cover" alt="img" :src="randomImage()" class="cover-image" :class="$mq">

    <img v-if="$mq !== 'mobile'" id="logo" alt="logo" src="@/assets/logo-sl.jpg">

    <div class="header-content" :class="$mq">
      <div class="text-block">
        <h1>STEREO LIBRE</h1>
        <p class="subtitle">Le rendez-vous du libertinage musical.<br>Un thème, des animateurs, chacun sa playlist.</p>
      </div>

      <div class="subscribe-block">
        <p class="subscribe-label">ÉCOUTER &amp; S'ABONNER</p>
        <div class="platform-list">
          <a
            v-for="(platform, index) in platforms"
            :key="index"
            :href="platform.url"
            target="_blank"
            class="platform-btn"
            :title="platform.label"
          >
            <img :src="require(`@/assets/${platform.label}.png`)" width="20" :alt="platform.label" />
            <span>{{ platform.label }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {platforms} from "@/utils/platforms";

export default {
  name: "Header",
  data() {
    return {
      platforms
    }
  },
  methods: {
    randomImage() {
      const images = [
        require('@/assets/IMG_9772.jpg'),
        require('@/assets/IMG_9783.jpg'),
        require('@/assets/IMG_9828.jpg'),
        require('@/assets/SL a trois 01.jpg'),
        require('@/assets/SL a trois 02.jpg'),
        require('@/assets/SL a trois 03.jpg'),
        require('@/assets/SL a trois 04.jpg'),
      ];
      return images[Math.floor(Math.random() * images.length)];
    }
  }
}
</script>

<style scoped lang="scss">
.header-wrapper {
  position: relative;
  width: 99%;
  margin: 0 auto;
  height: 25rem;
  background-color: #000;
  border-radius: 50px;
  display: flex;
  align-items: stretch;
  overflow: hidden;

  &.mobile {
    height: auto;
    width: 100%;
    border-radius: 0;
    flex-direction: column;
  }
}

.cover-image {
  height: 100%;
  max-height: 25rem;
  object-fit: cover;
  border-radius: 50px 0 0 50px;
  flex-shrink: 0;

  &.mobile {
    width: 100%;
    height: 14rem;
    border-radius: 0;
    object-fit: cover;
  }
}

.header-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem 2.5rem;
  gap: 1.2rem;
  position: relative;

  &.mobile {
    padding: 1.5rem;
  }
}

#logo {
  height: 28%;
  position: absolute;
  bottom: 0;
  left: 3%;
  opacity: 0.9;
}

.text-block {
  h1 {
    font-size: 2.6rem;
    font-weight: bold;
    color: white;
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.5;
  }
}

.subscribe-block {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.subscribe-label {
  font-size: 0.7rem;
  font-weight: bold;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
}

.platform-list {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.platform-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.45rem 1rem;
  color: white;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1;
  transition: background 0.2s ease, border-color 0.2s ease;

  img {
    display: block;
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  span {
    display: block;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    color: white;
  }
}
</style>
