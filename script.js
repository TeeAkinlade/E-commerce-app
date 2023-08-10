const url = 'https://fakestoreapi.com/products'
const products = document.querySelector('.shopping');
const cart = document.querySelector('#cart')

//get the id of each product & save them in the local storage then navigate to the details page
const handleSelect = async (id) =>{
  const data = await fetch(url)
  const response = await data.json()
  const item = response.filter(result => result.id === id)
  localStorage.setItem('selectedItem', JSON.stringify(item))
  location.href = "/details-page.html"
}

document.addEventListener('DOMContentLoaded', () =>{
  async function fetchProducts(url){
    let data = await fetch(url)
    let response = await data.json();
    
    for(let i = 0; i < response.length; i++){
      let id = response[i].id
      let description = response[i].description
        description = `${description.length > 50? description.substring(0, 50).concat('...more'): description }`
      let title = response[i].title
        title = `${title.length > 15 ? title.substring(0, 15).concat('...'): title}`
        products.innerHTML +=`
          <div class="products">
              <img src="${response[i].image}" alt="" class="product-img">
              <div id="product">
                <div class ="left-col">
                  <p class="product-title">${title}</p>
                  <p class="product-category">${response[i].category}</p>
                  <p class="product-description"</p>
                </div>
                <div class="right-col">
                  <p class="product-price">$${response[i].price}</p>
                  <button data-productId='${id}' class="buy" onclick="handleSelect(${id})">Buy</button>
                </div>
              </div>
          </div>`
      }
  }
    fetchProducts(url)
    .catch(error =>{
      console.log(`${error}, can't connect to the server`)
    })
})

const totalCartItem = JSON.parse(localStorage.getItem('cartItem'));
cart.innerHTML = totalCartItem === null ? "0" : totalCartItem?.length