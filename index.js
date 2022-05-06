/* Global Variables */

let colorID = ""
let colorScheme = ""
let colorSecHtml = ""
let colorArray = []
const colorSec = document.getElementById('color-sec')


/* Button click grabs the color from the #color-picker, grabs the scheme
from #color-schemes, then getColorArray()*/

document.getElementById('color-btn').addEventListener("click", function(evt){
    evt.preventDefault()
    colorID = document.getElementById('color-picker').value.replace('#', "")
    colorScheme = document.getElementById('color-schemes').value
    getColorArray()
})

/* Async function to get colors that meet the criteria specified. then 
runs getColorHtml() + error handling */

async function getColorArray(){
    try{
    let res = await fetch(`https://www.thecolorapi.com/scheme?hex=${colorID}&mode=${colorScheme}&count=5`)
    let data = await res.json()
    colorArray = data.colors
    getColorHtml()} catch (err){
        alert(err + "Please Try Again.")
    }}

/* for loop */

function getColorHtml(){
    colorSecHtml = ""
    colorArray.forEach((color)=>{
        colorSecHtml += `
        <div class='color' id='color' style="background-color:${color.hex.value}" onclick="grabColor(${color.hex.value})">
            <div class='color--text'> 
                <p class="color--name">${color.name.value}</p>
                <p class="color--hex">${color.hex.value}</p>
                <p class="color--rgb">${color.rgb.value}</p>
            </div>
         </div>`
    })
    colorSec.innerHTML = colorSecHtml
    console.log(colorSecHtml)
}

function grabColor(i){
    navigator.clipboard.writeText(i);
    alert("Copied '" + i + "' to clipboard.")
}