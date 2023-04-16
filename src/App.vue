<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import SurfForecast from './components/surfforecast.vue'
import SurfforecastMagic from "@/components/tester.vue";

</script>

<template>
<!--  <header>-->
<!--&lt;!&ndash;    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />&ndash;&gt;-->

<!--    <div class="wrapper">-->
<!--&lt;!&ndash;      <HelloWorld msg="You did it!" />&ndash;&gt;-->
<!--    </div>-->
<!--  </header>-->
  <main>
  <div class="navbar">


    <h1 class="title"> Lazy Kelp</h1>
    <h3> Only 4* + 5* forecasts </h3>
  </div>


<!--    <SurfForecast />&lt;!&ndash;&ndash;&gt;-->
    <SurfforecastMagic />
<!--    <TheWelcome />-->
 </main>
</template>

<style scoped>
header {
  line-height: 1.5;
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
