import 'babel-polyfill';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {validateIp, addTileLayer, getAdress} from './helpers';
import icon from 'leaflet/dist/images/marker-icon.png';

const inputIp = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
inputIp.addEventListener('keydown', handleKey);

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
});
const mapArea = document.querySelector('#map');
const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13
});
addTileLayer(map);
L.marker([51.505, -0.09], {
    icon: markerIcon
}).addTo(map);


function getData() {
    if (validateIp(inputIp.value)) {
        getAdress(inputIp.value)
        .then(setInfo)
    }
}

function handleKey(e) {
    if (e.key == 'Enter') {
        getData();
    }
}

function setInfo(data){
    const {lat, lng, country, region, timezone} = data.location;
    ipInfo.innerText = data.ip;
    locationInfo.innerText = country + ' ' + region;
    timezoneInfo.innerText = timezone;
    ispInfo.innerText = data.isp;

    map.setView([lat, lng]);
    L.marker([lat, lng], {
        icon: markerIcon
    }).addTo(map);
}