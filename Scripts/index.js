import { products } from "./data/Products.js";
const indexProducts = products;
export function ShowTheProduct(containerSelector, products) {
  document.querySelectorAll(containerSelector).forEach((container) => {
    container.addEventListener("click", () => {
      let productName = container.dataset.containerName;

      const selectedProduct = products
        .flat()
        .find((product) => product.name === productName);

      if (selectedProduct) {
        console.log(`found`);
        localStorage.setItem("selecteditem", JSON.stringify(selectedProduct));
        window.location.href = "../Html websites/Product Display.html";
      } else {
        console.log(`error`);
      }
    });
  });
}

function getRandomItems(products, numberOfItems) {
    products.forEach((category) => {
      category.forEach((product) => {
        product.Image = product.Image.replace("../", "");
      });
    });

  const flatArray = products.flat(); // Flatten the nested array
  const randomItems = [];

  for (let i = 0; i < numberOfItems; i++) {
    const randomIndex = Math.floor(Math.random() * flatArray.length);
    randomItems.push(flatArray[randomIndex]);
    flatArray.splice(randomIndex, 1); // Remove the selected item to avoid duplicates
  }
  return randomItems;
}


//----------------------------------MAIN PROGRAM------------------------------------------------------------------- 
const randomProducts = getRandomItems(indexProducts, 10);
// console.log(randomProducts);

let html = "";
randomProducts.forEach((item) => {
  html += `
            <div class="product-container" data-container-name="${item.name}">
                <div class="product-image-container">
                    <img class="product-image" src="${item.Image}" alt="${
    item.Image
  }">
                </div>
                <div class="product-name-container">
                    <p class="product-name">${item.name}</p>
                    <p>${item.unit}</p>
                    <p>Rs.${(item.price / 100).toFixed(2)}</p>
                </div>
                <div class="add-to-cart-button-container">
                    <button class="add-to-cart-button" data-product-id="${
                      item.id
                    }">
                        ADD TO CART
                    </button>
                </div>  
            </div>
        `;
});
document.getElementById("product-main-container").innerHTML = html;
//Add click event listener to all the product containers to navigate to Product Display page

ShowTheProduct(".product-container",products);
//