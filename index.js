document.addEventListener("DOMContentLoaded", () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    const dateDisplay = document.getElementById("date")

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



        
    displayDate()
})