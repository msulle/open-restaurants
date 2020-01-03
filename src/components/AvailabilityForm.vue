<template>
  <div id="availability-form">
    <form @submit.prevent="handleSubmit">
      <h4>Select your availability:</h4>
      <select class="day" v-model="availability.day">
        <option value="0">Monday</option>
        <option value="1">Tuesday</option>
        <option value="2">Wednesday</option>
        <option value="3">Thursday</option>
        <option value="4">Friday</option>
        <option value="5">Saturday</option>
        <option value="6">Sunday</option>
      </select>
      <select class="time" v-model="availability.hour">
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
      <select class="time" v-model="availability.minute">
        <option value="0">00</option>
        <option value="0.5">30</option>
      </select>
      <select class="time meridian" v-model="availability.meridian">
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
    props: ['availability'],
    data() {
      return this.availability
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
    display: inline-block;
  }

  .day {
    width: 8rem;
    margin-right: 1rem;
  }

  .time {
    width: 4rem;
  }

  .meridian {
    margin-right: 1rem;
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