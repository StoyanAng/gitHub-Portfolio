// TEST OpenSourseMapty
import RunningWorkout from "./modules/RunningWorkout.js";
import CyclingWorkout from "./modules/CyclingWorkout.js";

// Get current day
const months = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];

var date = new Date();
date = months[date.getMonth()] + ` ${date.getDay()}`

// Global variables
let mapEvent, mapTarget;

// Geolocation
const getGeolocation = function () {
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject));
};

// DOMContent on load functionality

document.addEventListener(`DOMContentLoaded`, async onLoad => {
    try {
        var position = await getGeolocation();
        const { latitude: lat, longitude: lon } = position.coords;

        var map = L.map('map').setView([lat, lon], 16);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        //Load saved workouts
        loadLocalWorkouts();

        mapTarget = map;
        map.on(`click`, renderForm);
    } catch (err) {
        console.error(err);
        alert(`Failed to ${err.massage}`)
    } 
});

function renderForm(e) {
    // Add change event to select
    const inputCadance = document.querySelector(".change__row");
    const inputElevation = document.querySelectorAll(".change__row")[1];

    document.querySelector(`select`).addEventListener(`change`, function () {
        inputCadance.classList.toggle("form__row--hidden");
        inputElevation.classList.toggle("form__row--hidden");
    });


    // Get event
    mapEvent = e;

    // Render the form
    const form = document.querySelector(`form`);
    form.classList.remove(`hidden`)

    // Add submit event to form
    form.addEventListener(`submit`, sumbitWorkout);
}

function setMarker(date) {
    const position = mapEvent.latlng;
    var marker = L.marker([position.lat, position.lng])
        .addTo(mapTarget)
        .bindPopup(`<b>Running</b><br>${date}.`)
        .openPopup()
        .on(`click`, clickZoom);
}

function sumbitWorkout(e) {
    e.preventDefault();
    e.target.classList.add(`hidden`);
    const workoutData = document.querySelectorAll(`input`);
    let option = document.querySelector(`select`);

    //Add workout 
    if (option.value == "running") {
        RunningWorkout(workoutData, date);
    }
    else {
        CyclingWorkout(workoutData, date);
    }

    // SetworkoutMarker
    setMarker(date);

    // Clear form 
    for (let input of workoutData) {
        input.value = ``;
    }
}

function clickZoom(e) {
    mapTarget.setView(e.target.getLatLng(), 16);
}

function loadLocalWorkouts(){    
    const workouts = localStorage;
    console.log(workouts);

    for(let i = 0; i < workouts.length; i++){
        const workout = workouts[workouts.key(i)];
        const id = workouts.key(i);
        document.querySelector(`ul`).innerHTML += workout;
        document.getElementById(`${id}`).addEventListener(`click`, deleteWorkout);
    }

}

function deleteWorkout(e){
    console.log(e.target);
}