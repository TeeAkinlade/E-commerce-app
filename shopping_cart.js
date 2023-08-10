const result = JSON.parse(localStorage.getItem('cartItem'));
console.log(result)
let shoppingItem = document.getElementById('shoppingCartItem');
const cart = document.getElementById('cart');

let shoppingCart = [];

const shoppingPage = (shop) =>{
  shop.map(item => {
    let id = item.id;
    let image = item.image;
    let title = item.title;
    let price = item.price;
    let description = item.description;
    let items = {image, title, price, id, description};
    shoppingCart.push(items)    
  })
}
shoppingPage(result);

const render = () => {
  shoppingCart.map(shopItem =>{
  shoppingItem.innerHTML += `
      <div class="cart-item">
        <div class="item-img">
        <img src="${shopItem.image}" alt="" class="product-img">
        </div>
        <div class="cart-details">
            <p class="product-title">${shopItem.title}</p>
            <p class="product-price">$${shopItem.price}</p>
            <p class="product-description">${shopItem.description}</p>
        </div>
        <div id="select-option">
          <select name="size" id="size">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div class="delete">
          <i class="fa-solid fa-xmark" id="deleteIcon" onclick="handleDelete(${shopItem.id})"></i>
        </div>
      </div>`
  })
}

render();
cart.innerHTML = shoppingCart.length;

console.log(shoppingCart)

// ......................remove an item....................
const removeItem = document.querySelectorAll('.fa-xmark');

const handleDelete = (id) =>{
  const filteredData = shoppingCart.filter((result) => result.id !== id);
  localStorage.setItem('cartItem', JSON.stringify(filteredData));
  location.reload();
  cartTotalPrice()
  cart.innerHTML = shoppingCart.length;
}


// summing the total
const subTotal = document.querySelector('.subtotal')
const shippingCost = document.querySelector('.shipping')
const tax = document.querySelector('.tax')
const sumTotal = document.querySelector('.total')

const cartTotalPrice = () =>{
  let totalPrice = shoppingCart.reduce((prices, item) => prices + item.price, 0);
  totalPrice = totalPrice.toFixed(2)
  const shipping = (totalPrice/100).toFixed(2);
  const taxRate = ((totalPrice/100)* 0.4).toFixed(2);
  const total = parseFloat(totalPrice) + parseFloat(shipping) + parseFloat(taxRate);
  const formattedTotal = total.toFixed(2);

  subTotal.innerHTML = `<p class="subtotal">Subtotal</p><p>$${totalPrice}</p>`
  shippingCost.innerHTML = `<p class="shipping">Shipping estimate <span>?</span> </p><p>$${shipping}</p>`
  tax.innerHTML = `<p class="tax">Tax estimate  <span>?</span> </p><p>$${taxRate}</p>`
  sumTotal.innerHTML = `<h4>Order total</h4><p>$${formattedTotal}</p>`
}
cartTotalPrice()
//---------------- to get the total number of item in the shopping cart and display the number of item in cart
localStorage.setItem('CartItem', JSON.stringify(shoppingCart))
const totalCartItem = JSON.parse(localStorage.getItem('CartItem'));

const handlePay = () =>{
  localStorage.setItem('cartItem', JSON.stringify(shoppingCart))
  location.href = "/payment/payment.html"
}