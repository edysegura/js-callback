'use strict'

const pokemonsNumber = Array
  .from(Array(251).keys())
  .map(number => String(number + 1)
  .padStart(3, '0'))

function updateProgressbar() {
  const progressBar = document.querySelector('progress')
  const progressPercentage = document.querySelector('span')
  const total = pokemonsNumber.length
  let loaded = 0

  return () => {
    ++loaded
    let percentage = Math.floor((loaded * 100) / total)
    progressBar.value = percentage
    progressPercentage.textContent = percentage + '%'
  }
}

function onError(pokemonNumber) {
  return () => {
    console.error('Pokemon failed ' + pokemonNumber)
    loadInOrder()
  }
}

function loadInOrder() {
  const pokemonNumber = pokemonsNumber.shift()
  if (pokemonNumber) {
    const image = new Image()
    image.src = `images/pokemons/${pokemonNumber}.png`
    image.addEventListener('load', updateProgressbar())
    image.addEventListener('load', loadInOrder)
    image.addEventListener('error', onError(pokemonNumber))
    document.body.appendChild(image)
  }
}

loadInOrder()
