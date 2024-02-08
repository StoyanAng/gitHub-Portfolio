const months = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];

var date = new Date();
date = months[date.getMonth()] + ` ${date.getDay()}`

class Workout {
    constructor(position, distance, duration){
        this.position = position,
        this.distance = distance,
        this.duration = duration,
        this.speed = distance / (duration / 60);
        this.date = date;
    }

    setMarker(mapTarget){
        const marker = L.marker([this.position.lat, this.position.lng])
        .addTo(mapTarget)
        .bindPopup(`<b>Running</b><br>${date}.`)
        .openPopup()
        .on(`click`, () => {
            mapTarget.setView(marker.getLatLng(), 16);
        });

        return marker;
    }
}

class RunningWorkout extends Workout {
    constructor(position, distance, duration, cadence, id){
        super(position, distance, duration),
        this.cadance = cadence;
        this.type = `running`;
        this.id = id;
    }
}

class CyclingWorkout extends Workout {
    constructor(position, distance, duration, elevetion, id){
        super(position, distance, duration),
        this.elevetion = elevetion;
        this.type = `cycling`;
        this.id = id;
    }
}

export { RunningWorkout, CyclingWorkout };