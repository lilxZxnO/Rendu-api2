//navbar 
const indicator = document.querySelector(".nav-indicator");
    const items = document.querySelectorAll(".nav-item");
    function handleIndicator(el) {
      items.forEach((item) => {
        item.classList.remove("is-active");
        item.removeAttribute("style");
      });

      indicator.style.width = `${el.offsetWidth}px`;
      indicator.style.backgroundColor = el.getAttribute("data-active-color");
      indicator.style.left = `${el.offsetLeft}px`;

      el.classList.add("is-active");
      el.style.color = el.getAttribute("data-active-color");
    }

    items.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        handleIndicator(e.target);
      });
      item.classList.contains("is-active") && handleIndicator(item);
    });




// api
//attendre que le DOM soit chargé(ici j'ai regarder dans des repos github pour comprendre comment ils mettaits des api et ils mettaient ça donc je l'ai mis aussi pour voir si ça marche et ça marche)
document.addEventListener('DOMContentLoaded', () => {
    //selection des persos
    const charactersContainer = document.querySelector('#characters-container');
  //requete des perso de l'api 
    fetch('https://hp-api.lainocs.fr/characters/')
        .then(response => {
          //verifie si c'est valide (je t'avoue ici je ne savais pas mais j'ai demander de l'aide a un ami qui s'y connassait mieux que moi (rey XD))
        if (!response.ok) {
          throw new Error('Network response was not ok');
            }
            //renvoi au json
        return response.json();
      })
      .then(characters => {
        characters.forEach(character => {
            //cree une carte pour chaque perso
          const characterCard = document.createElement('div');
          characterCard.classList.add('character-card');
          // cree une image pour chaque perso
          const characterImage = document.createElement('img');
          characterImage.src = character.image;
          characterImage.alt = character.name;
          characterImage.classList.add('character-image');
            //cree un titre pour le nom de chaque perso
          const characterName = document.createElement('h2');
          characterName.textContent = character.name;
          characterName.classList.add('character-name');
          // cree un paragraphe pour la maison de chaque perso
          const characterDetails = document.createElement('p');
          characterDetails.textContent = `House: ${character.house}`;
          characterDetails.classList.add('character-details');
            //ajoute le nom l'image et la maison a la carte
          characterCard.appendChild(characterImage);
          characterCard.appendChild(characterName);
          characterCard.appendChild(characterDetails);
            //ajoute la carte au container
          charactersContainer.appendChild(characterCard);
        });
      })
        .catch(error => {
          //si il y a une erreur on l'affiche
        console.error('Error fetching characters:', error);
      });
  });
  
  