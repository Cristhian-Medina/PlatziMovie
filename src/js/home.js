
// creamos una Promesa
/* const getUser = new Promise(function (todoBien, todoMal) {
  setTimeout(function () {
    todoMal();
  }, 3000)
}) */

// ejecutamos la promesa
/* getUser
  // cuando tiene exito hago esto
  .then(function () {
    console.log('Todo esta bien en la vida.')
  })
  // cuando falla hago esto
  .catch(function () {
    console.log('Todo fallo :(.')
  }) */

// creamos multiples Promesas
/* const getUser1 = new Promise(function (todoBien, todoMal) {
  setTimeout(function () {
    todoBien('Si existe');
  }, 3000)
})
const getUser2 = new Promise(function (todoBien, todoMal) {
  setTimeout(function () {
    todoBien('Usuario aceptado');
  }, 2000)
}) */

// Juntamos y ejecutamos multiples promesas
/* Promise.all([
  getUser1,
  getUser2,
])
  .then(function (message) {
    console.log(message)
  })
  .catch(function (message) {
    // Muestra el resultado de la primera que se resuelva.
    console.log(message)
  }) */

// Muestra el resultado de la promesa que se resuelve primero
/* Promise.race([
  getUser1,
  getUser2,
])
  .then(function (message) {
    console.log(message)
  })
  .catch(function (message) {
    // Muestra el resultado de la primera que se resuelva.
    console.log(message)
  }) */

/* De jQuery a Vanila JS */

// interactuando con una API en jQuery
// metodo XMLHttpRequest
/* $.ajax('https://randomuser.me/api/', {
  // config
  method: 'GET',
  success: function (data) {
    console.log(data)
  },
  error: function (error) {
    console.log(`Há ocurrido un error: ${error.status}`)
  }
}) */

// interactuando con una API en JS
// metodo Fetch => Promesa
/* fetch('https://randomuser.me/api/')
  .then(function(response) {
    // retorna una nueva promesa
    return response.json()
  }) */
// interactuamos con la nueva promesa
/*   .then(function(user) {
    console.log('User: ', user.results[0].name.title, user.results[0].name.first, user.results[0].name.last)
  })
  .catch(function() {
    console.log('Algo fallo')
  }); */

// Funcion Asincrona dentro de un Clousure
/* (async function load() {
  const response = await fetch('https://yts.lt/api/v2/list_movies.json?genre=action')
  const data = await response.json()
  console.log(data)
})(); */

