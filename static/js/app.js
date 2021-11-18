
const loadCharacters = async () => {
  const d = document;
  const $personajesContainer = d.querySelector('#characters');
  const $cardTemplate = d.querySelector('#character-card').content;
  const $fragment = d.createDocumentFragment();

  try{
    let respuesta = await fetch('https://rickandmortyapi.com/api/character');
    let { results: personajes } = await respuesta.json();

    personajes.forEach(personaje => {
      $cardTemplate.querySelector(".character__name").innerText=personaje.name;
      $cardTemplate.querySelector('.character__img img').setAttribute('src', personaje.image);
      $cardTemplate.querySelector(".character__specie span").innerText=personaje.species;
      $cardTemplate.querySelector(".character__gender span").innerText=personaje.gender;

      let $clone = d.importNode($cardTemplate, true);
      $fragment.appendChild($clone);
    });

    $personajesContainer.appendChild($fragment);

    if(!respuesta.ok) 
      throw{
          status:res.status, 
          statusText: res.statusText
      };
  }
  catch(err){
    let message = err.statusText || "Ocurrio un error"
    $personajesContainer.insertAdjacentHTML("afterend", `<p><b>${err.status}: ${message}</b></p>`)
  }
  
}

loadCharacters();