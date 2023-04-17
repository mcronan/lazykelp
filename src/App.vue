<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import SurfforecastMagic from "@/components/forecasts.vue";


</script>

<template>
<!--  <header>-->
<!--&lt;!&ndash;    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />&ndash;&gt;-->

<!--    <div class="wrapper">-->
<!--&lt;!&ndash;      <HelloWorld msg="You did it!" />&ndash;&gt;-->
<!--    </div>-->
<!--  </header>-->
  <main class="margin-bottom">
  <div class="navbar">


    <h1 class="title"> Lazy Kelp</h1>
    <h3> Only 4* + 5* forecasts </h3>
    <h4> {{randomString}} </h4>
  </div>


<!--    <SurfForecast />&lt;!&ndash;&ndash;&gt;-->
    <SurfforecastMagic />
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
