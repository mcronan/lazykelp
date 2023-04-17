<script setup>

import SurfforecastMagic from "@/components/forecasts.vue";


</script>

<template>

  <main class="margin-bottom">
    <div class="navbar">


      <!--    <h1 class="title"> Lazy Kelp</h1>-->
      <div class="logo-holder">
        <img src="../public/lazykelplogo.png" alt="Lazy Kelp Logo">
      </div>
      <h3> 7-day forecasts. Only 4* + 5*. </h3>
      <h4> {{ randomString }} </h4>
    </div>


    <!--    <SurfForecast />&lt;!&ndash;&ndash;&gt;-->
    <SurfforecastMagic/>
    <!--    <TheWelcome />-->
  </main>
</template>

<script>
export default {
  data() {
    return {
      strings: ["Three stars or less? It'll be a mess.", "Just two star? Time for the bar.", "Five star today? Keep the pint away.", "Pitted, so pitted."],
    };
  },
  computed: {
    randomString() {
      return this.strings[Math.floor(Math.random() * this.strings.length)];
    },
  },
};
</script>

<style scoped>

.title {
  font-size: 46px;
  font-family: "Alkatra", "sans-serif";
  color: rgb(38, 170, 57);
  margin-top: 15px;
}

header {
  line-height: 1.5;
}

.margin-bottom {
  margin-bottom: 70px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.navbar {
  /*padding-top: 10px;*/
  /*padding-bottom: 10px;*/
  /*background: #0088ff;*/
  /*color: white;*/
  /*width: 100%*/
}

.logo-holder {
  margin-top: 20px;
}

.logo-holder img {
  width: 200px;
  height: 55px;
  display: block;
  object-fit: contain;
  margin-left: -11px;
}



@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
