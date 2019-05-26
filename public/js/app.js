console.log('it works')

const weather = (adress) => {
    fetch(`/weather?address=${adress}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return console.log(data.error)
            }

            console.log(data)
        })
    })
}

const weatherForm = document.querySelector('form')
const input = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchValue = input.value
    
    weather(searchValue)
})