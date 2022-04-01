// elements
var vScaleField
var hScaleField
var vTranslField
var hTranslField
var vReflBox
var hReflBox
var equationTxt
var graph
var calculator
var quadraticBtn
var radicalBtn
var reciprocalBtn
var desmosEquation

// values
var vScale
var hScale
var vTransl
var hTransl
var vRefl
var hRefl

// equation
var equation = ""
var radEquation = ""

// function
var func = "Quadratic"

// get elements once page loads
window.onload = function() {
    getElements()
    setupGraph()
    setListeners()
    changeBtnColour(quadraticBtn)
    update()
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
    quadraticBtn = document.getElementById("quadratic-btn")
    radicalBtn = document.getElementById("radical-btn")
    reciprocalBtn = document.getElementById("reciprocal-btn")
    desmosEquation = document.getElementById("equation-desmos")
}

function setListeners() {
    quadraticBtn.addEventListener("click", function() {
        updateFunction("Quadratic")
        changeBtnColour(quadraticBtn)
    })

    radicalBtn.addEventListener("click", function() {
        updateFunction("Radical")
        changeBtnColour(radicalBtn)
    })

    reciprocalBtn.addEventListener("click", function() {
        updateFunction("Reciprocal")
        changeBtnColour(reciprocalBtn)
    })
}

function changeBtnColour(btn) {
    quadraticBtn.className = "btn btn-secondary"
    radicalBtn.className = "btn btn-secondary"
    reciprocalBtn.className = "btn btn-secondary"

    btn.className = "btn btn-primary"
}

// setup desmos graph
function setupGraph() {
    graph = document.getElementById("graph")
    calculator = Desmos.GraphingCalculator(graph, {
        keypad: false,
        expressions: false,
        zoomButtons: false
    })
}

// get values
function getValues() {
    if(vScaleField.value === "") {
        vScale = 0
    }
    else {
        vScale = parseFloat(vScaleField.value)
    }

    if(hScaleField.value === "") {
        hScale = 0
    }
    else {
        hScale = Math.round((1 / (Math.abs(hScaleField.value)) * 100)) / 100
    }

    if(vTranslField.value === "") {
        vTransl = 0
    }
    else {
        vTransl = parseFloat(vTranslField.value)
    }

    if(hTranslField === "") {
        hTransl = 0
    }
    else {
        hTransl = parseFloat(hTranslField.value * -1)
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

// quadratic equation format
function quadratic() {
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

    equation += "^2"

    if(vTransl !== 0) {
        if(vTransl > 0) {
            equation += "+"
        }

        equation += vTransl
    }
}

// format radical function
function radical() {
    // vertical reflection
    if(vRefl) {
        equation += "-"
        radEquation += "-"
    }
    
    // vertical scale
    if(vScale !== 0) {
        equation += vScale
        radEquation += vScale
    }

    equation += String.raw`\sqrt{`
    radEquation += "√"

    // horizontal reflection
    if(hRefl) {
        equation += "-"
        radEquation += "-"
    }

    // horizontal scale
    if(hScale !== 0) {
        equation += hScale
        radEquation += hScale
    }

    if(hTransl !== 0) {
        equation += "(x"
        radEquation += "(x"

        if(hTransl > 0) {
            equation += "+"
            radEquation += "+"
        }

        equation += hTransl + ")"
        radEquation += hTransl + ")"
    }
    else {
        equation += "x"
        radEquation += "x"
    }

    equation += "}"

    if(vTransl !== 0) {
        if(vTransl > 0) {
            equation += "+"
            radEquation += "+"
        }

        equation += vTransl
        radEquation += vTransl
    }
}

function reciprocal() {
    if(vScale === 0) {
        equation = "null"
        return
    }
    
    if(vTransl !== 0) {
        equation += "("
    }

    if(vRefl || vScale !== 0) {
        equation += "("
    }

    // vertical reflection
    if(vRefl) {
        equation += "-"
    }
    
    // vertical scale
    if(vScale !== 0) {
        equation += vScale
    }

    if(vRefl || vScale !== 0) {
        equation += ")"
    }

    equation += "/"

    equation += "("

    // horizontal reflection
    if(hRefl) {
        equation += "-"
    }

    // horizontal scale
    if(hScale !== 0) {
        equation += hScale
    }

    if(hRefl || hScale !== 0) {
        equation += "("
    }

    if(hTransl !== 0) {
        equation += "x"

        if(hTransl > 0) {
            equation += "+"
        }

        equation += hTransl
    }
    else {
        equation += "x"
    }

    if(vScale !== 0 || hRefl) {
        equation += ")"
    }

    if(hRefl || hScale !== 0) {
        equation += ")"
    }

    if(vTransl !== 0) {
        equation += ")"

        if(vTransl > 0) {
            equation += "+"
        }

        equation += vTransl
    }
}

// updates equation and graph
function update() {
    getValues()

    // clear equation
    equation = ""
    radEquation = ""

    if(func === "Radical") {
        radical()
        equationTxt.innerText = radEquation
        desmosEquation.style.display = "block"
        desmosEquation.innerText = "If pasting into Desmos: " + equation
    }
    else if(func === "Quadratic") {
        quadratic()
        equationTxt.innerText = equation
        desmosEquation.style.display = "none"
    }
    else if(func === "Reciprocal") {
        reciprocal()
        equationTxt.innerText = equation
        desmosEquation.style.display = "none"
    }

    updateGraph()
}

function updateGraph() {
    calculator.setExpression({ id: "graph1", latex: equation})
}

function updateFunction(mode) {
    func = mode
    update()
}
