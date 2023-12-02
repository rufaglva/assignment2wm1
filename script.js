document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("productList");
    const errorMessage = document.getElementById("errorMessage");

    fetch("https://dummyjson.com/products")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Received data:", data); 
            if (Array.isArray(data) && data.length > 0 && data[0].hasOwnProperty("name")) {
                
                data.forEach(product => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `${product.name} - $${product.price}`;
                    productList.appendChild(listItem);
                });
            } else {
                throw new Error("Invalid data format received.");
            }
        })
        .catch(error => {
            
            errorMessage.textContent = `Error: ${error.message}`;
        });
});
