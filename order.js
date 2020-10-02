let pizzaToppings = {
    bacon: 0,
    pepperoni: 0
}

function addTopping(toppingName) {
    pizzaToppings[toppingName]++
    generatePizzaPicture()
}

function removeTopping(toppingName) {
    pizzaToppings[toppingName]--
    generatePizzaPicture()
}

function generatePizzaPicture() {
    let pizzaHtml = JSON.stringify(pizzaToppings)
    $("#pizza").html(pizzaHtml)
}