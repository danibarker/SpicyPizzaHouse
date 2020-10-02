let pizzaToppings = {
    bacon: 0,
    pepperoni: 0,
    pineapple: 0
}
let basePrices = {
    14: 14.99,
    16: 16.99,
    18: 20.99,
    20: 24.99
}
function addTopping(toppingName) {
    pizzaToppings[toppingName]++;
    
    updateOrder();
}

function removeTopping(toppingName) {
    pizzaToppings[toppingName]--;
    
    updateOrder();
}

function generatePizzaPicture() {
    let pizzaHtml = JSON.stringify(pizzaToppings);
    $("#pizza").html(pizzaHtml);
}

function updateOrder() {
    generatePizzaPicture();
    let size = $("#pizzasize").val();
    let cost = basePrices[size] + Object.values(pizzaToppings)
        .reduce((total, cost) => total += cost * size/20, 0);
    let costHtml = "$" + cost;
    $("#pizzaCost").html(costHtml);
}