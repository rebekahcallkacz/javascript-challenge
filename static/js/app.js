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
clearFilterButton.on('click', clearFilters)

// Function that filters data based on user input
function runEnter() {
    
    // Turn off default functions - prevent page from refreshing
    d3.event.preventDefault();

    // Select the datetime form
    let datetimeElement = d3.select('#datetime');

    // Select the user input from the datetime form
    let date = datetimeElement.property('value');
    let filteredData = tableData.filter(sighting => sighting.datetime === date);

    // Clear table data
    tableHTML.html('');

    // Generate new table with filtered data
    generateTable(filteredData);
};

// Function that clears filters and returns all data
function clearFilters() {
    generateTable(tableData);
};