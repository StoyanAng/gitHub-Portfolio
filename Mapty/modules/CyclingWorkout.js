// Export Module cycling workout

const id = Math.floor(Math.random() * 100);

export default function addCyclingWorkout(inputArr, date){
    const speed = inputArr[0].value / (inputArr[1].value / 60);

    const html = `<li class="workout workout--cycling" id="${id}">
        <h2 class="workout__title">Cycling on ${date}</h2>
        <div class="workout__details">
            <span class="workout__icon">🚴‍♀️</span>
            <span class="workout__value">${inputArr[0].value}</span>
            <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${inputArr[1].value}</span>
            <span class="workout__unit">min</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${inputArr[3].value}</span>
            <span class="workout__unit">m</span>
        </div>
  </li>`

  localStorage.setItem(id, html);
  document.querySelector(`ul`).innerHTML += html;
}