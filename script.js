let cardsContainer = document.querySelector(".cards-container");

const fetchProducts = async () => {
  try {
    // Fetching the product data from the API
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();

    // Loop through each product to create and append the card
    products.forEach((product) => {
      let card = document.createElement("div");
      card.classList.add("card");

      let productName = document.createElement("div");
      productName.style.textAlign = "center";
      productName.textContent = product.title;

      let img = document.createElement("img");
      img.classList.add("cardImg");
      img.src = product.image;
      img.alt = product.title;

      let priceBox = document.createElement("div");
      priceBox.classList.add("priceBox");
      priceBox.innerHTML = `<p>Price: $${product.price}</p>`;

      let additionalBox = document.createElement("div");
      additionalBox.classList.add("cardAdditionalBox");
      additionalBox.innerHTML = `<p>Rate: ${product.rating.rate}</p><p>Count: ${product.rating.count}</p>`;

      card.appendChild(productName);
      card.appendChild(img);
      card.appendChild(priceBox);
      card.appendChild(additionalBox);

      cardsContainer.appendChild(card);
    });
  } catch (err) {
    console.log("Error we got is", err);
  }
};

fetchProducts();
