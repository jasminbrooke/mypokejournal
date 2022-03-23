document.addEventListener("DOMContentLoaded", () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    const dateDisplay = document.getElementById("date")
    const form = document.getElementById("form")
    const userInput = document.getElementById("search")

    const displayDate = () => {
        const today = new Date
        const month = monthNames[today.getMonth()]
        const day = today.getDate()
        dateDisplay.innerText = `${month} ${day}`
    }

    const getPokemon = (pokemon) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}/`)
        .then(res => res.json())
        .then(data => renderPokemon(data))
    }

    const renderPokemon = (data) => {
        const container = document.getElementById("container")
        const card = document.createElement("div")
        card.setAttribute("class", "card")
        const name = document.createElement("h3")
        const types = document.createElement("p")
        const sprite = document.createElement("img")
        name.innerText = data.name.toUpperCase()

        sprite.setAttribute("src", data.sprites.front_default)
        sprite.addEventListener("click", () => {
            if (sprite.src === data.sprites.back_default)
            sprite.setAttribute("src", data.sprites.front_default)
            else 
            sprite.setAttribute("src", data.sprites.back_default)
        })
        types.innerText = data.types[0].type.name
        container.appendChild(card)
        card.appendChild(name)
        card.appendChild(types)
        card.appendChild(sprite)
    }


    form.addEventListener("submit", (e) => {
        e.preventDefault()
        getPokemon(userInput.value)
        form.reset()
    })

    getPokemon("pikachu")    
    displayDate()
})