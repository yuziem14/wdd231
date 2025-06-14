window.addEventListener('load', e => {
    const formLoadedTimestampInput = document.querySelector('#formLoadedTimestampInput');
    formLoadedTimestampInput.value = Date.now();
    console.log('Loaded')
});