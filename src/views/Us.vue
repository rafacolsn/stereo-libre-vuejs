<template>
  <div class="content wrapper">
    <card-header title="L’émission “déformatée”"></card-header>
    <div class="flex">
      <div class="img">
      </div>
      <div class="text">
        <p>
          Des thèmes autour d’un artiste, d’un concept, d’un courant musical ou du feu.</p>
        <p>
          STEREO LIBRE est une émission de <strike>vieux intellectuels de gauche</strike> divertissement, avec des
          <strike>trucs
            bizarres</strike>
          découvertes, le tout enveloppé d’infos sur les artistes dû à notre <strike>capacité de lire wikipedia</strike>
          culture musicale.
          L’idée de base de cette émission est de ne plus avoir de format… à contrario de toute autre radio, télé et
          média
          dépendant des lois du <strike>capitalisme abject</strike> marché qui s’enferment de plus en plus dans un
          format… Le concept est
          donc <strike>d’ouvrir nos chakras</strike> de se « dé-formater » tout en continuant à diffuser et faire
          découvrir de la musique
          qu’elle soit passée ou présente…
        </p>
        <p> STEREO LIBRE propose un mélange de nos playlists imaginées par les animateurs (nous) découvrant mutuellement la
          playlist des uns des autres <strike>parfois avec stupeur</strike>, articulées autour d’un thème, d’un artiste, d’un
          courant musical. En plus, on passe même à la radio.
        </p>
        <p><a href="http://www.equinoxefm.be" target="_blank">Equinoxe FM</a> (105FM) Zone Liège
          Tous les dimanches de 20 à 22h.
          rediffusion le vendredi à minuit (techniquement, c'est le samedi).
        </p>
      </div>
    </div>
  </div>
</template>

<script>

import CardHeader from "@/components/CardHeader";

export default {
  name: "Us",
  components: {
    CardHeader
  }
}
</script>

<style scoped lang="scss">
@media screen and (max-width: 850px) {
  .flex {
    flex-direction: column;
  }
  .img {
    min-height: 16rem;
    border-bottom-right-radius: 0;
  }
}

@media screen and (min-width: 750px) {
.img {
  min-width: 30rem;
  min-height: 20rem;
  }
}


.flex {
  display: flex;
}
.img {
  background-image: url('../assets/IMG_9828.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 0 0 0 10px;
}
.text {
  text-align: left;
  background-color: #f3f3f3;
  border-radius: 0 0 10px 0;
}

p {
  padding: 1rem;
}

a {
  text-decoration: underline;
}

</style>