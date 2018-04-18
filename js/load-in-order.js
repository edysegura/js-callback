'use strict'

const pokemonsNumber = Array.from(Array(251).keys())
  .map(number => String(number + 1).padStart(3, '0'))

let loaded = 0
const total = pokemonsNumber.length
const progressBar = document.querySelector('progress')
const progressPercentage = document.querySelector('span')

function updateProgressbar() {
  let percentage = 0
  ++loaded
  percentage = Math.floor((loaded * 100) / total)
  progressBar.value = percentage
  progressPercentage.textContent = percentage + '%'
}

function loadInOrder() {
  const pokemonNumber = pokemonsNumber.shift()
  if(pokemonNumber) {
    const img = new Image()
    img.src = `images/pokemons/${pokemonNumber}.png`
    img.addEventListener('load', updateProgressbar)
    img.addEventListener('load', () => loadInOrder())
    img.addEventListener('error', () => console.log('Pokemon failed ' + pokemonNumber))
    document.body.appendChild(img)
  }
}

loadInOrder()