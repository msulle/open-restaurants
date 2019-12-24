<template>
  <div id="app" class="small-container">
    <h1>Available Restaurants</h1>

    <availability-form
      :availability="availability"
      @update:availability="updateRestaurants"
    />
    <restaurant-table :restaurants="restaurants" />
  </div>
</template>

<script>
  import RestaurantTable from '@/components/RestaurantTable.vue'
  import AvailabilityForm from '@/components/AvailabilityForm.vue'
  import loadRestaurants from '@/restaurants.js'
  export default {
    name: 'app',
    components: {
      RestaurantTable,
      AvailabilityForm
    },
    data() {
      return {
        restaurants: [],
        restaurantDatabase: [],
        availability: {}
      }
    },
    mounted() {
      this.getCurrentDayTime()
      this.initializeRestaurants()
      this.updateRestaurants()
    },
    methods: {
      initializeRestaurants() {
        this.restaurantDatabase = loadRestaurants()
      },
      updateRestaurants(availability = this.availability) {
        let hour = availability.meridian === "am"
          ? Number(availability.hour)
          : Number(availability.hour) + 12;
        let time = (hour + Number(availability.minute)) * 2;
        this.restaurants = this.restaurantDatabase[availability.day][time]
        // eslint-disable-next-line no-console
        console.log(this.restaurants.length)
      },
      getCurrentDayTime() {
        let now = new Date()
        let day = now.getDay()

        this.availability = {
          day: day === 0 ? 6 : day - 1,
          hour: now.getHours() % 12,
          minute: Math.floor(now.getMinutes()/30)/2,
          meridian: now.getHours() >= 12 ? 'pm' : 'am'
        }
      },
    },
  }
</script>

<style>
  button {
    background: #009435;
    border: 1px solid #009435;
  }

  .small-container {
    max-width: 680px;
  }
</style>