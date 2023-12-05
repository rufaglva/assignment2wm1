document.addEventListener("DOMContentLoaded", () => {
  const productDetail = document.getElementById('productDetail');
  const imageGallery = document.getElementById('imageGallery');

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  fetch(`https://dummyjson.com/products/${productId}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(product => {
          if (product) {
              // Display product details
              const productDiv = document.createElement('div');
              productDiv.innerHTML = `
                  <h2>${product.title || 'Product Name Unavailable'}</h2>
                  <p>Description: ${product.description}</p>
                  <p>Price: $${product.price}</p>
              `;
              productDetail.appendChild(productDiv);

              // Display image gallery
              if (product.images && product.images.length > 0) {
                  product.images.forEach(imageUrl => {
                      const imageElement = document.createElement('img');
                      imageElement.src = imageUrl;
                      imageGallery.appendChild(imageElement);
                  });
              } else {
                  imageGallery.innerHTML = '<p>No images available.</p>';
              }
          } else {
              console.error('Product data not found');
              productDetail.innerHTML = '<p>Product details not available.</p>';
          }
      })
      .catch(error => {
          console.error('There was a problem fetching the product data:', error);
          productDetail.innerHTML = '<p>Failed to fetch product details. Please try again later.</p>';
      });
});
