let cardsContainer = document.querySelector(".cards-container");
let cartCount = document.querySelector(".cartCount"); 
let cartItems = []; 
let cartItemsList = document.querySelector(".cart-items"); 
let totalPriceElement = document.getElementById("totalPrice"); 

function inpBoxClick(){
  document.querySelector(".headerInp").focus();
}

const updateCartCount = () => {
  cartCount.textContent = cartItems.length;
};

const updateCartDisplay = () => {
  cartItemsList.innerHTML = ''; 
  let totalPrice = 0;

  cartItems.forEach(item => {
    let listItem = document.createElement('li');
    
    listItem.innerHTML = `
      <span>${item.title}</span>
      <div class="quantity-control">
        <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
        <div>${item.quantity}</div>
        <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
        <div>${item.price}/pcs<div>
      </div>
    `;
    cartItemsList.appendChild(listItem);
    
    totalPrice += item.price * item.quantity;
  });

  totalPriceElement.textContent = totalPrice.toFixed(2); // Update the total price
};

const changeQuantity = (productId, delta) => {
  const product = cartItems.find(item => item.id === productId);
  if (product) {
    product.quantity += delta;
    if (product.quantity <= 0) {
      cartItems = cartItems.filter(item => item.id !== productId); // Remove item if quantity is 0
    }
  }
  updateCartDisplay();
};

const addToCart = (product) => {
  const existingProduct = cartItems.find(item => item.id === product.id);
  
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1; 
    cartItems.push(product); 
  }
  
  updateCartCount(); 
  updateCartDisplay(); 
};

// Fetching the product data from the API
const fetchProducts = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();

    products.forEach((product) => {
      let card = document.createElement("div");
      card.classList.add("card");
      
      let productName = document.createElement("div");
      productName.textContent = product.title;
      productName.style.textAlign = "center";
      
      let img = document.createElement("img");
      img.src = product.image;
      img.alt = product.title;
      img.classList.add("cardImg");

      let priceBox = document.createElement("div");
      priceBox.classList.add("priceBox");
      priceBox.innerHTML = `<p>Price: $${product.price}</p>`;

      let button = document.createElement("button");
      button.classList.add("addToCart");
      button.textContent = "Add to cart";
      button.onclick = () => addToCart(product);

      card.appendChild(productName);
      card.appendChild(img);
      card.appendChild(priceBox);
      card.appendChild(button);

      cardsContainer.appendChild(card);
    });
  } catch (err) {
    console.error("Error fetching products:", err);
  }
};

fetchProducts();
