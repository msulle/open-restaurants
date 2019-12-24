<template>
  <div id="restaurant-table">
    <p v-if="restaurants.length < 1" class="empty-table" />
    <table v-else>
      <thead>
        <tr>
          <th>Restaurant Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="restaurant in restaurants" :key="restaurant">
          <td>{{ restaurant }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'restaurant-table',
    props: {
      restaurants: Array,
    },
  }
</script>

<style scoped>
  button {
    margin: 0 0.5rem 0 0;
  }
</style>