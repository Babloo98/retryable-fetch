retry-fetch is a simple Node.js utility that performs a fetch request with an exponential backoff retry mechanism. This module is useful when you want to ensure your fetch requests are resilient to transient errors such as network issues or temporary server unavailability.

Installation
To install retry-fetch, you need to have Node.js and npm installed. Then, run the following 

npm install retry-fetch


const retryFetch = require('retry-fetch');

const url = 'https://api.example.com/data';
const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
};

retryFetch(url, options, 3, 1000)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Fetch error:', error));


API
retryFetch(url, options = {}, retries = 3, delay = 1000)
Performs a fetch request with an exponential backoff retry mechanism.

Parameters
url string - The URL to fetch.
options object (optional) - The options for the fetch request. This is passed directly to fetch.
retries number (optional, default: 3) - The number of times to retry the fetch request before failing.
delay number (optional, default: 1000) - The initial delay in milliseconds before the first retry. The delay will double with each retry.
Returns
Promise<Response> - The fetch response.

Example : 
const retryFetch = require('retry-fetch');

const url = 'https://api.example.com/data';

retryFetch(url, {}, 5, 500)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Fetch error:', error));
