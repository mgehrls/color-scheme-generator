let colorID = ""
let colorScheme = ""
let colorArray = []
const colorSec = document.getElementById('color-sec')
let colorSecHtml = ""
let colorChange= document.getElementById('colorchange')

document.getElementById('get-color-scheme').addEventListener("click", function(evt){
    evt.preventDefault()
    colorID = document.getElementById('color-picker').value.replace('#', "")
    colorScheme = document.getElementById('color-schemes').value
    getColorArray()
    setTimeout(() => {colorHtml()}, 500)
})

function getColorArray(){
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorID}&mode=${colorScheme}&count=5`)
        .then(res => res.json())
        .then(data => {
            colorArray = data.colors
            console.log(data.colors)
})}

function colorHtml(){
    colorSecHtml = ""
    for(let i = 0; i<colorArray.length; i++){
        currentColor = colorArray[i].hex.value
        colorSecHtml += `
        <div id='color' onclick="grabColor(${i})">
            <div class='color-dis'style="background-color:${currentColor}">
            </div>
            <div class='color-text'>
                <p class="color-name">${colorArray[i].name.value}</p>
                <p class="color-hex-value">${currentColor}</p>
                <p class="color-rgb">${colorArray[i].rgb.value}</p>
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