<template>
  <div class="player" :style="{ '--color': color }">
    <div class="player-label">▶ ÉCOUTER L'ÉPISODE</div>

    <div class="player-controls">
      <button class="play-btn" @click="togglePlay" :aria-label="playing ? 'Pause' : 'Play'">
        <span v-if="!playing">&#9654;</span>
        <span v-else>&#9646;&#9646;</span>
      </button>

      <div class="progress-area">
        <input
          type="range"
          class="progress-bar"
          :value="progress"
          min="0"
          max="100"
          step="0.1"
          @input="seek"
        />
        <div class="time-info">
          <span>{{ currentTimeDisplay }}</span>
          <span class="remaining">-{{ remainingDisplay }}</span>
        </div>
      </div>
    </div>

    <div class="player-extras">
      <div class="speed-controls">
        <span class="extras-label">Vitesse</span>
        <button
          v-for="rate in speeds"
          :key="rate"
          class="speed-btn"
          :class="{ active: playbackRate === rate }"
          @click="setSpeed(rate)"
        >{{ rate }}×</button>
      </div>

      <a class="download-btn" :href="src" target="_blank" rel="noopener">
        ↡ Télécharger
      </a>
    </div>

    <audio
      ref="audio"
      :src="src"
      preload="metadata"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoaded"
      @ended="playing = false"
    ></audio>
  </div>
</template>

<script>
export default {
  name: 'AudioPlayer',
  props: {
    src: { type: String, required: true },
    color: { type: String, default: '#899499' }
  },
  data() {
    return {
      playing: false,
      progress: 0,
      currentTime: 0,
      duration: 0,
      playbackRate: 1,
      speeds: [0.75, 1, 1.25, 1.5, 2],
    };
  },
  computed: {
    currentTimeDisplay() {
      return this.formatTime(this.currentTime);
    },
    remainingDisplay() {
      return this.formatTime(Math.max(0, this.duration - this.currentTime));
    }
  },
  methods: {
    togglePlay() {
      const audio = this.$refs.audio;
      if (this.playing) {
        audio.pause();
      } else {
        audio.play();
      }
      this.playing = !this.playing;
    },
    seek(e) {
      this.$refs.audio.currentTime = (e.target.value / 100) * this.$refs.audio.duration;
    },
    setSpeed(rate) {
      this.playbackRate = rate;
      this.$refs.audio.playbackRate = rate;
    },
    onTimeUpdate() {
      const audio = this.$refs.audio;
      this.currentTime = audio.currentTime;
      this.progress = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    },
    onLoaded() {
      this.duration = this.$refs.audio.duration;
    },
    formatTime(s) {
      if (!s || isNaN(s)) return '0:00:00';
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = Math.floor(s % 60);
      return `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }
  }
};
</script>

<style scoped lang="scss">
.player {
  background: #111;
  border-radius: 14px;
  padding: 1.8rem 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  margin: 2.5rem 0;
}

.player-label {
  color: var(--color);
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 1.2rem;
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.play-btn {
  background: var(--color);
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
  cursor: pointer;
  font-size: 1.1rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(1.2);
  }
}

.progress-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.progress-bar {
  width: 100%;
  accent-color: var(--color);
  cursor: pointer;
}

.time-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.5);
}

.remaining {
  color: rgba(255, 255, 255, 0.35);
}

.player-extras {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.2rem;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.extras-label {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-right: 0.5rem;
}

.speed-controls {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.speed-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.78rem;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: var(--color);
    color: var(--color);
  }

  &.active {
    background: var(--color);
    border-color: var(--color);
    color: white;
  }
}

.download-btn {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  padding: 0.2rem 0.7rem;
  transition: all 0.15s ease;

  &:hover {
    border-color: var(--color);
    color: var(--color);
  }
}
</style>
