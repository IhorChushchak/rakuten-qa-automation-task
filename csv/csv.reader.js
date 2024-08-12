/*
* Before running this file it is needed to be installed:
* - npm init -y
* - npm install csv-parser
*/

// Import the 'fs' module, which provides an API for interacting with the file system.
const fs = require('fs');

// Import the 'path' module, which provides utilities for working with file and directory paths.
const path = require('path');

// Import the 'csv-parser' module, which is a lightweight and fast CSV parser for Node.js.
const csv = require('csv-parser');

// Read CSV file and process data
function readCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}

// Normalize the breed names by removing whitespaces and making them lowercase
function normalizeBreed(breed) {
    return breed.trim().toLowerCase();
}

// Get a list of unique breeds
function getUniqueBreeds(data) {
    const breedsSet = new Set();
    data.forEach(row => {
        const normalizedBreed = normalizeBreed(row.Breed);
        breedsSet.add(normalizedBreed);
    });
    return Array.from(breedsSet);
}

// Get number of licenses by LicenseType for each unique breed
function getLicenseCountsByBreed(data) {
    const breedLicenseCounts = {};

    // Aggregate license counts by breed
    data.forEach(row => {
        // Normalize and capitalize breed names for readability
        const breed = row.Breed.trim().toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        // Initialize breed entry if not present
        if (!breedLicenseCounts[breed]) {
            breedLicenseCounts[breed] = 0;
        }

        // Increment the license count for the breed
        breedLicenseCounts[breed]++;
    });

    // Format the output to be more readable
    const readableOutput = [];

    for (const breed in breedLicenseCounts) {
        const count = breedLicenseCounts[breed];
        // Ensure count is a number and formatted correctly
        readableOutput.push(`${breed} - ${count} licenses`);
    }

    return readableOutput;
}

// Find the top 5 popular dog names along with their counts
function getTopDogNames(data) {
    const nameCounts = {};

    data.forEach(row => {
        const dogName = row.DogName.trim().toLowerCase();

        if (!nameCounts[dogName]) {
            nameCounts[dogName] = 0;
        }

        nameCounts[dogName]++;
    });

    // Convert the object to an array and sort by count in descending order
    const sortedNames = Object.entries(nameCounts).sort((a, b) => b[1] - a[1]);

    // Get the top 5 dog names
    const topNames = sortedNames.slice(0, 5).map(([name, count]) => ({ name, count }));

    return topNames;
}

// Filter licenses issued within a given date range
function filterLicensesByDateRange(data, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return data.filter(row => {
        const validDate = new Date(row.ValidDate);
        return validDate >= start && validDate <= end;
    });
}

// Main execution function
async function main() {
    const filePath = path.join(__dirname, '2017.csv');

    try {
        const data = await readCSV(filePath);

        const uniqueBreeds = getUniqueBreeds(data);
        console.log('Unique Breeds:', uniqueBreeds);

        const licenseCountsByBreed = getLicenseCountsByBreed(data);
        console.log('License Counts by Breed:', licenseCountsByBreed);

        const topDogNames = getTopDogNames(data);
        console.log('Top 5 Dog Names:');
        topDogNames.forEach((item, index) => {
            console.log(`${index + 1}. ${item.name.charAt(0).toUpperCase() + item.name.slice(1)} - ${item.count} dogs`);
        });

        const licensesInRange = filterLicensesByDateRange(data, '2017-01-01', '2017-12-31');
        console.log('Licenses in Date Range:', licensesInRange.length);
    } catch (error) {
        console.error('Error reading CSV:', error);
    }
}

main();
