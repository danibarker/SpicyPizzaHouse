$('html, body').css({
    overflow: 'hidden',
    height: '100%'
});
$("a").click(function () {
    $("section").each((i, obj) => $(obj).removeClass('currentSection'));
    $($(this).attr('href')).addClass('currentSection')

});

let pizzaToppings = {
    bacon: {
        quantity: 0,
        svg: `<svg class="toppingSvg" height="200" width="200">\
                <rect x="100" y="40" width="20" height="10" stroke="black" stroke-width="1" fill="brown" /> \
                <rect x="160" y="100" width="20" height="10" stroke="black" stroke-width="1" fill="brown" /> \
                <rect x="80" y="160" width="20" height="10" stroke="black" stroke-width="1" fill="brown" /> \
                <rect x="40" y="100" width="20" height="10" stroke="black" stroke-width="1" fill="brown" /> \
                <rect x="120" y="60" width="20" height="10" stroke="black" stroke-width="1" fill="brown" /> \
                <rect x="140" y="120" width="20" height="10" stroke="black" stroke-width="1" fill="brown" /> \
                <rect x="100" y="140" width="20" height="10" stroke="black" stroke-width="1" fill="brown" /> \
                <rect x="60" y="60" width="20" height="10" stroke="black" stroke-width="1" fill="brown" /> \
                <rect x="100" y="100" width="20" height="10" stroke="black" stroke-width="1" fill="brown" /> \
                 </svg >`},
    pineapple: {
        quantity: 0,
        svg: `<svg id="pineapple" class="toppingSvg" height="200" width="200">\
                <rect x="100" y="40" width="15" height="15" stroke="orange" stroke-width="1" fill="yellow" /> \
                <rect x="160" y="100" width="15" height="15" stroke="orange" stroke-width="1" fill="yellow" /> \
                <rect x="80" y="160" width="15" height="15" stroke="orange" stroke-width="1" fill="yellow" /> \
                <rect x="40" y="100" width="15" height="15" stroke="orange" stroke-width="1" fill="yellow" /> \
                <rect x="120" y="60" width="15" height="15" stroke="orange" stroke-width="1" fill="yellow" /> \
                <rect x="140" y="120" width="15" height="15" stroke="orange" stroke-width="1" fill="yellow" /> \
                <rect x="100" y="140" width="15" height="15" stroke="orange" stroke-width="1" fill="yellow" /> \
                <rect x="60" y="60" width="15" height="15" stroke="orange" stroke-width="1" fill="yellow" /> \
                <rect x="100" y="100" width="15" height="15" stroke="orange" stroke-width="1" fill="yellow" /> \
                </svg >`
    },
    pepperoni: {
        quantity: 0,
        svg: `<svg class="toppingSvg" height="200" width="200">\
                <circle cx="100" cy="40" r="10" stroke="orange" stroke-width="1" fill="red" /> \
                <circle cx="160" cy="100" r="10" stroke="orange" stroke-width="1" fill="red" /> \
                <circle cx="80" cy="160" r="10" stroke="orange" stroke-width="1" fill="red" /> \
                <circle cx="40" cy="100" r="10" stroke="orange" stroke-width="1" fill="red" /> \
                <circle cx="120" cy="60" r="10" stroke="orange" stroke-width="1" fill="red" /> \
                <circle cx="140" cy="120" r="10" stroke="orange" stroke-width="1" fill="red" /> \
                <circle cx="100" cy="140" r="10" stroke="orange" stroke-width="1" fill="red" /> \
                <circle cx="60" cy="60" r="10" stroke="orange" stroke-width="1" fill="red" /> \
                <circle cx="100" cy="100" r="10" stroke="orange" stroke-width="1" fill="red" /> \
                </svg >`},
    
}
let basePrices = {
    14: 14.99,
    16: 16.99,
    18: 20.99,
    20: 24.99
}
function addTopping(toppingName) {
    pizzaToppings[toppingName].quantity++;
    
    updateOrder();
}

function removeTopping(toppingName) {
    pizzaToppings[toppingName].quantity--;
    
    updateOrder();
}

function generatePizzaPicture() {
    let toppingHtml = '<svg class="pizzaSvg" height="210" width="210">\
        <circle cx="105" cy="105" r="100" stroke="#b5651d" stroke-width="12" fill="beige" />\
        </svg>;'
    for (topping in pizzaToppings) {
        if (pizzaToppings[topping].quantity > 0) {
            toppingHtml += pizzaToppings[topping].svg;
           
        }
        
    }
    $("#toppings").html(toppingHtml);
}

function updateOrder() {
    generatePizzaPicture();
    let size = $("#pizzasize").val();
    let orderHtml = `${size}" pizza = ${basePrices[size]}<br />`;
    let toppingsCost=0;
    for (topping in pizzaToppings) {
        let quantity = pizzaToppings[topping].quantity;
        toppingsCost += quantity;
        let lineMessage = `${topping} x ${quantity} = $${quantity}`;
        if (quantity > 0) {
            orderHtml += lineMessage + "<br />";

        }
    }
    orderHtml += `Total: ${(toppingsCost + basePrices[size]).toFixed(2)}`
    orderHtml += "<br /><button id='addToCart' class='btn btn-primary'>Add to Cart</button>"
    console.log(orderHtml)
    $("#pizzaCost").html(orderHtml);
    
   
}