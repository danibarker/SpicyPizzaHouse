$('html, body').css({
    overflow: 'hidden',
    height: '100%'
});
$('a').click( function () {
    $('.navbar-collapse').collapse('hide');
    $("section").each((i, obj) => $(obj).removeClass('currentSection'));
    $($(this).attr('href')).addClass('currentSection')
});


let orderItem = {
    item: null,
    price: 0
}
let orderCost = 0;
let size = 14;
let cart = [];
let drinkType;
let wingFlavor;
let itemType;
let pizzaToppings = {
    bacon: {
        quantity: 0,
        svg: toppingImages.bacon
    },
    pepperoni: {
        quantity: 0,
        svg: toppingImages.pepperoni
    },
    pineapple: {
        quantity: 0,
        svg: toppingImages.pineapple
    },
    hotPepper: {
        quantity: 0,
        svg: toppingImages.hotPepper,
    },
}

let basePrices = {
    14: 14.99,
    16: 16.99,
    18: 20.99,
    20: 24.99
}
let wingbasePrices = {
    8: 8.99,
    12: 12.99,
    18: 20.99,
    30: 24.99
}
let drinkBasePrices = {
    '355ml can': 1.59,
    '4 cans': 2.88,
    '2L bottle': 4.25

}
function addTopping(toppingName) {
    pizzaToppings[toppingName].quantity++;
    updateOrder();
}

function removeTopping(toppingName) {
    pizzaToppings[toppingName].quantity--;
    if (pizzaToppings[toppingName].quantity < 0) {
        pizzaToppings[toppingName].quantity = 0;
    }
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
    if (itemType === 'pizza') {
        generatePizzaPicture();
        size = $("#pizzasize").val();
        let orderHtml = `<div class='row justify-content-between'><div class='col lineItem'>${size}" pizza </div><div class='col lineCost'> ${basePrices[size]}</div></div><br />`;
        let toppingsCost = 0;
        for (topping in pizzaToppings) {
            let quantity = pizzaToppings[topping].quantity;
            toppingsCost += quantity;
            let lineMessage = `<div class='row justify-content-between'><div class='col lineItem'>${topping} x ${quantity} </div><div class='col lineCost'> $${quantity}.00</div></div>`;
            if (quantity > 0) {
                orderHtml += lineMessage;

            }
        }
        orderCost = (toppingsCost + basePrices[size]).toFixed(2);
        orderHtml += `<hr><div class='row justify-content-between'><div class='col lineItem'>Total </div><div class='col lineCost'> $${orderCost}</div></div>`
        orderHtml += "<br /><button id='addToCart' onclick='confirmation()' class='btn btn-primary'>Add to Cart</button>"
        $("#pizzaCost").html(orderHtml);
    } else if (itemType === 'wings') {
        size = $("#wingQuantity").val();
        wingFlavor = $("#wingFlavor").val();
        let orderHtml = `<div class='row justify-content-between'><div class='col lineItem'>${size} wings </div><div class='col lineCost'> ${wingbasePrices[size]}</div></div>`;

        orderCost = (wingbasePrices[size]).toFixed(2);
        orderHtml += `<div class='row mt-2 justify-content-between border-top border-dark'><div class='col lineItem'>Total </div><div class='col lineCost'> $${orderCost}</div></div>`
        orderHtml += "<div class='row pt-3 justify-content-between' ><button id='addToCart' onclick='addToCart()' class='btn btn-primary'>Add to Cart</button></div>"
        $("#pizzaCost").html(orderHtml);
    } else {
        size = $('#drinkSize').val();
        drinkType = $('#drinkType').val();
        let orderHtml = `<div class='row justify-content-between'><div class='col lineItem'>${size} </div><div class='col lineCost'> ${drinkBasePrices[size]}</div></div><br />`;
        orderCost = (drinkBasePrices[size]).toFixed(2);
        orderHtml += `<hr><div class='row justify-content-between'><div class='col lineItem'>Total </div><div class='col lineCost'> $${orderCost}</div></div>`
        orderHtml += "<br /><button id='addToCart' onclick='confirmation()' class='btn btn-primary'>Add to Cart</button>"
        $("#pizzaCost").html(orderHtml);
    }
    
    
   
}
function confirmation() {
    let successHtml = 
        `<div class="alert success" onclick="addToCart()">
            <span class="closebtn" >Continue</span>
            Success! Item added to cart<br />
        </div>`;
    $('#pizzaCost').append(successHtml);
    
}
function addToCart() {
    orderItem.size = size;
    if (itemType === 'pizza') {
        orderItem.item = Object.keys(pizzaToppings).map(function (topping) {
            let item = {
                toppingType: topping,
                quantity: pizzaToppings[topping].quantity
            }
            return item;
        })
    } else if (itemType === 'wings') {
        orderItem.item = wingFlavor;
    } else {
        orderItem.item = drinkType;
    }
    
    orderItem.price = orderCost;
    cart.push({ ...orderItem });
    showMenu();
}

