<template>
  <div id="app" class="small-container">
    <h1>Available Restaurants</h1>

    <availability-form @update:availability="updateRestaurants" />
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
      }
    },
    mounted() {
      this.initializeRestaurants()
      this.updateRestaurants({day: 0, hour: 0, minute: 0, meridian: 'am'})
    },
    methods: {
      initializeRestaurants() {
        this.restaurantDatabase = loadRestaurants()
        this.restaurants = this.restaurantDatabase
      },
      updateRestaurants(availability) {
        let hour = availability.meridian === "am"
          ? Number(availability.hour)
          : Number(availability.hour) + 12;
        let time = (hour + Number(availability.minute)) * 2;
        this.restaurants = this.restaurantDatabase[availability.day][time]
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