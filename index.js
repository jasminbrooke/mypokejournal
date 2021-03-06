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
        .catch(_error => alert("No Such Pokémon! \nTry one of these:\nBulbasaur, Charmander, Squirtle "))
    }

    const renderPokemon = (data) => {
        const container = document.getElementById("container")
        const card = document.createElement("div")
        card.setAttribute("class", "card")
        card.setAttribute("id", data.name)
        const name = document.createElement("h3")
        const types = document.createElement("p")
        const sprite = document.createElement("img")
        name.innerText = data.name.toUpperCase()
        const deleteBtn = document.createElement("button")
        deleteBtn.setAttribute("class", "deleteBtn")
        deleteBtn.innerText = "X"
        const counter = document.createElement("button")
        counter.setAttribute("class", "counter")
        counter.innerText = "1"
        counter.setAttribute("title", "How many did you see?")


        sprite.setAttribute("src", data.sprites.front_default)
        sprite.addEventListener("click", () => {
            if (sprite.src === data.sprites.back_default)
                sprite.setAttribute("src", data.sprites.front_default)
            else 
                sprite.setAttribute("src", data.sprites.back_default)
        })

        types.innerText = `type: ${data.types[0].type.name}`
        container.appendChild(card)
        card.appendChild(name)
        card.appendChild(types)
        card.appendChild(sprite)
        card.appendChild(deleteBtn)
        card.appendChild(counter)

        const notes = document.createElement("form")
        card.appendChild(notes)
        notes.setAttribute("action", "#")
        notes.setAttribute("id", "notes")
        const textField = document.createElement("input")
        textField.setAttribute("type", "text")
        textField.setAttribute("placeholder", "Add field notes...")
        const button = document.createElement("input")
        button.setAttribute("type", "submit")
        button.setAttribute("value", "Add")
        
        
        notes.appendChild(textField)
        notes.appendChild(button)
        const ul = document.createElement("ul")
        card.appendChild(ul)

        notes.addEventListener("submit", (e) => {
            e.preventDefault()
            const li = document.createElement("li")
            li.innerText = textField.value
            ul.appendChild(li)
            notes.reset()

            const removeNoteBtn = document.createElement("button")
            removeNoteBtn.setAttribute("class","remove")
            removeNoteBtn.innerText = "X"
            li.appendChild(removeNoteBtn)

            removeNoteBtn.addEventListener("click", () => {
                ul.removeChild(li)
            })
        })

        deleteBtn.addEventListener("click", () => {
            container.removeChild(card)
            bCountUpdate()
        })

        counter.addEventListener("click", () => {
            counter.innerText = parseInt(counter.innerText) +1
        })
        
        
        const bCountUpdate = () => {
        const bCount = document.querySelectorAll(".card").length
        const bottomCounter = document.getElementById("bottomCount")
        bottomCounter.innerText = `You saw ${bCount} species of Pokemon today!`
        }
  
        bCountUpdate()
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        getPokemon(userInput.value)
        form.reset()
    })

    getPokemon("pikachu")
    displayDate()
    // deleteBtn()
})