function showMenu() {
    Object.keys(pizzaToppings).forEach((topping) => pizzaToppings[topping].quantity = 0);
    $('#order').html(`<h2>Order</h2>
        <div id="card-group" class="row justify-content-center">
            <div class="col-lg-4 center">
                <div onclick="showPizza()" class="card">
                    <img class="card-img-top" src="images/pizza-svgrepo-com.svg" height="200px" alt="Card image cap">
                    <div class="card-body">
                        <h3 class="card-text">Pizza</h3>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div onclick="showWings()" class="card">
                    <img class="card-img-top" src="images/chicken.png" height="200px" alt="Card image cap">
                    <div class="card-body">
                        <h3 class="card-text">Wings</h3>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div onclick="showDrinks()" class="card">
                    <img class="card-img-top m-auto" src="images/drink.png" height="200px" alt="Card image cap">
                    <div class="card-body">
                        <h3 class="card-text">Drinks</h3>
                    </div>
                </div>
            </div>
        </div>`);
}
function showPizza() {
    itemType = "pizza";
    $('#order').html(`<button id='goBack' onclick='showMenu()' class='btn btn-secondary'>Back to Menu</button>
        <h2>Make a Pizza</h2>
        <div class="row">
          <div class="col-3">
            <h3>Options</h3>
            <h4>Size</h4>
            <label for="pizzasize">Choose a size:</label>

            <select onchange="updateOrder()" id="pizzasize">
              <option value=14>14"</option>
              <option value=16>16"</option>
              <option value=18>18"</option>
              <option value=20>20"</option>
            </select>
            <h4>Toppings</h4>
            <div>
             
              Pepperoni <br>
              <button class='btn btn-primary btn-sm' onclick="removeTopping('pepperoni')">Less</button>
              <button class='btn btn-primary btn-sm' onclick="addTopping('pepperoni')">More</button>
            </div>
            <div>
             
              Hot Pepper <br>
              <button class='btn btn-primary btn-sm' onclick="removeTopping('hotPepper')">Less</button>
              <button class='btn btn-primary btn-sm' onclick="addTopping('hotPepper')">More</button>
            </div>
            <div> 
              Pineapple <br>
              <button class='btn btn-primary btn-sm' onclick="removeTopping('pineapple')">Less</button>
              <button class='btn btn-primary btn-sm' onclick="addTopping('pineapple')">More</button>
            </div>
            <div>
             
              Bacon <br>
              <button class='btn btn-primary btn-sm' onclick="removeTopping('bacon')">Less</button>
              <button class='btn btn-primary btn-sm' onclick="addTopping('bacon')">More</button>
            </div>

          </div>
          <div class="col-6">
            <h3>Pizza</h3>
            <div class='pizzaImage'>
                <div id="toppings">
                    <svg class="pizzaSvg" height="210" width="210">
                        <circle cx="105" cy="105" r="100" stroke="#b5651d" stroke-width="12" fill="beige" />
                    </svg>
                </div>
              
              
            </div>
            
          </div>
          <div class="col-3">
            <h3>Make it!</h3>
            <div id='pizzaCost'></div>
          </div>
        </div>`);
    updateOrder();
}

