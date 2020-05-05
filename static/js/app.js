window.addEventListener('DOMContentLoaded',initializeApp);
const baseUrlEndPoint = `http://coronavirus-tracker-api.herokuapp.com/v2/locations`;
//container for displaying corona details

let coronaDetailsContainer;

//country

let countrySelectDropdown;

//container for rendering the world cases
let coronaWorldDetailsContainer;

const coronaData = {
    latest: {},
    locations:[]
};

//country codes

const countriesWithCountryCodes = {
    "TH": "Thailand",
    "JP": "Japan",
    "SG": "Singapore",
    "NP": "Nepal",
    "MY": "Malaysia",
    "CA": "Canada",
    "AU": "Australia",
    "KH": "Cambodia",
    "LK": "Sri Lanka",
    "DE": "Germany",
    "FI": "Finland",
    "AE": "United Arab Emirates",
    "PH": "Philippines",
    "IN": "India",
    "IT": "Italy",
    "SE": "Sweden",
    "ES": "Spain",
    "BE": "Belgium",
    "EG": "Egypt",
    "LB": "Lebanon",
    "IQ": "Iraq",
    "OM": "Oman",
    "AF": "Afghanistan",
    "BH": "Bahrain",
    "KW": "Kuwait",
    "DZ": "Algeria",
    "HR": "Croatia",
    "CH": "Switzerland",
    "AT": "Austria",
    "IL": "Israel",
    "PK": "Pakistan",
    "BR": "Brazil",
    "GE": "Georgia",
    "GR": "Greece",
    "MK": "North Macedonia",
    "NO": "Norway",
    "RO": "Romania",
    "EE": "Estonia",
    "SM": "San Marino",
    "BY": "Belarus",
    "IS": "Iceland",
    "LT": "Lithuania",
    "MX": "Mexico",
    "NZ": "New Zealand",
    "NG": "Nigeria",
    "IE": "Ireland",
    "LU": "Luxembourg",
    "MC": "Monaco",
    "QA": "Qatar",
    "EC": "Ecuador",
    "AZ": "Azerbaijan",
    "AM": "Armenia",
    "DO": "Dominican Republic",
    "ID": "Indonesia",
    "PT": "Portugal",
    "AD": "Andorra",
    "LV": "Latvia",
    "MA": "Morocco",
    "SA": "Saudi Arabia",
    "SN": "Senegal",
    "AR": "Argentina",
    "CL": "Chile",
    "JO": "Jordan",
    "UA": "Ukraine",
    "HU": "Hungary",
    "LI": "Liechtenstein",
    "PL": "Poland",
    "TN": "Tunisia",
    "BA": "Bosnia and Herzegovina",
    "SI": "Slovenia",
    "ZA": "South Africa",
    "BT": "Bhutan",
    "CM": "Cameroon",
    "CO": "Colombia",
    "CR": "Costa Rica",
    "PE": "Peru",
    "RS": "Serbia",
    "SK": "Slovakia",
    "TG": "Togo",
    "MT": "Malta",
    "MQ": "Martinique",
    "BG": "Bulgaria",
    "MV": "Maldives",
    "BD": "Bangladesh",
    "PY": "Paraguay",
    "AL": "Albania",
    "CY": "Cyprus",
    "BN": "Brunei",
    "US": "US",
    "BF": "Burkina Faso",
    "VA": "Holy See",
    "MN": "Mongolia",
    "PA": "Panama",
    "CN": "China",
    "IR": "Iran",
    "KR": "Korea, South",
    "FR": "France",
    "XX": "Cruise Ship",
    "DK": "Denmark",
    "CZ": "Czechia",
    "TW": "Taiwan*",
    "VN": "Vietnam",
    "RU": "Russia",
    "MD": "Moldova",
    "BO": "Bolivia",
    "HN": "Honduras",
    "GB": "United Kingdom",
    "CD": "Congo (Kinshasa)",
    "CI": "Cote d'Ivoire",
    "JM": "Jamaica",
    "TR": "Turkey",
    "CU": "Cuba",
    "GY": "Guyana",
    "KZ": "Kazakhstan",
    "ET": "Ethiopia",
    "SD": "Sudan",
    "GN": "Guinea",
    "KE": "Kenya",
    "AG": "Antigua and Barbuda",
    "UY": "Uruguay",
    "GH": "Ghana",
    "NA": "Namibia",
    "SC": "Seychelles",
    "TT": "Trinidad and Tobago",
    "VE": "Venezuela",
    "SZ": "Eswatini",
    "GA": "Gabon",
    "GT": "Guatemala",
    "MR": "Mauritania",
    "RW": "Rwanda",
    "LC": "Saint Lucia",
    "VC": "Saint Vincent and the Grenadines",
    "SR": "Suriname",
    "XK": "Kosovo",
    "CF": "Central African Republic",
    "CG": "Congo (Brazzaville)",
    "GQ": "Equatorial Guinea",
    "UZ": "Uzbekistan",
    "NL": "Netherlands",
    "BJ": "Benin",
    "LR": "Liberia",
    "SO": "Somalia",
    "TZ": "Tanzania",
    "BB": "Barbados",
    "ME": "Montenegro",
    "KG": "Kyrgyzstan",
    "MU": "Mauritius",
    "ZM": "Zambia",
    "DJ": "Djibouti",
    "GM": "Gambia, The",
    "BS": "Bahamas, The",
    "TD": "Chad",
    "SV": "El Salvador",
    "FJ": "Fiji",
    "NI": "Nicaragua",
    "MG": "Madagascar",
    "HT": "Haiti",
    "AO": "Angola",
    "CV": "Cape Verde",
    "NE": "Niger",
    "PG": "Papua New Guinea",
    "ZW": "Zimbabwe",
    "TL": "Timor-Leste",
    "ER": "Eritrea",
    "UG": "Uganda",
    "DM": "Dominica",
    "GD": "Grenada",
    "MZ": "Mozambique",
    "SY": "Syria"
};

