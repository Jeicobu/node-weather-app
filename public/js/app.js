const weather = (adress) => {
    fetch(`/weather?address=${adress}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return console.log(data.error)
            }

            locationEl.textContent = data.location
            temperatureEl.textContent = data.temperature

            console.log(data)
        })
    })
}

const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const locationEl = document.querySelector('.location')
const temperatureEl = document.querySelector('.temperature')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchValue = input.value
    
    weather(searchValue)
})