function showWings() {
    itemType = "wings";
    $('#order').html(`<button id='goBack' onclick='showMenu()' class='btn btn-secondary'>Back to Menu</button>
        <h2>Get Wings</h2>
        <div class="row">
          <div class="col-5">
            <h3>Options</h3>
            <h4>Quantity</h4>
            <label for="wingQuantity">Choose a quantity:</label>

            <select onchange="updateOrder()" id="wingQuantity">
              <option value=8>8</option>
              <option value=12>12</option>
              <option value=18>18</option>
              <option value=30>30</option>
            </select>
            <h4>Flavor</h4>
            <label for="wingFlavor">Choose a flavor:</label>

            <select onchange="updateOrder()" id="wingFlavor">
              <option value='Mild'>Mild</option>
              <option value='Medium'>Medium</option>
              <option value='Spicy'>Spicy</option>
              <option value='BBQ'>BBQ</option>
            </select>

          </div>
          <div class="col-5">
            <h3>Make em!</h3>
            <div id='pizzaCost'></div>
          </div>
        </div>`);
    updateOrder();
}

function showDrinks() {
    itemType = "drinks";
    $('#order').html(`<button id='goBack' onclick='showMenu()' class='btn btn-secondary'>Back to Menu</button>
        <h2>Get Drinks</h2>
        <div class="row">
          <div class="col-5">
            <h3>Options</h3>
            <h4>Size</h4>
            <label for="drinkSize">Choose a size:</label>

            <select onchange="updateOrder()" id="drinkSize">
              <option value='355ml can'>355ml can</option>
              <option value='4 cans'>4 cans</option>
              <option value='2L bottle'>2L bottle</option>
            </select>
            <h4>Soda type</h4>
            <label for="drinkType">Choose a soda:</label>

            <select onchange="updateOrder()" id="drinkType">
              <option value='Cola'>Cola</option>
              <option value='Iced Tea'>Iced Tea</option>
              <option value='Diet Cola'>Diet Cola</option>
              <option value='Root Beer'>Root Beer</option>
            </select>

          </div>
          <div class="col-5">
            <h3>Get em!</h3>
            <div id='pizzaCost'></div>
          </div>
        </div>`);
    updateOrder();
}

$("#cartlink").click(function () {
    let total = cart.reduce(function (subtotal, itemPrice) {
        subtotal += +itemPrice.price
        return subtotal;
    }, 3);
    total *= 1.05;
    let cartHtml = '<h2>Cart</h2><div class="container"><div class="row"><div class="col subtotal"><h3>Your Order</h3>';
    for (item of cart) {
        if (typeof item.item == 'object') {
            let itemToppings = item.item
                .filter((topping) => topping.quantity > 0)
                .reduce((display, curTopping) => display += `${curTopping.toppingType} x ${curTopping.quantity}, `, '');
            cartHtml += `<div>${item.size}" Pizza - ${item.price}</div>${itemToppings}<br /><br />`
        } else if (!isNaN(item.size)) {

            cartHtml += `<div>${item.size} ${item.item} wings - ${item.price}</div><br>`;
        } else {
            cartHtml += `<div>${item.size} ${item.item} - ${item.price}</div><br>`;
        }
    }
    cartHtml += `<div>Delivery cost - $3.00</div><br /><div>Total - $${total.toFixed(2)}</div>`
    cartHtml += '</div><div class="col"><h3>Delivery Information</h3>' +`<div class="container mt-3">
                    <form action="action_page.php">

                        <label for="cartname">Name</label><br />
                        <input type="text" id="cartname" name="cartname" placeholder="Your name..">
                        <br />
                        <label for="address">Address</label><br />
                        <input type="text" id="cartaddress" name="cartaddress" width="400" placeholder="Your address.." style="width: 450px;">
                        <br />
                        <label for="cartphone">Phone number</label><br />
                        <input type="text" id="cartphone" name="cartphone"><br />
                        <label for="delivery">Detailed delivery instructions</label><br />
                        <textarea id="delivery" name="delivery" placeholder="eg. Use side door, door bell out of order" style="height:50px; width:100%"></textarea>

                        <input class="btn-sm btn btn-primary"type="submit" value="Submit">

                    </form>
                </div></div></div>`
    $('#cart').html(cartHtml);
});

