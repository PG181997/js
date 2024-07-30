const jokeButton = document.querySelector(`.getJoke`);
const jokeHolder = document.querySelector(`.joke p`);
const loader = document.querySelector(`.loader`);

const buttonText = [
    `Ugh.`,
    `omg dad.`,
    `you are the worst.`,
    `seriously.`,
    `stop it.`,
    `please stop.`,
    `that was the worst one`,
    `no comments`
]

async function fetchJoke(){
    loader.classList.remove('hidden')
    jokeButton.classList.add('hidden')
    const response = await fetch('https://icanhazdadjoke.com',{
        headers : {
            Accept : 'application/json',
        }
    })
    const data = await response.json()
    loader.classList.add('hidden') 
    jokeButton.classList.remove('hidden')
    return data
}

async function handleClick(){
    const {joke} = await fetchJoke();
    console.log(joke)
    jokeHolder.textContent = joke
    jokeButton.textContent = randomItemFromArray(buttonText, jokeButton.textContent)
}

function randomItemFromArray(arr, not){
    const item = arr[Math.floor(Math.random() * arr.length)]
    if (item === not){
        console.log('WE USED THAT ONE!!!')
        return randomItemFromArray(arr, not)
    }
    return item
}

jokeButton.addEventListener('click', handleClick)