function populateLocation(country,country_code){
    const countryOption = document.createElement('option');
    countryOption.value = country;
    //console.log(countryOption);
    countryOption.textContent = `${country_code}-${country}`;
    console.log(countryOption);
    countrySelectDropdown.appendChild(countryOption);
}

function populateLocations(){
    Object.entries(countriesWithCountryCodes)
        .forEach(([country_code,country]) => populateLocation(country,country_code));
}
//mapboxgl.accessToken = '';
mapboxgl.accessToken = '';


let geocoder;
function renderMap() {
    mapboxgl.accessToken = '';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [-103.59179687498357, 40.66995747013945],
        zoom: 3
    });

geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
});

map.addControl(geocoder);
//add zoom and rotational controls for the map

map.addControl(new mapboxgl.NavigationControl());


    map.on('load', function () {
        // Add a new source from our GeoJSON data and
        // set the 'cluster' option to true. GL-JS will
        // add the point_count property to your source data.
        map.addSource('places', {
            type: 'geojson',
            // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
            // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
            data: { //convert into a geojson data according to our data
                type : 'FeatureCollection',
                crs:{
                    type: 'name',
                    properties: {
                        name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
                    },
                },
                features: coronaData.locations.map(location => {
                    //Do reverse geocoding

                    return {
                        type: 'Feature',
                        properties: {
                            description: `
                            <table>
                            <thead>
                                <tr>Details: </tr>                         
                            </thead>

                            <tbody>
                            <tr>
                            <td>Confirmed Cases: </td>
                            <td>${location.latest.confirmed}</td>
                            </tr>

                            <tr>
                            <td>Deaths: </td>
                            <td>${location.latest.deaths}</td>
                            </tr>

                            <tr>
                            <td>Latitude: </td>
                            <td>${location.coordinates.latitude}</td>
                            </tr>

                            <tr>
                            <td>Longitude: </td>
                            <td>${location.coordinates.longitude}</td>
                            </tr>
                            </tbody>
                            
                            </table>
                            `,
                            icon: 'rocket'
                        },

                        geometry:{
                            type: "Point",
                            coordinates: [
                                `${location.coordinates.longitude}`,
                                `${location.coordinates.latitude}`
                            ]
                        }
                    };
                })
            },
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });

        map.addLayer({
            id: 'clusters',
            type: 'circle',
            source: 'places',//we defined
            filter: ['has', 'point_count'],
            paint: {
                // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                // with three steps to implement three types of circles:
                //   * Blue, 20px circles when point count is less than 100
                //   * Yellow, 30px circles when point count is between 100 and 750
                //   * Pink, 40px circles when point count is greater than or equal to 750
                'circle-color': [
                    'step',
                    ['get', 'point_count'],
                    '#51bbd6',
                    100,
                    '#f1f075',
                    750,
                    '#f28cb1'
                ],
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    20,
                    100,
                    30,
                    750,
                    40
                ]
            }
        });

        map.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'places',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
            }
        });

        map.addLayer({
            id: 'unclustered-point',
            type: 'circle',
            source: 'places',
            filter: ['!', ['has', 'point_count']],
            paint: {
                'circle-color': '#11b4da',
                'circle-radius': 4,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#fff'
            }
        });

        // inspect a cluster on click
        map.on('click', 'clusters', function (event) {
            const features = map.queryRenderedFeatures(event.point, {
                layers: ['clusters']
            });
            const clusterId = features[0].properties.cluster_id;
            map.getSource('places').getClusterExpansionZoom(
                clusterId,
                function (error, zoom) {
                    if (error) return;

                    map.easeTo({
                        center: features[0].geometry.coordinates,
                        zoom: zoom
                    });
                }
            );
        });

        // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        map.on('click', 'unclustered-point', function (event) {
            const coordinates = event.features[0].geometry.coordinates.slice();
            const {description} = event.features[0].properties;
            

            // Ensure that if the map is zoomed out such that
            // multiple copies of the feature are visible, the
            // popup appears over the copy being pointed to.
            while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description )
                .addTo(map);
        });

        map.on('mouseenter', 'clusters', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'clusters', function () {
            map.getCanvas().style.cursor = '';
        });
    });
    
}


