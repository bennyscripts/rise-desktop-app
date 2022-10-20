const themeCountSpan = document.getElementById('theme-count');
const scriptCountSpan = document.getElementById('script-count');

const updateCounts = () => {
    rise.getThemes().then((themes) => {
        themeCountSpan.innerText = themes.length;
    })
    
    rise.getScripts().then((scripts) => {
        scriptCountSpan.innerText = scripts.length;
    })

    setTimeout(updateCounts, 1000);
}

updateCounts();