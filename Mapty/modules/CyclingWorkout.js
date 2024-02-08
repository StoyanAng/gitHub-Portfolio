// Export Module cycling workout
export default function addCyclingWorkout(obj) {
    let li = document.createElement(`li`);

    li.classList.add(`workout`);
    li.classList.add(`workout--cycling`);
    li.setAttribute(`id`, `${obj.id}`);
    li.innerHTML = `
        <button class="glow-on-hover" id="${obj.id}-btn">Delete</button>
        <h2 class="workout__title">Cycling</h2>
        <div class="workout__details">
            <span class="workout__icon">🚴‍♀️</span>
            <span class="workout__value">${obj.distance}</span>
            <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${obj.duration}</span>
            <span class="workout__unit">min</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${obj.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${obj.elevetion}</span>
            <span class="workout__unit">m</span>
        </div>
    `

    document.querySelector(`ul`).appendChild(li);
}


/*     const html = `<li class="workout workout--cycling" id="${obj.id}">
        <button class="glow-on-hover" id="${obj.id}-btn">Delete</button>
        <h2 class="workout__title">Cycling</h2>
        <div class="workout__details">
            <span class="workout__icon">🚴‍♀️</span>
            <span class="workout__value">${obj.distance}</span>
            <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${obj.duration}</span>
            <span class="workout__unit">min</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${obj.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${obj.elevetion}</span>
            <span class="workout__unit">m</span>
        </div>
    </li>`
    
    document.querySelector(`ul`).innerHTML += html; */