async function initializeApp(){
    console.log('initialize the app');
    setReferences();
    doEventBindings();
    NProgress.start(); //from Nprogress.js
    populateLocations();
    await performAsyncCall();
    renderUI(coronaData.latest, world=true);
    console.log('Corona Data World Details',coronaData.latest);
    console.log(`Corona Prone Locations: ${coronaData.locations}`);
    renderMap();
    NProgress.done();
}

async function performAsyncCall(){
    const response = await fetch(`${baseUrlEndPoint}`);
    const data = await response.json();
    //console.log(data);
    const {latest, locations} = data;
    coronaData.latest = latest;
    coronaData.locations.push(...locations);
}


function renderUI(details, world = false){
    //if world is true render the ui for world else render for country
    let html = '';
    html =`
    <table class="table">
    <thead>
    ${world ? '<h1>World Details</h1>':
    `
   <tr>${details.country} ${details.country_code} 
   </tr>
    `
     }
    
    </thead>
    <tbody>
    <tr>
    <td class="cases">Reported Cases: </td>
    <td>${world ? details.confirmed : details.latest.confirmed}</td>
    </tr>
    <tr>
    <td class="deaths">Deaths: </td> 
    <td>${world ? details.deaths : details.latest.deaths}</td> </tr>
    </tbody>
    </table>
    `;

    if(world){
        coronaWorldDetailsContainer.innerHTML = html;   
    }
    else{
        coronaDetailsContainer.innerHTML = html;
    }
}


function renderDetailsForSelectedLocation(event)
{
    //console.log(event.target.value);
    const countrySelected = event.target.value;
    const locationCoronaDetails = coronaData.locations.reduce((accumulator,currentLocation) => {
        if(currentLocation.country === countrySelected) {

            accumulator['country'] = currentLocation.country;
            accumulator['country_code'] = currentLocation.country_code;
            accumulator.latest.confirmed += currentLocation.latest.confirmed;
            accumulator.latest.deaths += currentLocation.latest.deaths;
        }
    return accumulator;
    },{
        country: '',
        country_code: '',
        latest: {
            confirmed: 0,//object for locations and update property
            deaths: 0 
    }
    });
    //console.log(locationCoronaDetails);
    renderUI(locationCoronaDetails);
}

function setReferences()
{
    coronaDetailsContainer = document.querySelector("#corona-details");
    countrySelectDropdown = document.querySelector('[name="select-country"]');
    coronaWorldDetailsContainer = document.querySelector('#corona-world-details')
}


function doEventBindings()
{
    countrySelectDropdown.addEventListener('change',renderDetailsForSelectedLocation)
}
