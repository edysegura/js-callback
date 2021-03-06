const http = require('http')
const fs = require('fs')
const path = require('path')

function getImagePath(pokemonNumber) {
  return path.join(__dirname, `../src/images/pokemons/${pokemonNumber}.png`)
}

function catchPokemon(pokemonNumber) {
  const options = {
    host: 'assets.pokemon.com',
    port: 80,
    path: `/assets/cms2/img/pokedex/full/${pokemonNumber}.png`
  }

  http.get(options, function(response) {
    if (response.headers['content-type'] != 'image/png') {
      return
    }

    let chunks = []
    response.on('data', chunk => chunks.push(chunk))

    response.on('end', () => {
      const buffer = Buffer.concat(chunks)
      fs.writeFile(getImagePath(pokemonNumber), buffer, error => {
        if (error) {
          console.log(`Missed Pokemon #${pokemonNumber}`)
          return
        }
        console.log(`Caught Pokemon #${pokemonNumber}`)
      })
    })
  })
}

for (let index = 1; index < 255; index++) {
  const pokemonNumber = String(index).padStart(3, '0')
  catchPokemon(pokemonNumber)
}
