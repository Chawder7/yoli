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