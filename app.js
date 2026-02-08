// Import required modules
const fs = require('fs');
const chalk = require('chalk');

/**
 * Synchronously reads the content of 'declaration.txt'.
 * @returns {string} The content of the file.
 */
function readFileContent() {
    let content = fs.readFileSync('declaration.txt', 'utf8');
    return content;
}

/**
 * Gets the word count from the content.
 * @param {string} content The file content.
 * @returns {Object} An object with words as keys and their occurrences as values.
 */
function getWordCounts(content) {
    // Split by non-word characters and filter out empty strings
    const wordCount = {};
    const words = content.split(/\W+/).filter(Boolean);

    // Loop through each word and count it
    for (let i = 0; i < words.length; i++) {
        let word = words[i].toLowerCase();
        if (wordCount[word]) {
            wordCount[word] = wordCount[word] + 1;
        } else {
            wordCount[word] = 1;
        }
    }

    return wordCount;
}

/**
 * Colors a word based on its frequency.
 * @param {string} word The word to be colored.
 * @param {number} count The frequency of the word.
 * @returns {string} The colored word.
 */
function colorWord(word, count) {
    // Words that occur once are blue
    // Words that occur between 2 and 5 times are green
    // Words that occur more than 5 times are red
    if (count === 1) {
        return chalk.blue(word);
    } else if (count >= 2 && count <= 5) {
        return chalk.green(word);
    } else {
        return chalk.red(word);
    }
}

/**
 * Prints the first 15 lines of the content with colored words.
 * @param {string} content The file content.
 * @param {Object} wordCount The word occurrences.
 */
function printColoredLines(content, wordCount) {
    const lines = content.split('\n').slice(0, 15);

    for (const line of lines) {
        const coloredLine = line.split(/\W+/).map(word => {
            // Look up the word count and color it
            let count = wordCount[word.toLowerCase()] || 0;
            return colorWord(word, count);
        }).join(' ');

        console.log(coloredLine);
    }
}

/**
 * Main function to read the file, count the word occurrences and print the colored lines.
 */
function processFile() {
    const content = readFileContent();
    const wordCount = getWordCounts(content);
    printColoredLines(content, wordCount);
}

if (require.main === module) {
    // This will execute only if the file is run directly.
    processFile();
}

// Export the functions for testing
module.exports = { readFileContent, getWordCounts, colorWord, printColoredLines };
