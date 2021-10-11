const prompt = require('prompt-sync')()
const chalk = require('chalk')

const getInput = (callback) => {

    let input = prompt('Please enter your location: ')
    
    // prompt user for input while input is empty
    while (input === '') {

        console.log(chalk.red.inverse('A location is required') + '\n')
        input = prompt('Please enter your location: ')

    }
    
    // Generate URL friendly location for use in API call.
    const location = encodeURIComponent(input)
    
    callback(location)
}

module.exports = {

    getInput: getInput
    
}