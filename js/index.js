'use strict'

const pokemonsNumber = Array.from(Array(251))
  .map((value, index) => String(index + 1).padStart(3, '0'))

function createImageElement(pokemonNumber) {
  const img = new Image()
  img.src = `images/pokemons/${pokemonNumber}.png`
  img.onload = () => console.log('Pokemon Loaded ' + pokemonNumber)
  img.onerror = () => console.log('Pokemon failed ' + pokemonNumber)
  document.body.appendChild(img)
}

pokemonsNumber.forEach(createImageElement)