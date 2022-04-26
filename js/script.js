let pokemonRepository = (function (){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

  function add (pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll () {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('new-button');
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  };

function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
     let url = item.detailsUrl;
     return fetch(url).then(function (response) {
       return response.json();
     }).then(function (details) {
       // Now we add the details to the item
       item.imageUrl = details.sprites.front_default;
       item.height = details.height;
       item.types = details.types;
     })
     .catch(function (e) {
       console.error(e);
     });
   }

   function showDetails(pokemon) {
     loadDetails(pokemon).then(function () {
     showModal(pokemon);
     });
   }

   function showModal(title, text) {
     let modalContainer = document.querySelector('#modal-container');

     // Clear all existing modal content
     modalContainer.innerHTML = '';

     let modal = document.createElement('div');
     modal.classList.add('modal');

     let closeButtonElement = document.createElement('button');
     closeButtonElement.classList.add('modal-close');
     closeButtonElement.innerText = 'Close';

     let titleElement = document.createElement('h1');
     titleElement.innerText = title;

     let contentElement = document.createElement('p');
     contentElement.innerText = text;

     modal.appendChild(closeButtonElement);
     modal.appendChild(titleElement);
     modal.appendChild(contentElement);
     modalContainer.appendChild(modal);

     modalContainer.classList.add('is-visible');
   }

   document.querySelector('#show-modal').addEventListener('click', () => {
     showModal('Modal title', 'This is the modal content!');
   });

   function hideModal() {
     let modalContainer = document.querySelctor('#modal-container');
     modalContainer.classList.remove('is-visible');
   }

   let closeButtonElement = document.createElement('button');
   closeButtonElement.classList.add('modal-close');
   closeButtonElement.innerText = 'Close';
   closeButtonElement.addEventListener('click', hideModal);

   window.addEventListener('keydown', (e) => {
     let modalContainer = document.querySelector('#modal-container');
     if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
       hideModal();
     }
   });

   modalContainer.addEventListener('click', (e) => {
     let target = e.target;
     if (target === modalContainer) {
       hideModal();
     }
   });

  return {
    getAll: getAll,
    add: add,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem : addListItem,
    showDetails : showDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

pokemonRepository.getAll().forEach (function (pokemon) {
 pokemonRepository.addListItem(pokemon);
})

function showModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.add('is-visible');
}
document.querySelector('#show-modal').addEventListener('click', () => {
  showModal();
});
