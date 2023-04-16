<template>

  <div v-for="(group, spot) in groupedForecasts" :key="spot">
    <h3 class="spot">{{ spot.replace('Surf Report and Forecast', '').replace('Nearby Spots', '') }}</h3>
    <div v-for="(dayGroup, day) in group" :key="day">
      <h4 class="forecast-col day">{{ day }}</h4>
      <div class="forecast-row lightblue">
        <div class="forecast-col wide-hour">Hour</div>
        <div class="forecast-col wide-swell">Swell</div>
        <div class="forecast-col wide-link">Link</div>
        <div class="forecast-col wide-rating">Rating</div>
      </div>
      <div v-for="(forecast, index) in dayGroup" class="colorit">
        <div v-if="forecast.hour !== '12am' && forecast.hour !== '3am'" class="forecast-row " :key="forecast._id">
          <div class="forecast-col wide-hour">{{ forecast.hour }}</div>
          <div class="forecast-col wide-swell">{{ forecast.swell.replace('ft-', 'ft') }}</div>
          <div class="forecast-col wide-link">
            <a :href="forecast.link" target="_blank">View Report</a>
          </div>
          <div class="forecast-col wide-rating">
                 <span v-if="forecast.fourStarBool && !forecast.fiveStarBool" class="star-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00c8ff" width="20px" height="20px">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00c8ff" width="20px" height="20px">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00c8ff" width="20px" height="20px">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00c8ff" width="20px" height="20px">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
     </span>
            <span v-if="forecast.fiveStarBool" class="star-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0088ff" width="20px" height="20px">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
     </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0088ff" width="20px"
                           height="20px">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
     </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0088ff" width="20px"
                           height="20px">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
     </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0088ff" width="20px"
                           height="20px">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
     </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0088ff" width="20px"
                           height="20px">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
     </svg>
              </span>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      forecasts: []
    };
  },
  computed: {

    filteredForecasts() {
      const today = new Date();
      const todayDate = today.getDate();
      const todayMonth = today.getMonth() + 1;
      const dateFilter = new RegExp(`\\b(${todayDate}|0${todayDate})/(${todayMonth}|0${todayMonth})`);

      return this.forecasts.filter((forecast) => {
        const forecastDate = forecast.dayDate.match(dateFilter);
        if (forecastDate) {
          const [day, month] = forecastDate[0].split('/');
          const forecastDateObj = new Date(today.getFullYear(), parseInt(month) - 1, parseInt(day));
          return forecastDateObj >= today;
        }
        return false;
      });
    },

    groupedForecasts() {
      const groups = {};
      this.forecasts.forEach((forecast) => {
        if (!groups[forecast.spot]) {
          groups[forecast.spot] = {};
        }
        if (!groups[forecast.spot][forecast.dayDate]) {
          groups[forecast.spot][forecast.dayDate] = [];
        }
        groups[forecast.spot][forecast.dayDate].push(forecast);
      });

      const sortIndex = (hour) => {
        switch (hour) {
          case "6am": return 0;
          case "9am": return 1;
          case "Noon": return 2;
          case "3pm": return 3;
          case "6pm": return 4;
          case "9pm": return 5;
          default: return 6;
        }
      };

      Object.values(groups).forEach((spot) => {
        Object.values(spot).forEach((dayGroup) => {
          dayGroup.sort((a, b) => sortIndex(a.hour) - sortIndex(b.hour));
        });
      });
      return groups;
    }
  },
  mounted() {
    this.fetchForecasts();
  },
  methods: {

    async fetchForecasts() {
      try {
        //const response = await fetch('https://lazykelp.onrender.com/wave-forecasts');
        //const response = await fetch('http://localhost:3000/wave-forecasts');
        const serverURL = process.env.VUE_APP_SERVER_URL;
        const response = await fetch(`${serverURL}/wave-forecasts`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.forecasts = data;
      } catch (err) {
        console.error(err);
      }
    }

  }
}

</script>

<style>

.surf-reports {
  display: flex;
  flex-direction: column;
  margin-bottom: 300px;
}

.logo {
  font-family: 'Tahoma';
  font-size: 36px;
  margin-bottom: 0px;
  margin-top: 50px;
  margin-left: -15px;
  font-weight: bold;

}

.row {
  margin-right: -15px;
  margin-left: -15px;
}

.col-12 {
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
}

.col-md-6 {
  flex-basis: 0;
  flex-grow: 1;
  max-width: 50%;
}

.spot {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: -18px;
  margin-top: 30px;
  text-align: left;
}

.forecast-row {
  display: flex;
  flex-direction: row;
  height: 35px;
}

.forecast-col {
  padding-right: 4px;
}

.day {
  align-self: flex-start;
  margin-bottom: 10px;
  font-size: 20px;
  margin-top: 18px;
}


.wide-hour {
  flex-basis: auto;
  padding-left: 4px;
  padding-right: 4px;
  min-width: 70px;
  width: max-content;
  display: flex;
  align-items: center;
}

.wide-swell {
  flex-basis: auto;
  padding-left: 4px;
  padding-right: 4px;
  min-width: 70px;
  width: max-content;
  display: flex;
  align-items: center;
}

.wide-link {
  flex-basis: auto;
  padding-left: 4px;
  padding-right: 4px;
  min-width: 107px;
  width: max-content;
  display: flex;
  align-items: center;
}

.wide-rating {
  flex-basis: auto;
  padding-left: 4px;
  padding-right: 4px;
  min-width: 100px;

  width: max-content;
  display: flex;
  align-items: center;
}

.star-icon {
  display: inline-flex;
  align-items: center;
  font-size: 15px;
}

.star-blue {
  color: #0088ff;
}

.star-darker-blue {
  color: #005299;
}

.forecast-row:nth-child(3) {
  background-color: #f1f8ff;
}

.lightblue {
  background: lightblue;
}

.spacer {
  width: 60px;
}

.minus-margin {
  margin-left: -15px;
}

.colorit:nth-child(odd) {
  background-color: #ebf5f9;
}

.colorit:nth-child(even) {
  background-color: #f5fafc;
}

.title {
  margin-top: 30px;
  font-weight: bold;
}


@media (max-width: 767px) {
  .col-md-6 {
    max-width: 100%;
  }

  .wide-hour {
    min-width: 50px;
  }

  .wide-swell {
    min-width: 50px;
  }

  .wide-link {
    min-width: 70px;
  }

  .wide-rating {
    min-width: 100px;
  }
}

</style>