// References:
// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript

// Assign data from data.js to a variable
var tableData = data;

// Select the table in the html
var tableHTML = d3.select('tbody');

// Append each object in the array to a row of its own in the html table
tableData.forEach(sighting => {

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

