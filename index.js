/* Global Variables */
const colorSec = document.getElementById('color-sec')

/* Button click grabs the color from the #color-picker, grabs the scheme
from #color-schemes, then getColorArray()*/

document.getElementById('color-btn').addEventListener("click", function(evt){
    evt.preventDefault()
    const colorID = document.getElementById('color-picker').value.replace('#', "")
    const colorScheme = document.getElementById('color-schemes').value
    getColorArray(colorID, colorScheme)
})

/* Async function to get colors that meet the criteria specified. then 
runs getColorHtml() + error handling */

async function getColorArray(id, scheme){
    try{
    let res = await fetch(`https://www.thecolorapi.com/scheme?hex=${id}&mode=${scheme}&count=5`)
    let data = await res.json()
    const colorArray = data.colors
    console.log(id + scheme)
    renderColorHtml(colorArray)} catch (err){
        alert(err + "Please Try Again.")
    }}

function renderColorHtml(colorArray){
    let colorSecHtml = ""
    colorArray.forEach((color)=>{
        colorSecHtml += `
        <div class='color' id='color' style="background-color:${color.hex.value}" onclick="grabColor('${color.hex.value}')">
            <div class='color--text'> 
                <p class="color--hex">${color.hex.value}</p>
            </div>
         </div>`
    })
    colorSec.innerHTML = colorSecHtml
    console.log(colorSecHtml)
}

function grabColor(i) {
    navigator.clipboard.writeText(i)
        .catch(err => {
            // Here, we set <textarea> element to be appended to the document. 
            const area = document.createElement('textarea')
            document.body.appendChild(area)
            // Then, we set its value to the string you want to copy to the clipboard. (i in this case)
            area.value = i
            // Then, we use area.select() to select the contents of the <textarea> element.
            area.select()
            // After this, we use Document.execCommand('copy') to copy the contents of the <textarea> to the clipboard.
            document.execCommand('copy')
            // Finally, we remove the <textarea> element from the document since it's no longer needed.
            document.body.removeChild(area)
        })
        .finally(() => {
            alert("Copied '" + i + "' to clipboard.")
        })
}

window.addEventListener("load", getColorArray("ff00ff", "monochrome-dark"))