const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // prevent mini infobar from appearing on mobile devices
    event.preventDefault();
    // stash event for later functions
    window.deferredPrompt = event;
    // remove the hidden class from the install button
    butInstall.style.display = 'block';
    // for dev: logging that the function successfully completed
    console.log('beforeinstallprompt event fired and stored');
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // take event prompt from previous function
    const promptEvent = window.deferredPrompt;
    // If no event found, log to console for dev analytics and break
    if (!promptEvent) {
        // for dev: logging if promptEvent was not correctly passed
        console.log('No prompt event passed to click event handler in install.js');
        return;
    }
    // show install prompt
    promptEvent.prompt();
    // wait for user's decision to prompt
    const result = await promptEvent.userChoice;
    // log user's decision for dev analytics
    console.log(`User response to the install prompt: ${result.outcome}`);
    // discard prompt after use
    window.deferredPrompt = null;
    // hide install button
    butInstall.classList.add('hidden');
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // log install for dev analytics
    console.log('PWA installed');
    // hide install button
    butInstall.classList.add('hidden');
});
