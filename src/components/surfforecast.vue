<template>
  <div>
    <h1>Wave Forecast</h1>
    <ul>
      <li v-for="forecast in forecasts" :key="forecast.dayDate + forecast.hour">
        <h2>{{ forecast.dayDate }} {{ forecast.hour }}</h2>
        <p>Swell: {{ forecast.swell }}</p>
        <p>Spot: {{ forecast.spot }}</p>
        <p>Link: <a :href="forecast.link">{{ forecast.link }}</a></p>
        <p>Five Star Rating: {{ forecast.fiveStarBool }}</p>
        <p>Ratings:</p>
        <ul>
          <li v-for="rating in forecast.ratings" :key="rating">{{ rating }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      forecasts: []
    };
  },
  mounted() {
    this.fetchForecasts();
  },
  methods: {
    async fetchForecasts() {
      console.log("client");
      try {
        const response = await fetch('http://localhost:3000/wave-forecasts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.text();
        const jsonData = JSON.parse(data);
        console.log(jsonData);
        this.forecasts = jsonData;
      } catch (err) {
        console.error(err);
      }
    }

    // async fetchForecasts() {
    //   console.log("client")
    //   try {
    //     const response = await fetch('http://localhost:3000/wave-forecasts');
    //     const data = await response.json();
    //     console.log(JSON.parse(data))
    //     this.forecasts = data;
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
  }
};
</script>
