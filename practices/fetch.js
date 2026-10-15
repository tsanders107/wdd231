const url = "https://pokeapi.co/api/v2/pokemon/ditto";
const output = document.querySelector("#Output");
const listEl = document.querySelector("#OutputList");

// three ways to process data: json(), text(), and blob(), blob is anything that isnt text or json

let results = null;
async function getPokemon(url, action) {
    const response = await fetch(url);
    //check to see if the fetch was successful
    if (response.ok) {
        // the API will send us JSON... but we have to convert the response before we can use it
        // .json() also returns a promise... so we await it as well
        const data = await response.json();
        action(data);
    }
}

function doStuff(data) {
    results = data;
    const html = `<h2>${data.name}</h2>
    <img src="${data.sprites.other['official-artwork'].front_default}">`;
    output.innerHTML = html;
    console.log("first: ", results);
}

function renderPokemoneList(list) {
    console.log(list);
    const pokemon = list.results;
    const html = pokemon.map((p) => `<li>${p.name}</li>`).join("");
    listEl.insertAdjacentHTML("beforeend", html);
}
getPokemon(url, doStuff);
getPokemon("https://pokeapi.co/api/v2/pokemon", renderPokemoneList);
console.log("second: ", results); // this will log null because the fetch is asynchronous and hasn't completed yet