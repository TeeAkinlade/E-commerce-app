//get date func
const orderDate = document.querySelector('.order-date')
const getCurrentDateAndTime = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.toLocaleString('default', { month: 'long' })
    let yyyy = today.getFullYear();
    return `${mm} ${dd}, ${yyyy}`
    
  }
orderDate.innerHTML +=`<p id ="order-date2">${getCurrentDateAndTime()}</p>`;
// ordering code function
const orderingCode = document.querySelector('.orderNumber')
const randomNUmb = (min, max) => Math.floor(Math.random() * (max - min)) + min;
orderingCode.innerHTML+= (randomNUmb(22222, 99999));

// shipping date
let shippingDate = new Date();
let dd = shippingDate.getDate() + 3;
let mm = shippingDate.toLocaleString('default', { month: 'long' })
let yyyy = shippingDate.getFullYear();
let deliveryDate = `${mm} ${dd}, ${yyyy}`
console.log(deliveryDate)

// geting item from local storage
const result = JSON.parse(localStorage.getItem('cartItem'));
const customerDetails = JSON.parse(localStorage.getItem('shippingDetails'))
const cart = document.getElementById('cart');
let productDetails = document.querySelector('.product-details');

// gettting customer details
  customerDetails.map(customer =>{
    address = customer.houseAddress
    city = customer.cityDetail
    state = customer.stateDetail
    email = customer.emailAddress
    cardNumber = customer.cardDetails
    expirationNumb = customer.expDate
})
const deliveryAddress = document.getElementById('delivery-address')
const cityAddress = document.getElementById('city')
const stateAddress = document.getElementById('state')
const cardNumb = document.getElementById('card-numb')
const exp = document.getElementById('expiration')
deliveryAddress.innerHTML += address;
cityAddress.innerHTML += city
stateAddress.innerHTML += state
cardNumb.innerHTML += cardNumber.substr(-4)
exp.innerHTML += expirationNumb


let paymentCart = [];

const shoppingPage = (shop) =>{
  shop.map(item => {
    let id = item.id;
    let image = item.image;
    let title = item.title;
    let price = item.price;
    let description = item.description;
    let items = {image, title, price, id, description};
    paymentCart.push(items)  
  })
}
shoppingPage(result);

const render = () => {
    paymentCart.map(shopItem =>{
    productDetails.innerHTML += `
      <div class="cart-item">
        <div class="item">
            <div class="item-img">
            <img src="${shopItem.image}" alt="" class="product-img">
            </div>
            <div class="cart-details">
                <h4 class="product-title">${shopItem.title}</h4>
                <h4 class="product-price">$${shopItem.price}</h4>
                <p class="product-description">${shopItem.description}</p>
            </div>
            <div class="details">
                <div id="address">
                    <h4>Delivery address</h4>
                    <p id="house-address">${address}</p>
                    <p id="city">${city}</p>
                    <p id="state">${state}</p>
                </div>
                <div id="edit-address">
                    <h4>Shipping updates</h4>
                    <p id="email-address">${email}</p>
                    <p id="cardNumbers">${cardNumber}</p>
                    <p id="edit">Edit</p>
                </div>
            </div>
        </div>
        <div class="delivery-progress">
            <div class="shipping-date">
                <p class="ship-date">Preparing to ship on ${deliveryDate}</p>
            </div>
            <input type="range" class="range" value = 35>
            <input type="range" class="range2" value = 35>
            <div class="progress">
            <p class="order1">Order placed</p>
            <p class="order1">Processing</p>
            <p>Shipped</p>
            <p>Delivery</p>

      </div>`
  })
}
render();


// total
const subTotal = document.querySelector('.subtotal')
const shippingCost = document.querySelector('.shipping')
const tax = document.querySelector('.tax')
const sumTotal = document.querySelector('.total')

const cartTotalPrice = () =>{
  let totalPrice = paymentCart.reduce((prices, item) => prices + item.price, 0);
  totalPrice = totalPrice.toFixed(2)
  const shipping = (totalPrice/100).toFixed(2);
  const taxRate = ((totalPrice/100)* 0.4).toFixed(2);
  const total = parseFloat(totalPrice) + parseFloat(shipping) + parseFloat(taxRate);
  const formattedTotal = total.toFixed(2);

  subTotal.innerHTML = `<p class="subtotal">Subtotal</p><p>$${totalPrice}</p>`
  shippingCost.innerHTML = `<p class="shipping">Shipping </p><p>$${shipping}</p>`
  tax.innerHTML = `<p class="tax">Tax </p><p>$${taxRate}</p>`
  sumTotal.innerHTML = `<h4>Order total</h4><p id="totalAmount">$${formattedTotal}</p>`
}
cartTotalPrice()
cart.innerHTML = paymentCart.length;
