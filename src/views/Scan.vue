<template>
  <div class="scan-page">
    <div class="scan-card">

      <!-- 1. Qui on est, en une ligne -->
      <div class="intro">
        <img class="logo" src="@/assets/logo-sl.jpg" alt="Stéréo Libre">
        <p class="kicker">Equinoxe FM 105 · Liège</p>
        <h1 class="intro-title">
          L'émission déformatée
          <span class="intro-tagline">Le rendez-vous du libertinage musical</span>
        </h1>
        <p class="intro-text">Artistes, découvertes, live et voyages sonores, avec Adri, Djé &amp; Raph.</p>
      </div>

      <!-- 2. Écouter tout de suite : la dernière émission, titre dans le lecteur -->
      <div class="latest">
        <div v-if="!latest" class="latest-loading">
          Un moment, ça arrive…
          <pulse-loader color="#899499" size="8px"></pulse-loader>
        </div>

        <audio-player v-else-if="audioSrc" :src="audioSrc" :color="color" compact
                      label="▶ La dernière émission" :title="latest.title"
                      :subtitle="latestDate" :link="'/episode/' + latest.id"/>

        <router-link v-else :to="'/episode/' + latest.id" class="btn primary">
          ▶ Écouter la dernière émission
        </router-link>
      </div>

      <!-- 3. Quand nous écouter en direct + 4. nous suivre -->
      <div class="listen">
        <p class="label">EN DIRECT</p>
        <p class="schedule">
          Le dimanche de 20 h à 22 h sur
          <a href="https://www.equinoxefm.be" target="_blank" rel="noopener">Equinoxe FM</a> (105 FM, Liège)
        </p>

        <p class="label">EN PODCAST</p>
        <div class="platforms">
          <a v-for="platform in platforms" :key="platform.label" :href="platform.url"
             target="_blank" rel="noopener" class="platform" :title="platform.label">
            <img :src="require(`@/assets/${platform.label}.png`)" width="18" :alt="platform.label">
            <span>{{ platform.label }}</span>
          </a>
        </div>
      </div>

      <!-- Pour les musiciens qui scannent -->
      <div class="artists">
        <p class="artists-title">Tu fais de la musique ?<br>Viens passer à l'antenne.</p>
        <p class="artists-text">Un projet, un disque, un concert à annoncer : écris-nous, on te répond.</p>
        <a class="btn" :href="mailtoUrl">✉ {{ email }}</a>
      </div>

      <div class="links">
        <router-link to="/">Tous les épisodes</router-link>
        <router-link to="/us">L'équipe</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import moment from "moment";
import AudioPlayer from "@/components/AudioPlayer";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import {platforms} from "@/utils/platforms";
import {CONTACT_EMAIL} from "@/utils/hosts";
import {getColorById} from "@/utils/colors";

// Page ciblée par le QR code des stickers collés dans les lieux de concert.
// Le QR pointe vers https://www.stereolibre.be/scan (et rien d'autre), ce qui
// permet d'isoler le trafic « sticker » dans les stats.
export default {
  name: "Scan",
  metaInfo() {
    const description = "Stéréo Libre, l'émission radio d'Equinoxe FM qui explore la musique sans frontières. Écoute la dernière émission, en direct le dimanche soir ou en podcast.";
    return {
      title: 'Écouter',
      meta: [
        {vmid: 'description', name: 'description', content: description},
        {vmid: 'og:title', property: 'og:title', content: 'Stéréo Libre · Écouter'},
        {vmid: 'og:description', property: 'og:description', content: description},
        // Page d'atterrissage pour les stickers : inutile de l'indexer.
        {vmid: 'robots', name: 'robots', content: 'noindex'},
      ]
    }
  },
  data() {
    return {
      platforms,
      email: CONTACT_EMAIL,
    }
  },
  computed: {
    ...mapGetters('post', ['sortedLastEpisodes']),
    latest() {
      return this.sortedLastEpisodes[0] || null;
    },
    latestDate() {
      return moment(this.latest.date).format('DD MMMM YYYY');
    },
    color() {
      return this.latest ? getColorById(this.latest.category.id) : '#899499';
    },
    audioSrc() {
      const match = this.latest?.content?.match(/src="([^"]+\.mp3[^"]*)"/);
      return match ? match[1] : null;
    },
    mailtoUrl() {
      const subject = encodeURIComponent('Stéréo Libre — contact (sticker)');
      return `mailto:${this.email}?subject=${subject}`;
    },
  },
  components: {
    AudioPlayer,
    PulseLoader,
  }
}
</script>

<style scoped lang="scss">
.scan-page {
  margin: 2rem auto 0;
  padding: 0 1rem;
  max-width: 34rem;
}

.scan-card {
  border-radius: 10px;
  overflow: hidden;
  background: #f3f3f3;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  text-align: left;
}

.kicker, .label {
  font-family: 'Roboto Mono', Monaco, courier, monospace;
  font-size: .75rem;
  letter-spacing: .08em;
}

.label {
  margin-bottom: .5rem;
}

.intro {
  background: black;
  color: white;
  padding: 1rem 1.5rem 1.5rem;
  text-align: center;

  .logo {
    display: block;
    width: 11rem;
    height: auto;
    margin: 0 auto .75rem;
  }

  .kicker {
    color: #d3d3d3;
    margin-bottom: .5rem;
  }
}

.intro-title {
  font-size: 1.9rem;
  font-weight: bold;
  line-height: 1.15;
  margin-bottom: 1rem;
}

.intro-tagline {
  display: block;
  margin-top: .35rem;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.3;
  color: #aaa;
}

.intro-text {
  font-size: .9rem;
  color: #999;
}

.latest {
  padding: 1rem;
  background: white;
}

.latest-loading {
  padding: .5rem;
  color: #666;
}

.listen {
  padding: 1.5rem;

  .label:not(:first-child) {
    margin-top: 1.25rem;
  }
}

.schedule a {
  text-decoration: underline;
}

.platforms {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
}

.platform {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  padding: .4rem .8rem;
  border-radius: 20px;
  background: white;
  font-size: .9rem;
}

.artists {
  background: black;
  color: white;
  padding: 1.5rem;
}

.artists-title {
  font-size: 1.15rem;
  font-weight: bold;
  line-height: 1.3;
  margin-bottom: .5rem;
}

.artists-text {
  color: #d3d3d3;
  margin-bottom: .5rem;
}

.btn {
  display: block;
  text-align: center;
  padding: .75rem 1rem;
  border-radius: 6px;
  border: 1px solid white;
  color: white;
  font-weight: bold;
  margin-top: .6rem;
  word-break: break-all;

  &:hover, &:active {
    color: black;
    background: white;
  }

  &.primary {
    background: black;
    border-color: black;
    color: white;
  }
}

.links {
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem 1.5rem;
  font-size: .9rem;

  a {
    text-decoration: underline;
  }
}
</style>
