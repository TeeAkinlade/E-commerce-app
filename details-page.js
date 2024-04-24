let data = JSON.parse(localStorage.getItem('selectedItem'));
let cartArr = JSON.parse(localStorage.getItem('cartItem'));
const cart = document.querySelector('#cart')

let productInformation = document.querySelector('.detail-info')

const products = data.map(product => {
  const ratings = Math.ceil(product.rating.rate);
  let stars = [];
  let starsArr;

  for(let i = 1; i <= ratings; i++){
    stars.push('<i class="fa-solid fa-star"></i>')
    // if(ratings.length < 5){
    //   stars.appendChild('<i class="fa-solid fa-star"></i>')
    // }
  }

  for(let i = 0; i <= stars.length; i++){
    starsArr = stars[i];
  }

  productInformation.innerHTML +=  `<div class="detail">
                                      <div class="product-image">
                                        <h2>${product.category.toUpperCase()}</h2>
                                        <img src="${product.image}" alt=""/>
                                      </div>
                                      <div class="product-detail">
                                          <div class="product-title-price">
                                            <h2 class="title">${product.title}</h2>
                                            <p class="price">$${product.price}</p>
                                          </div>
                                          <div class="rating">
                                              <p class="rate">Rating:${product.rating.rate}</p>
                                              <p class="rate">Count:${product.rating.count}</p>
                                              <p>
                                                  ${ratings === 2 ? `<i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i>` : ratings === 3 ? `<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`: ratings === 4 ? `<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`:`<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`}
                                                  <span class="count">See all 512 reviews</span>
                                              </p>
                                          </div>
                                          <div class="product-color">
                                              <p>Color</p>
                                              <div class="color">
                                                  <div class="colorDiv selected"></div>
                                                  <div class="colorDiv"></div>
                                              </div>
                                          </div>
                                          <div class="product-size">
                                              <div class="size-title">
                                                  <p>Size</p>
                                                  <p>See sizing chart</p>
                                              </div>
                                                  <div class="sizes">
                                                  <p>XXS</p>
                                                  <p>XS</p>
                                                  <p>S</p>
                                                  <p class="selected-size">M</p>
                                                  <p>L</p>
                                                  <p>XL</p>
                                              </div>
                                          </div>
                                          <div class="add-cart">
                                              <button class="add-to-cart" id="addToCart">Add to cart</button>
                                          </div>
                                          <div class="product-description">
                                              <p class="description-title">Description</p>
                                              <div class="descript">
                                                <p>${product.description}</p>
                                              <div>
                                          </div>
                                      </div>
                                  </div>`
})

//cart
const shoppingCart = document.getElementById('addToCart')

shoppingCart.addEventListener('click', () =>{
  if(cartArr === null){
    localStorage.setItem('cartItem', JSON.stringify(data))
  }else if(cartArr.length !== 0){
    const newArr = [...cartArr, data[0]]
    localStorage.setItem('cartItem', JSON.stringify(newArr))
  }
  if(shoppingCart.innerHTML === "Add to cart"){
    shoppingCart.innerHTML = "Selected"
  } else {
    shoppingCart.innerHTML = "Add to cart"
  }
  const totalCartItem = JSON.parse(localStorage.getItem('cartItem'));
  cart.innerHTML = totalCartItem === null ? "0" : totalCartItem?.length
})

const totalCartItem = JSON.parse(localStorage.getItem('cartItem'));
cart.innerHTML = totalCartItem === null ? "0" : totalCartItem?.length
