const { loadRestaurants, getAvailableRestaurants } = require('./restaurants');

window.onload = loadRestaurants();

window.addEventListener('click', event => {
    const list = document.getElementById("restaurantSpot");
    const restaurants = document.createTextNode(getAvailableRestaurants(0,0));    
    list.appendChild(restaurants);
});
