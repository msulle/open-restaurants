const restaurantsJSON = require('./rest_hours.json');

const getRestaurants = () => {
    return restaurantsJSON;
};

window.addEventListener('click', event => {
    const list = document.getElementById("restaurantSpot");
    const restaurants = document.createTextNode(getRestaurants());    
    list.appendChild(restaurants);
});