const mapId = "map";                                       //* Id index del mapa
const initialCoordinates = [40.4169473, -3.7057172];       //* Cordenadas iniciales (Plaza Sol en Madrid [lat, lng])
const map = L.map(mapId).setView(initialCoordinates, 11);   //* const Map = (Nos inserta el mapa en el div "map").(Centrada en la cordenada inicial, Zoom = 10)



var planetShip = L.icon({
    iconUrl: 'https://i.ibb.co/dPLfzS7/Pepelu-PNG.png',
    

    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [30, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});






const MAPBOX_API =
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";
// Este token será el que obtengamos en la web de Mapbox
const ACCESS_TOKEN =
    "pk.eyJ1IjoiY2Nhc3RpbGxvMDZtYiIsImEiOiJja2k1eXpybXU3em1mMnRsNjNqajJ0YW12In0.aFQJlFDBDQeUpLHT4EiRYg";
L.tileLayer(MAPBOX_API, {
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: ACCESS_TOKEN,
}).addTo(map);

function searchPackage() {
    let paquete = document.getElementById('tracking').value;
    console.log(paquete)
    if (paquete == '62b31426ad7011e16d9fb274') {
        document.getElementById('paqueteErroneo').innerText=''
        fetch("./coordenadas1.json")
            .then((res) => res.json())
            .then((res) => {
                console.log(res)

                var packageCoordinates1 = [res[0].latitud, res[0].longitud];
                var packageCoordinates2 = [res[1].latitud, res[1].longitud];
                var packageCoordinates3 = [res[2].latitud, res[2].longitud];
                var packageCoordinates4 = [res[3].latitud, res[3].longitud];

                var marker1;
                var marker2;
                var marker3;
                var marker4;
                marker1 = L.marker(packageCoordinates1,{icon: planetShip}).bindPopup(`latitud :${res[0].latitud} longitud : ${res[0].longitud}`).addTo(map);
                setTimeout(() => {
                    map.removeLayer(marker1)
                }, 5000);

                // L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);
                setTimeout(() => {
                    marker2 = L.marker(packageCoordinates2,{icon: planetShip}).bindPopup(`latitud :${res[1].latitud} longitud : ${res[1].longitud}`).addTo(map);
                }, 10000);

                setTimeout(() => {
                    map.removeLayer(marker2)
                }, 15000);

                setTimeout(() => {
                    marker3 = L.marker(packageCoordinates3,{icon: planetShip}).bindPopup(`latitud :${res[2].latitud} longitud : ${res[2].longitud}`).addTo(map);
                }, 20000);

                setTimeout(() => {
                    map.removeLayer(marker3)
                }, 25000);

                setTimeout(() => {
                    marker4 = L.marker(packageCoordinates4,{icon: planetShip}).bindPopup(`latitud :${res[3].latitud} longitud : ${res[3].longitud}`).addTo(map);
                }, 30000);
            });

    } else if (paquete == '62b320b93939fd6b69467ae1') {
        document.getElementById('paqueteErroneo').innerText=''
        fetch("./coordenadas2.json")
            .then((res) => res.json())
            .then((res) => {
                console.log(res)

                var packageCoordinates1 = [res[0].latitud, res[0].longitud];
                var packageCoordinates2 = [res[1].latitud, res[1].longitud];
                var packageCoordinates3 = [res[2].latitud, res[2].longitud];
                var packageCoordinates4 = [res[3].latitud, res[3].longitud];

                var marker1;
                var marker2;
                var marker3;
                var marker4;
                marker1 = L.marker(packageCoordinates1,{icon: planetShip}).bindPopup(`latitud :${res[0].latitud} longitud : ${res[0].longitud}`).addTo(map);
                setTimeout(() => {
                    map.removeLayer(marker1)
                }, 5000);

                setTimeout(() => {
                    marker2 = L.marker(packageCoordinates2,{icon: planetShip}).bindPopup(`latitud :${res[1].latitud} longitud : ${res[1].longitud}`).addTo(map);
                }, 10000);

                setTimeout(() => {
                    map.removeLayer(marker2)
                }, 15000);

                setTimeout(() => {
                    marker3 = L.marker(packageCoordinates3,{icon: planetShip}).bindPopup(`latitud :${res[2].latitud} longitud : ${res[2].longitud}`).addTo(map);
                }, 20000);

                setTimeout(() => {
                    map.removeLayer(marker3)
                }, 25000);

                setTimeout(() => {
                    marker4 = L.marker(packageCoordinates4,{icon: planetShip}).bindPopup(`latitud :${res[3].latitud} longitud : ${res[3].longitud}`).addTo(map);
                }, 30000);
            });

    } else if(paquete == '62b320de3939fd6b69467ae2'){
        document.getElementById('paqueteErroneo').innerText=''
        fetch("./coordenadas3.json")
            .then((res) => res.json())
            .then((res) => {
                console.log(res)

                var packageCoordinates1 = [res[0].latitud, res[0].longitud];
                var packageCoordinates2 = [res[1].latitud, res[1].longitud];
                var packageCoordinates3 = [res[2].latitud, res[2].longitud];
                var packageCoordinates4 = [res[3].latitud, res[3].longitud];

                var marker1;
                var marker2;
                var marker3;
                var marker4;
                marker1 = L.marker(packageCoordinates1,{icon: planetShip}).bindPopup(`latitud :${res[0].latitud} longitud : ${res[0].longitud}`).addTo(map);
                setTimeout(() => {
                    map.removeLayer(marker1)
                }, 5000);

                setTimeout(() => {
                    marker2 = L.marker(packageCoordinates2,{icon: planetShip}).bindPopup(`latitud :${res[1].latitud} longitud : ${res[1].longitud}`).addTo(map);
                }, 10000);

                setTimeout(() => {
                    map.removeLayer(marker2)
                }, 15000);

                setTimeout(() => {
                    marker3 = L.marker(packageCoordinates3,{icon: planetShip}).bindPopup(`latitud :${res[2].latitud} longitud : ${res[2].longitud}`).addTo(map);
                }, 20000);

                setTimeout(() => {
                    map.removeLayer(marker3)
                }, 25000);

                setTimeout(() => {
                    marker4 = L.marker(packageCoordinates4,{icon: planetShip}).bindPopup(`latitud :${res[3].latitud} longitud : ${res[3].longitud}`).addTo(map);
                }, 30000);
            });

    } else {
        document.getElementById('paqueteErroneo').innerText='Este identificador no coincide con ningún paquete'
    }


};


