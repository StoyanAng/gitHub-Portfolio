// TEST OpenSourseMapty
import { RunningWorkout, CyclingWorkout } from "./modules/ClassesWorkout.js";
import addRuningWorkout from "./modules/RunningWorkout.js";
import addCyclingWorkout from "./modules/CyclingWorkout.js";

// Input elements
var markers = {};                       
const cadanceDiv = document.querySelector(".cadence__block");
const elevationDiv = document.querySelector(".elevation__block");
const select = document.querySelector(`select`);

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
        //localStorage.clear();

        // Render Leaflet map 
        var position = await getGeolocation();
        const { latitude: lat, longitude: lon } = position.coords;

        var map = L.map('map').setView([lat, lon], 16);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        mapTarget = map;

        //Load saved workouts
        renderWorkouts();
        
        // Select OnChange event
        select.addEventListener("change", function () {
            cadanceDiv.classList.toggle("form__row--hidden");
            elevationDiv.classList.toggle("form__row--hidden");
        });

        map.on(`click`, function (e) {
            // Get event
            mapEvent = e;

            // Render the form
            const form = document.querySelector(`form`);
            form.classList.remove(`hidden`);
        });
    } catch (err) {
        console.error(err);
        alert(`Failed to ${err.massage}`)
    }
});

document.querySelector(`form`).addEventListener(`submit`, function (e) {
    e.preventDefault();
    e.target.classList.add(`hidden`);

    const workoutData = document.querySelectorAll(`input`);
    let option = document.querySelector(`select`);
    const id = Math.floor(Math.random() * 100);
    let workout;

    //Add workout 
    if (option.value == "running") {
        workout = new RunningWorkout(mapEvent.latlng, workoutData[0].value, workoutData[1].value, workoutData[2].value, id);
        addRuningWorkout(workout);
    }
    else {
        workout = new CyclingWorkout(mapEvent.latlng, workoutData[0].value, workoutData[1].value, workoutData[3].value, id);
        addCyclingWorkout(workout);
    }

    // Add workout to localStorage
    const marker = workout.setMarker(mapTarget);
    markers[workout.id] = marker;
    localStorage.setItem(id, JSON.stringify(workout));

    document.getElementById(`${workout.id}-btn`).addEventListener(`click`, deleteWorkout);

    // Clear input of form
    for (let input of workoutData) {
        input.value = ``;
    }
});

function renderWorkouts() {
    const locStg = localStorage;
    console.log(locStg);

    for (let i = 0; i < locStg.length; i++) {
        var workout = JSON.parse(locStg.getItem([locStg.key(i)]));

        if (workout.type == `running`) {
            workout = Object.assign(new RunningWorkout(), workout);
            addRuningWorkout(workout);
        }
        else {
            workout = Object.assign(new CyclingWorkout(), workout);
            addCyclingWorkout(workout);
        }

        const marker = workout.setMarker(mapTarget);
        markers[workout.id] = marker;
        document.getElementById(`${workout.id}-btn`).addEventListener(`click`, deleteWorkout);
    }
}

function deleteWorkout(e) {
    const li = e.target.closest(`li`);
    const marker = markers[li.id];


    // First remove from local storage
    localStorage.removeItem(li.id);

    // Remove marker from the map and from markers object
    mapTarget.removeLayer(marker);
    delete markers[li.id];

    // Finally remove it from ul element
    document.querySelector(`ul`).removeChild(li);
}