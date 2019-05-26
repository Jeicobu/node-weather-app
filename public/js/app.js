const weather = (adress) => {
    fetch(`/weather?address=${adress}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return console.log(data.error)
            }

            locationEl.textContent = data.location
            summaryEl.textContent = data.summary
            temperatureEl.textContent = data.temperature
        })
    })
}

const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const locationEl = document.querySelector('.location')
const temperatureEl = document.querySelector('.temperature')
const summaryEl = document.querySelector('.summary')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchValue = input.value
    
    weather(searchValue)
})