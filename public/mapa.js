
const mapId = "map";                                       //* Id index del mapa
const initialCoordinates = [40.4169473, -3.7057172];       //* Cordenadas iniciales (Plaza Sol en Madrid [lat, lng])
const map = L.map(mapId).setView(initialCoordinates, 11);   //* const Map = (Nos inserta el mapa en el div "map").(Centrada en la cordenada inicial, Zoom = 10)










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
    let package = document.getElementById("tracking").value;
    
    fetch("./coordenadas.json")
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            // let coordenatesPackage = res.filter((packages) => packages.id == package);
            
            // //* Para gestionar un gran cambio del json.
            // let cleanLat = coordenatesPackage[0].latitud;
            // let cleanLon = coordenatesPackage[0].longitud;
            var packageCoordinates1=[res[0].latitud,res[0].longitud];
            var packageCoordinates2=[res[1].latitud,res[1].longitud];
            var packageCoordinates3=[res[2].latitud,res[2].longitud];
            var packageCoordinates4=[res[3].latitud,res[3].longitud];
            // for(let i=0;i<res.length;i++){
            //     let nombre= `packageCoordinates${i+1}`
            //     // console.log(nombre)
            //     nombre.push(res[i].latitud)
            //     nombre.push(res[i].longitud)
            // }
            // console.log(packageCoordinates1)
            // const packageCoordinates1 = [cleanL, cleanLon];
            // const packageCoordinates2 = [40.38287369925026, -3.707155836682476];
            // console.log(plazaMayorCoordinates)
            // //* Añadir marcador de la ciudad solicitada en el div.
            var marker1;
            var marker2;
            var marker3;
            var marker4;
            marker1=L.marker(packageCoordinates1).bindPopup(`latitud :${res[0].latitud} longitud : ${res[0].longitud}`).addTo(map);
            setTimeout(() => {
                map.removeLayer(marker1)
            }, 5000);

            setTimeout(() => {
                marker2=L.marker(packageCoordinates2).bindPopup(`latitud :${res[1].latitud} longitud : ${res[1].longitud}`).addTo(map);
            }, 10000);

            setTimeout(() => {
                map.removeLayer(marker2)
            }, 15000);

            setTimeout(() => {
                marker3=L.marker(packageCoordinates3).bindPopup(`latitud :${res[2].latitud} longitud : ${res[2].longitud}`).addTo(map);
            }, 20000);

            setTimeout(() => {
                map.removeLayer(marker3)
            }, 25000);

            setTimeout(() => {
                marker4=L.marker(packageCoordinates4).bindPopup(`latitud :${res[3].latitud} longitud : ${res[3].longitud}`).addTo(map);
            }, 30000);

            // setTimeout(() => {
            //     map.removeLayer(marker4)
            // }, 35000);




            
        });
};

