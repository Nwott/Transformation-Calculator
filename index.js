// elements
var vScaleField
var hScaleField
var vTranslField
var hTranslField
var vReflBox
var hReflBox
var equationTxt

// values
var vScale
var hScale
var vTransl
var hTransl
var vRefl
var hRefl

// equation
var equation = ""

// get elements once page loads
window.onload = function() {
    getElements()
}

// get elements from html code
function getElements() {
    vScaleField = document.getElementById("vscale")
    hScaleField = document.getElementById("hscale")
    vTranslField = document.getElementById("vtransl");
    hTranslField = document.getElementById("htransl");
    vReflBox = document.getElementById("vrefl");
    hReflBox = document.getElementById("hrefl");
    equationTxt = document.getElementById("equation")
}

// get values
function getValues() {
    if(vScaleField.value === "") {
        vScale = 0
    }
    else {
        vScale = vScaleField.value
    }

    if(hScaleField.value === "") {
        hScale = 0
    }
    else {
        hScale = Math.round((1 / Math.abs(hScaleField.value)) * 100) / 100
    }

    if(vTranslField.value === "") {
        vTransl = 0
    }
    else {
        vTransl = vTranslField.value
    }

    if(hTranslField === "") {
        hTransl = 0
    }
    else {
        hTransl = hTranslField.value * -1
    }

    if(vReflBox.checked) {
        vRefl = true
    }
    else {
        vRefl = false
    }

    if(hReflBox.checked) {
        hRefl = true
    }
    else {
        hRefl = false
    }
}

// updates equation and graph
function update() {
    getValues()

    // clear equation
    equation = ""

    // vertical reflection
    if(vRefl) {
        equation += "-"
    }
    
    // vertical scale
    if(vScale !== 0) {
        equation += vScale
    }

    if(vScale !== 0 || hRefl) {
        equation += "("
    }

    // horizontal reflection
    if(hRefl) {
        equation += "-"
    }

    // horizontal scale
    if(hScale !== 0) {
        equation += hScale
    }

    if(hTransl !== 0) {
        equation += "(x"

        if(hTransl > 0) {
            equation += "+"
        }

        equation += hTransl + ")"
    }
    else {
        equation += "x"
    }

    if(vScale !== 0 || hRefl) {
        equation += ")"
    }

    if(vTransl !== 0) {
        if(vTransl > 0) {
            equation += "+"
        }

        equation += vTransl
    }

    equationTxt.innerText = equation
}