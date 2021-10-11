const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherIcon = document.querySelector('#weather-icon')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading weather for ' + location

    fetch(`/weather?location="${location}"`).then((response) => {
    response.json().then((data) => {
        console.log(data)
        if (data.error) {
            messageOne.textContent = data.statusCode + ' ' + data.error
            messageTwo.textContent = ''
            weatherIcon.style.display = "none"
        } else {
            messageOne.textContent = data.location
            weatherIcon.src = data.weatherIcon
            weatherIcon.style.display = "block"
            messageTwo.textContent = data.forecast
        }
    })
})

    console.log(location)
})