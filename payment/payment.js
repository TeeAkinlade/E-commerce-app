const result = JSON.parse(localStorage.getItem('cartItem'));
let productRow = document.querySelector('.product-row');

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
    productRow.innerHTML += `
      <div class="cart-item">
        <div class="item-img">
        <img src="${shopItem.image}" alt="" class="product-img">
        </div>
        <div class="cart-details">
            <p class="product-title">${shopItem.title}</p>
            <p class="product-price">$${shopItem.price}</p>
            <div id="edit-cart">
                <p>Edit</p>
                <hr>
                <p id="deleteIcon" onclick="handleDelete(${shopItem.id})">Remove</p>
            </div>
      </div>`
  })
}

render();

// ......................remove an item....................
const removeItem = document.querySelectorAll('#fa-xmark');

const handleDelete = (id) =>{
  const filteredData = paymentCart.filter((result) => result.id !== id);
  localStorage.setItem('cartItem', JSON.stringify(filteredData));
  location.reload();
  cartTotalPrice();
}


// summing the total
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
  shippingCost.innerHTML = `<p class="shipping">Shipping estimate </p><p>$${shipping}</p>`
  tax.innerHTML = `<p class="tax">Taxes </p><p>$${taxRate}</p>`
  sumTotal.innerHTML = `<h4>Total</h4><p>$${formattedTotal}</p>`
}
cartTotalPrice()
//---------------- to get the total number of item in the shopping cart and display the number of item in cart
localStorage.setItem('CartItem', JSON.stringify(paymentCart))
const totalCartItem = JSON.parse(localStorage.getItem('CartItem'));
localStorage.setItem('cartItem', JSON.stringify(totalCartItem))


//.................geting input details
const email = document.getElementById('email')
const cardNumber = document.getElementById('cardnumber')
const address = document.getElementById('address')
const city = document.getElementById('city')
const state = document.getElementById('state')
const exp = document.getElementById('exp')

let customerDetails = [];

const handlePay = () =>{
  let emailAddress = email.value;
  let cardDetails = cardNumber.value;
  let houseAddress = address.value;
  let cityDetail = city.value;
  let stateDetail = state.value;
  let expDate = exp.value
  const fullDetails = {emailAddress, cardDetails, houseAddress, cityDetail, stateDetail, expDate}
  customerDetails.push(fullDetails)
  localStorage.setItem('shippingDetails', JSON.stringify(customerDetails));
  const customerShippingDetails = JSON.parse(localStorage.getItem('shippingDetails'));
  localStorage.setItem('shippingDetails', JSON.stringify(customerShippingDetails))
  location.href = "/invoice/invoice.html";
}