const { loadRestaurants, getAvailableRestaurants } = require('./restaurants');

new Vue({
    el:'#days',
    data: {
        selected: ''
    }
})