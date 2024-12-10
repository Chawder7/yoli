let deferredPrompt;
const installBtn = document.getElementById('installBtn');

// Escucha el evento 'beforeinstallprompt'
window.addEventListener('beforeinstallprompt', (e) => {
// Previene la aparición del banner predeterminado
e.preventDefault();
deferredPrompt = e;
// Muestra el botón de instalación
installBtn.style.display = 'inline-block';

installBtn.addEventListener('click', async () => {
    // Muestra el cuadro de diálogo de instalación
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
            console.log('PWA instalada');
        } else {
            console.log('PWA no instalada');
        }
        deferredPrompt = null;
        }
    });
});

// Verifica si ya está instalada
window.addEventListener('appinstalled', () => {
    console.log('PWA se instaló correctamente');
    installBtn.style.display = 'none'; // Oculta el botón después de la instalación
});

const url = 'https://mmo-games.p.rapidapi.com/games?category=third-Person';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'de8026eb5fmsh07917a7bdb9a2ecp10d814jsn967f9c14705d',
    'x-rapidapi-host': 'mmo-games.p.rapidapi.com'
  }
};

async function fetchGames() {   
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json(); 
    const topTenGames = result.slice(10, 21); 
    displayGames(topTenGames); 
  } catch (error) {
    console.error('Error fetching the games:', error);
    loadCachedGames();
  }
}

function displayGames(games) {
    const gamesContainer = document.getElementById('games');
    gamesContainer.innerHTML = '';
    games.forEach((game, index) => {
        const gameElement = document.createElement('div');
        gameElement.classList.add('carousel-item');
        if (index === 0) gameElement.classList.add('active'); 
        gameElement.innerHTML = `
            <div class="d-flex justify-content-center align-items-center" style="height: 300px;">
                <div class="text-center">
                    <h2>${game.title}</h2>
                    <img src="${game.thumbnail}">
                </div>
            </div>
        `;
        gamesContainer.appendChild(gameElement);
    });
}

function loadCachedGames(){
  caches.match(url).then(response =>{
    if(response){
      response.json().then(data=>{
        const topTenGames = data.slice(10,21);
        displayGames(topTenGames)
      });
    }
  });
}

fetchGames();




    
    