(async function load() {

  const BASE_API = 'https://yts.lt/api/v2/';
  const LIST = 'list_movies.json?';
  const GENRE = 'genre=';
  const NAME = 'query_term=';
  const GENRE_LIST = [
    'action',    // 0
    'adventure', // 1
    'animation', // 2
    'comedy',    // 3
    'drama',     // 4
    'horror',    // 5
    'romance',   // 6
    'sci-fi',    // 7
  ];

  const $home = document.getElementById('home');
  const $overlay = document.getElementById('overlay');
  const $featuringContainer = document.getElementById('featuring');
  const $myListContainer = document.getElementById('myList');
  const $listFriendsContainer = document.getElementById('listFriends');

  const $form = document.getElementById('form');
  $form.addEventListener('submit', async (event) => {
    // cancela la recarga del navegador cada vez que se envia un nuevo dato al formulario
    event.preventDefault();
    // agrega una clase al elemento html
    $home.classList.add('search-active');
    // crea un nuevo elemento html
    const $loader = document.createElement('img');
    // inserta atributos al elemento
    setAttributes($loader, {
      src: 'src/images/loader.gif',
      height: 50,
      width: 50,
    });
    // crea el template del elemento html del loader
    const HTMLLoader = loaderTemplate($loader.outerHTML)
    // agrega el elemento loader mientras se obtienen los datos de la pelicula
    $featuringContainer.innerHTML = HTMLLoader;
    // obtiene los datos del formulario de busqueda
    const formData = new FormData($form);
    // ejecuta el codigo dentro de try y si ocurre un error ejecuta el catch
    try {
      // pide a la API información de la pelicula
      const movieData = await getData(`${BASE_API}${LIST}limit=1&${NAME}${formData.get('name')}`);
      // crea el elemento html
      const HTMLString = featuringTemplate(movieData.data.movies[0]);
      // agrega el elemento al contenedor
      $featuringContainer.innerHTML = HTMLString;
    } catch (error) {
      // crea el elemento html
      const HTMLString = featuringTemplateError();
      // agrega el elemento al contenedor
      $featuringContainer.innerHTML = HTMLString
    }
    /* solucion al error de peticion a la API     MIO
        pide a la API información de la pelicula
        const movieData = await getData(`${BASE_API}${LIST}limit=1&${NAME}${formData.get('name')}`)
          .then((movieData) => {
            // crea el elemento html
            const HTMLString = featuringTemplate(movieData.data.movies[0]);
            // agrega el elemento al contenedor
            $featuringContainer.innerHTML = HTMLString;
          })
          .catch(() => {
            // crea el elemento html
            const HTMLString = featuringTemplateError();
            // agrega el elemento al contenedor
            $featuringContainer.innerHTML = HTMLString;
          }); */
  })

  const $actionContainer = document.getElementById('action');
  const $horrorContainer = document.getElementById('horror');
  const $animationContainer = document.getElementById('animation');

  const $modal = document.getElementById('modal');
  const $modalTitle = $modal.querySelector('h1');
  const $modalImage = $modal.querySelector('img');
  const $modalDescription = $modal.querySelector('p');

  const $hideModal = document.getElementById('hide-modal');
  $hideModal.addEventListener('click', hideModal);

  async function getData(url) {
    // hace una peticion a una API
    const response = await fetch(url)
    // convierte los datos de la respuesta en JSON
    const data = await response.json()
    return data;
  }

  // PROMESAS
  /* let terrorList;
  getData('https://yts.lt/api/v2/list_movies.json?genre=terror')
    .then(function (data) {
      console.log('terror list: ', data);
      terrorList = data;
    }); */

  // OBTENER ELEMENTOS DEL DOM
  // JQUERY
  /* const $home = $('.home'); */
  // VANILA JS
  /* const $classHome = document.getElementsByClassName('home');
  const $idHome = document.getElementsById('home');
  const $divs = document.getElementsByTagName('div');
  const $modal = document.querySelector('#modal');
  const $myPlayListItem = document.querySelectorAll('.myPlaylist-item'); */

  function setAttributes($element, attributes) {
    // recorre el objeto attributes
    for (const attribute in attributes) {
      // añade al elemento cada atributo con su valor
      $element.setAttribute(attribute, attributes[attribute]);
    }
  }

  // Funcion para crear los templates para el HTML
  function loaderTemplate($element) {
    return (
      `<div class="featuring">
        <div class="featuring-image">
          ${$element}
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Buscando</p>
        </div>
      </div>`
    );
  }

  // Funcion para crear los templates para el HTML
  function myListTemplate(title) {
    return (
      `<li class="myPlaylist-item">
      <a href="#">
        <span>
          ${title}
        </span>
      </a>
    </li>`
    );
  }

  // Funcion para crear los templates para el HTML
  function listFriendsTemplate(name, image) {
    return (
      `<li class="playlistFriends-item">
      <a href="#">
        <img src="${image}" alt="profile image" />
        <span>
          ${name}
        </span>
      </a>
    </li>`
    );
  }

  // Funcion para crear los templates para el HTML
  function featuringTemplateError() {
    return (
      `<div class="featuring">
        <div class="featuring-content">
          <p class="featuring-title">Pelicula no disponible</p>
          <p class="featuring-album">La pelicula que intentas buscar no esta disponible o no existe, intenta otro nombre.</p>
        </div>
      </div>`
    );
  }

  // Funcion para crear los templates para el HTML
  function featuringTemplate(movie) {
    return (
      `<div class="featuring">
        <div class="featuring-image">
          <img src="${movie.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${movie.title}</p>
        </div>
      </div>`
    );
  }

  // Funcion para crear los templates para el HTML
  // function videoItemTemplate(movie) {    MIO
  function videoItemTemplate(movie, category) {
    return (
      // `<div class="primaryPlaylistItem">     MIO
      `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
        <div class="primaryPlaylistItem-image">
          <img src="${movie.medium_cover_image}">
        </div>
        <h4 class="primaryPlaylistItem-title">
          ${movie.title}
        </h4>
      </div>`
    );
  }

  function createTemplateHTML(HTMLString) {
    // crea un documento html vacio en memoria
    const html = document.implementation.createHTMLDocument();
    // inserta el template string en el documento para crear un elemento html
    html.body.innerHTML = HTMLString;
    // retorna el elemento html
    return html.body.children[0];
  }

  function findById(list, id) {
    // busco la pelicula en las listas usando el id
    return list.find(movie => movie.id === parseInt(id, 10))
  }

  function findMovieFromList(id, category) {
    // selecciona dentro de que lista debo buscar la pelicula
    switch (category) {
      case 'action':
        return findById(actionList, id)
      case 'horror':
        return findById(horrorList, id)
      case 'animation':
        return findById(animationList, id)
    }
  }

  // function showModal(movie) {     MIO
  function showModal($element, myMovie) {
    $overlay.classList.add('active');
    $modal.style.animation = 'modalIn .8s forwards';

    if ($element.dataset.id) {
      const id = $element.dataset.id;
      const category = $element.dataset.category;
      // busca la pelicula seleccionada
      const dataMovie = findMovieFromList(id, category);

      $modalImage.src = dataMovie.medium_cover_image;
      $modalTitle.innerText = dataMovie.title;
      $modalDescription.innerText = dataMovie.summary;
    }

    // $modalImage.src = movie.medium_cover_image;    MIO
    // $modalTitle.innerText = movie.title;           MIO
    // $modalDescription.innerText = movie.summary;   MIO
    $modalImage.src = myMovie.medium_cover_image;
    $modalTitle.innerText = myMovie.title;
    $modalDescription.innerText = myMovie.summary;
  }

  function hideModal() {
    $overlay.classList.remove('active');
    $modal.style.animation = 'modalOut .8s forwards';
  }

  function renderUser(users) {
    users.forEach(user => {
      const name = `${user.name.first} ${user.name.last}`;
      const image = user.picture.thumbnail;
      // crea el template
      const HTMLString = listFriendsTemplate(name, image);
      // convierte el template en un elemento html
      const element = createTemplateHTML(HTMLString);
      // inserta el elemento en el contenedor
      $listFriendsContainer.append(element);
    })
  }

  function renderMyList(movies) {
    movies.forEach(movie => {
      const title = movie.title;
      // crea el template
      const HTMLString = myListTemplate(title);
      // convierte el template en un elemento html
      const movieElement = createTemplateHTML(HTMLString);
      // inserta el elemento en el contenedor
      $myListContainer.append(movieElement);
      addEventClick(movieElement, movie);
    })
  }

  // function addEventClick($element, movie) {    MIO
  function addEventClick($element, myMovie) {
    $element.addEventListener('click', () => showModal($element, myMovie))
  }

  function renderMovieList(list, $container, category) {
    // elimina el loader si existe
    if ($container.children[0]) {
      $container.children[0].remove();
    }
    // recorre la lista y crea el elemento html
    list.forEach((movie) => {
      // crea el template
      const HTMLString = videoItemTemplate(movie, category);
      // convierte el template en un elemento html
      const movieElement = createTemplateHTML(HTMLString);
      // inserta el elemento en el contenedor
      $container.append(movieElement);
      // addEventClick(movieElement, movie);     MIO
      const imageAnimation = movieElement.querySelector('img');
      imageAnimation.addEventListener('load', () => {
        event.srcElement.classList.add('fadeIn');
      })
      addEventClick(movieElement);
    })
  }

  async function cacheExist(category) {
    const listName = `${category}List`;
    const cache = localStorage.getItem(listName);

    if (cache) {
      return JSON.parse(cache);
    }
    const { data: { movies: data } } = await getData(`${BASE_API}${LIST}${GENRE}${category}`);
    localStorage.setItem(listName, JSON.stringify(data));
    return data;
  }

  // PETICIONES 

  const { results: userRamdom } = await getData('https://randomuser.me/api/?results=12');
  renderUser(userRamdom);

  const { data: { movies: myMovieList } } = await getData(`${BASE_API}${LIST.replace('?', '')}`);
  renderMyList(myMovieList);

  const actionList = await cacheExist('action');
  renderMovieList(actionList, $actionContainer, 'action');
  // const { data: { movies: horrorList } } = await getData(`${BASE_API}${LIST}${GENRE}${GENRE_LIST[5]}`);
  const horrorList = await cacheExist('horror');
  renderMovieList(horrorList, $horrorContainer, 'horror');
  // const { data: { movies: animationList } } = await getData(`${BASE_API}${LIST}${GENRE}${GENRE_LIST[2]}`);
  const animationList = await cacheExist('animation');
  renderMovieList(animationList, $animationContainer, 'animation');
})();