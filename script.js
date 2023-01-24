console.log("Hello World!"); // to check if the javascript is loaded

async function fetchData() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5299ce7ad3msh2f3498de04c618dp193d2ajsncd8958e5a615',
            'X-RapidAPI-Host': 'concerts-artists-events-tracker.p.rapidapi.com'
        }
    };
    const res = await fetch('https://concerts-artists-events-tracker.p.rapidapi.com/venue?name=Berlin%20Concerts&page=1', options);
    if (!res.ok) {
        throw new Error(`Error ${res.status} : ${res.statusText}`);
    }
    const record = await res.json();
    console.log(record);
    if (record.data) {
        let concertList = record.data
            .filter(item => item.name)
            .map(item => `<li>${item.name}</li>`)
            .join('');

        // Get the existing div element
        let popup = document.getElementById("popup");
        
        // Add content to the div element
        let concerts = document.getElementById("concerts");
        concerts.innerHTML = concertList;
        console.log(popup); // to check if the element has been created
        popup.style.display = "block"; // to show the popup
    }
}
fetchData()
  .catch(error => console.error(error));
The changes made:

Instead of creating a new div element with id "popup", we are getting the existing one from the HTML.
Instead of adding the innerHTML to the div element, it is added to the existing ul element with id "concerts" inside the div.
removed the document.body.appendChild(popup); as it is no longer needed.



alagiyawanna.nico@gmail.com
improve the code and add features
Here is an improved version of the code with added features:

Copy code
console.log("Hello World!"); // to check if the javascript is loaded

// Function to fetch concert data
async function fetchConcertData() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5299ce7ad3msh2f3498de04c618dp193d2ajsncd8958e5a615',
            'X-RapidAPI-Host': 'concerts-artists-events-tracker.p.rapidapi.com'
        }
    };
    const res = await fetch('https://concerts-artists-events-tracker.p.rapidapi.com/venue?name=Berlin%20Concerts&page=1', options);
    if (!res.ok) {
        throw new Error(`Error ${res.status} : ${res.statusText}`);
    }
    return await res.json();
}

// Function to display concert data
function displayConcertData(data) {
    let concertList = data.data
        .filter(item => item.name)
        .map(item => `<li>${item.name}</li>`)
        .join('');

    // Get the existing div element
    let popup = document.getElementById("popup");

    // Add content to the div element
    let concerts = document.getElementById("concerts");
    concerts.innerHTML = concertList;
    console.log(popup); // to check if the element has been created
    popup.style.display = "block"; // to show the popup
}

// Function to handle errors
function handleError(error) {
    console.error(error);
    let errorMessage = document.createElement("p");
    errorMessage.innerHTML = "An error occurred while fetching concert data. Please try again later.";
    document.getElementById("popup").appendChild(errorMessage);
}

// Fetch concert data and display it
fetchConcertData()
    .then(data => displayConcertData(data))
    .catch(error => handleError(error));