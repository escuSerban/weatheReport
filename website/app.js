/* Global Variables */

// Endpoint URL for Current Weather Data
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Personal API Key for OpenWeatherMap API
const apiKey = 'your_api_here';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + ' / ' + d.getDate() + ' / ' + d.getFullYear();

/* Function to GET Web API Data*/
const getApiData = async(url = '') => {

    const response = await fetch(url);

    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("There has been an error", error);
    }
};

/* Function to POST data */
const postReport = async(url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

/* Function to GET Project Data */
const displayReport = async(url = '') => {

    const request = await fetch(url);

    try {
        const report = await request.json();
        // Path for weather icon
        const icon = `http://openweathermap.org/img/wn/${report.icon}.png`;

        document.getElementById('location').innerHTML = `<b>Location</b><br>${report.location}`;
        document.getElementById('date').innerHTML = `<b>Date</b><br>${report.date}`;
        document.getElementById('temp').innerHTML = `<b>Temperature</b><br><img src='${icon}'/><br>${report.temp}°C`;
        document.getElementById('content').innerHTML = `<b>Positive thoughts</b><br>${report.content}`;
    } catch (error) {
        console.log('error', error);
    }
};

/* Function called by event listener */
function getWeather(evt) {
    evt.preventDefault();

    // Zipcode 
    const zipcode = document.getElementById('zip').value;
    // Country Code
    const countryCode = document.getElementById('code').value;

    if (zipcode.trim() != "" && countryCode.trim() != "") {

        getApiData(`${baseURL}${zipcode},${countryCode}&units=metric&appid=${apiKey}`)
            // Send data to server's endpoint
            .then(function(data) {
                const place = data.name;
                const wIcon = data.weather[0].icon;
                const temp = parseInt(data.main.temp);
                const comments = document.getElementById('feelings').value;
                postReport('/addReport', { location: place, date: newDate, temp: temp, icon: wIcon, content: comments });
            })
            // Retrieve data from the endpoint
            .then(() => {
                document.querySelector('.title').innerHTML = '';
                displayReport('/lastReport');
            });
    } else if (zipcode.trim() == "" || countryCode.trim() == "") {

        document.querySelector('.title').innerHTML = `There's been an error!<br><br>Please make sure you've entered the right values for zipcode and country code!`;
    }
}

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', getWeather);