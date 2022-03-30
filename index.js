// elements
var vScaleField
var hScaleField
var vTranslField
var hTranslField
var vReflBox
var hReflBox
var equationTxt

// equation
var equation = ""

// get elements once page loads
window.onload = function() {
    getElements()
}

function getElements() {
    vScaleField = document.getElementById("vscale")
    hScaleField = document.getElementById("hscale")
    vTranslField = document.getElementById("vtransl");
    hTranslField = document.getElementById("htransl");
    vReflBox = document.getElementById("vrefl");
    hReflBox = document.getElementById("hrefl");
    equationTxt = document.getElementById("equation")
}

// updates equation and graph
function update() {
    equation = ""
    
    if(vReflBox.checked) {
        equation += "-"
    }

    if(vScaleField.value !== "" && vScaleField.value !== "0") {
        equation += vScaleField.value + "["
    }

    if(hReflBox.checked) {
        equation += "-"
    }

    if(hScaleField.value !== "" && hScaleField.value !== "0") {
        equation += hScaleField.value
    }

    if(hTranslField.value !== "" && hTranslField.value !== "0") {
        equation += "("
    }

    equation += "x"

    if(hTranslField.value !== "" && hTranslField.value !== "0") {
        equation += -hTranslField.value + ")"
    }

    if(hScaleField.value !== "" && hScaleField.value !== "0") {
        equation += "]"
    }
    
    equation += "^2"

    equationTxt.innerText = equation
}