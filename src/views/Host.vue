<template>
  <div class="host-page" v-if="host">
    <div class="host-card">
      <div class="photo" :style="{backgroundImage: `url(${photoUrl})`}"></div>

      <div class="body">
        <p class="kicker">STÉRÉO LIBRE · Equinoxe FM 105</p>
        <h1>{{ host.name }}, <span>{{ host.nickname }}</span></h1>
        <p class="pitch">{{ host.pitch }}</p>

        <div class="cta-block">
          <p class="cta-title">Tu fais de la musique ?<br>Viens passer à l'antenne.</p>
          <p class="cta-text">Un projet, un disque, un concert à annoncer : écris-nous, on te répond.</p>
          <a class="btn primary" :href="mailtoUrl">✉ {{ email }}</a>
          <a class="btn" :href="vcardUrl" :download="vcardFileName">＋ Enregistrer le contact</a>
        </div>

        <div class="listen-block">
          <p class="label">ÉCOUTER</p>
          <p class="schedule">
            Le dimanche de 20 h à 22 h sur
            <a href="https://www.equinoxefm.be" target="_blank" rel="noopener">Equinoxe FM</a> (105 FM, Liège)
            · rediffusion le vendredi à minuit
          </p>
          <div class="platforms">
            <a v-for="platform in platforms" :key="platform.label" :href="platform.url"
               target="_blank" rel="noopener" class="platform" :title="platform.label">
              <img :src="require(`@/assets/${platform.label}.png`)" width="18" :alt="platform.label">
              <span>{{ platform.label }}</span>
            </a>
          </div>
        </div>

        <div class="links">
          <router-link to="/">Les derniers épisodes</router-link>
          <router-link to="/us">L'équipe</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {hosts, CONTACT_EMAIL} from "@/utils/hosts";
import {platforms} from "@/utils/platforms";

export default {
  name: "Host",
  metaInfo() {
    if (!this.host) return {};
    const description = `Contacter Stéréo Libre via ${this.host.name} : venir dans l'émission, proposer un projet musical, écouter sur Equinoxe FM.`;
    return {
      title: `${this.host.name} · Contact`,
      meta: [
        {vmid: 'description', name: 'description', content: description},
        {vmid: 'og:title', property: 'og:title', content: `${this.host.name} · Stéréo Libre`},
        {vmid: 'og:description', property: 'og:description', content: description},
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
    host() {
      return hosts[this.$route.params.host];
    },
    photoUrl() {
      return require(`@/assets/${this.host.photo}`);
    },
    mailtoUrl() {
      const subject = encodeURIComponent(`Stéréo Libre — contact via ${this.host.name}`);
      return `mailto:${this.email}?subject=${subject}`;
    },
    vcardFileName() {
      return `stereo-libre-${this.host.slug}.vcf`;
    },
    vcardUrl() {
      const vcard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:;${this.host.name};;;`,
        `FN:${this.host.name} — Stéréo Libre`,
        'ORG:Stéréo Libre (Equinoxe FM)',
        `EMAIL;TYPE=INTERNET:${this.email}`,
        `URL:https://www.stereolibre.be/${this.host.slug}`,
        'END:VCARD',
      ].join('\r\n');
      return `data:text/vcard;charset=utf-8,${encodeURIComponent(vcard)}`;
    },
  },
  created() {
    if (!this.host) this.$router.replace('/');
  }
}
</script>

<style scoped lang="scss">
.host-page {
  margin: 2rem auto 0;
  padding: 0 1rem;
  max-width: 34rem;
}

.host-card {
  border-radius: 10px;
  overflow: hidden;
  background: #f3f3f3;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  text-align: left;
}

.photo {
  height: 18rem;
  background-size: cover;
  background-position: top center;
  background-color: black;
}

.body {
  padding: 1.5rem;
}

.kicker {
  font-family: 'Roboto Mono', Monaco, courier, monospace;
  font-size: .75rem;
  letter-spacing: .08em;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  color: black;
  line-height: 1.2;
  margin: .3rem 0 .5rem;

  span {
    font-weight: normal;
  }
}

.pitch {
  margin-bottom: 1.5rem;
}

.cta-block {
  background: black;
  color: white;
  border-radius: 10px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.cta-title {
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.3;
  margin-bottom: .5rem;
}

.cta-text {
  color: #d3d3d3;
  margin-bottom: 1rem;
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
    background: white;
    color: black;

    &:hover, &:active {
      background: #d3d3d3;
      color: black;
    }
  }
}

.label {
  font-family: 'Roboto Mono', Monaco, courier, monospace;
  font-size: .75rem;
  letter-spacing: .08em;
}

.schedule {
  margin-bottom: .75rem;

  a {
    text-decoration: underline;
  }
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

.links {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  font-size: .9rem;

  a {
    text-decoration: underline;
  }
}
</style>
