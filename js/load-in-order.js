'use strict'

const pokemonsNumber = Array
  .from(Array(251).keys())
  .map(number => String(number + 1).padStart(3, '0'))

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

function loadInOrder() {
  const pokemonNumber = pokemonsNumber.shift()
  if (pokemonNumber) {
    const image = new Image()
    image.src = `images/pokemons/${pokemonNumber}.png`
    image.addEventListener('load', updateProgressbar())
    image.addEventListener('load', loadInOrder)
    image.addEventListener('error', () =>
      console.log('Pokemon failed ' + pokemonNumber)
    )
    document.body.appendChild(image)
  }
}

loadInOrder()
