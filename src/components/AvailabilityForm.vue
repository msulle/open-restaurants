<template>
  <div id="availability-form">
    <form @submit.prevent="handleSubmit">
      <label>Day</label>
      <select v-model="availability.day">
        <option disabled value="">Select a day</option>
        <option value="0">Monday</option>
        <option value="1">Tuesday</option>
        <option value="2">Wednesday</option>
        <option value="3">Thursday</option>
        <option value="4">Friday</option>
        <option value="5">Saturday</option>
        <option value="6">Sunday</option>
      </select>
      <label>Time</label>
      <select v-model="availability.hour">
        <option disabled value="">Hour</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
        <option>11</option>
        <option>12</option>
      </select>
      <select v-model="availability.minute">
        <option value=".0">00</option>
        <option value=".0">15</option>
        <option value=".5">30</option>
        <option value=".5">45</option>
      </select>
      <select v-model="availability.meridian">
        <option>am</option>
        <option>pm</option>
      </select>
      <button>Find available restaurants!</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'availability-form',
    data() {
      return {
        availability: {
          day: '',
          hour: '',
          minute: '',
          meridian: '',
        },
      }
    },
    methods: {
      handleSubmit() {
        this.$emit('update:availability', this.availability)
      },
    },
  }
</script>

<style scoped>
  form {
    margin-bottom: 2rem;
  }

  select {
    width: 33%;
    display: inline-block;
  }

  [class*='-message'] {
    font-weight: 500;
  }

  .error-message {
    color: #d33c40;
  }

  .success-message {
    color: #32a95d;
  }
</style>