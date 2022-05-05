let colorID = ""
let colorScheme = ""
let colorArray = []
const colorSec = document.getElementById('color-sec')
let colorSecHtml = ""
let colorChange= document.getElementById('colorchange')

document.getElementById('get-color-scheme').addEventListener("click", function(evt){
    evt.preventDefault()
    colorID = document.getElementById('color-id').value.replace('#', "")
    colorScheme = document.getElementById('color-schemes').value
    getColorArray()
    setTimeout(() => {colorHtml()}, 500)
})

function getColorArray(){
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorID}&mode=${colorScheme}&count=5`)
        .then(res => res.json())
        .then(data => {
            colorArray = data.colors
})}

function colorHtml(){
    colorSecHtml = ""
    for(let i = 0; i<colorArray.length; i++){
        currentColor =colorArray[i].hex.value
        colorSecHtml += `
        <div id='color-column' onclick="grabColor(${i})">
            <div class='color-dis'style="background-color:${currentColor}">
            </div>
            <div class='color-text'>
                <p>${currentColor}</p>
            </div>
            </div>`
    }
    colorSec.innerHTML = colorSecHtml
}

function grabColor(i){
let copyColor = colorArray[i].hex.value
    navigator.clipboard.writeText(copyColor);
    alert("Copied '" + copyColor + "' to clipboard.")
}

let content = document.getElementsByTagName('body')[0];
let darkMode = document.getElementById('dark-change');
darkMode.addEventListener('click', function(){
    darkMode.classList.toggle('active');
    content.classList.toggle('night');
})