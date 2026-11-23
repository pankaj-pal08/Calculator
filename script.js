const display = document.getElementById("display");

let expression = "";

function appendValue(value) {
    if (display.value === "Error") {
        expression = "";
    }

    if (expression === "" && ["+", "*", "/", "%"].includes(value)) {
        return;
    }

    expression += value;
    display.value = expression;
}

function clearDisplay() {
    expression = "";
    display.value = "0";
}

function deleteNumber() {
    expression = expression.slice(0, -1);
    display.value = expression || "0";
}

function calculate() {
    try {
        if (!expression) return;

        if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
            throw new Error("Invalid input");
        }

        let result = Function('"use strict"; return (' + expression + ')')();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid calculation");
        }

        expression = String(Number(result.toFixed(10)));
        display.value = expression;

    } catch (error) {
        display.value = "Error";
        expression = "";
    }
}