// References:
// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
// https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/

// Assign data from data.js to a variable
var tableData = data;

// Select the table in the html
var tableHTML = d3.select('tbody');

// This function takes in data (array of objects) and returns the data as a table on the webpage
function generateTable(data){
    data.forEach(sighting => {

        // Create a row for each object in the array
        let row = tableHTML.append('tr');
        Object.entries(sighting).forEach(([key, value]) => {

            // Create a td in the html for each value in the object
            let cell = row.append('td');

            // Put state and country columns in all uppercase
            if (key === 'state' | key === 'country') {
                value = value.toUpperCase();
            }

            // Capitalize each word in city column
            else if (key === 'city') {
                let words = value.split(' ');
                for (let i = 0; i < words.length; i++) {
                    words[i] = words[i][0].toUpperCase() + words[i].substring(1);
                }
                value = words.join(' ');
            }

            // Add text from array to table
            cell.text(value);
        });
    });
};

// Generate initial table with all data
generateTable(tableData);

// Select the filter button
var filterButton = d3.select('#filter-btn');

// Select the form(s)
var form = d3.select('#form');

// Select the clear filter button
var clearFilterButton = d3.select('#refresh-btn');

// Create event handlers
filterButton.on('click', runEnter);
form.on('submit', runEnter);
clearFilterButton.on('click', clearFilters);

// Function that filters data based on user input
function runEnter() {
    
    // Turn off default functions - prevent page from refreshing
    d3.event.preventDefault();

    // Declare variable for table data
    let filteredData = tableData

    // Filter based on user input related to datetime 
    // Select the datetime value
    let date_input = d3.select('#datetime').property('value');

    // Check for user input
    if (date_input.length > 0) {
        // If there is user input, use it to filter data
        filteredData = tableData.filter(sighting => sighting.datetime === date_input);
    } 

    // Filter based on user input related to city 
    // Select the city value
    let city_input = d3.select('#city').property('value').toLowerCase();

    // Check for user input
    if (city_input.length > 0) {
        // If there user input, use it to filter data
        filteredData = filteredData.filter(sighting => sighting.city === city_input);
    } 
    
    // Filter based on user input related to state 
    // Select the city value
    let state_input = d3.select('#state').property('value').toLowerCase();

    // Check for user input
    if (state_input.length > 0) {
        // If there user input, use it to filter data
        filteredData = filteredData.filter(sighting => sighting.state === state_input);
    }
    
    // Filter based on user input related to country 
    // Select the country selection
    let country_input = d3.select('#inlineFormCustomSelect').property('value');

    // Check for user input
    if (country_input !== 'no-filter' & country_input !== 'Country') {
        // If there user input, use it to filter data
        filteredData = filteredData.filter(sighting => sighting.country === country_input);
    } 

    // Filter based on user input related to shape
    // Select the shape value
    let shape_input = d3.select('#shape').property('value').toLowerCase();

    // Check for user input
    if (shape_input.length > 0) {
        // If there user input, use it to filter data
        filteredData = filteredData.filter(sighting => sighting.shape === shape_input);
    } 

    // Clear table data
    tableHTML.html('');

    // Check if results were returned. 
    if (filteredData.length > 0) {
        // If results were returned, display them in the table.
        generateTable(filteredData);
    }
    // If no results returned, notify user.
    else {
        // Notify user of no search results
        activateToast();
        console.log('no results')
    }
};

// Function that clears filters and returns all data
function clearFilters() {
    generateTable(tableData);
};

// Function that activates toast
function activateToast(){
    let toast_html = `<div aria-live="polite" aria-atomic="true" class="d-flex justify-content-center align-items-center" style="min-height: 100px;">
                <div class="toast" id="no-results" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <h2 class="mr-auto">No results found.</h2>
                </div>
            </div>`;
    d3.select('.toast-spot').html(toast_html);
}