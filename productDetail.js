document.addEventListener("DOMContentLoaded", () => {
  const productDetail = document.getElementById('productDetail');
  const Gallery = document.getElementById('Gallery');

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
              const productDiv = document.createElement('div');
              productDiv.innerHTML = `
                  <h2>${product.title || 'Product Name Unavailable'}</h2>
                  <p>Description: ${product.description}</p>
                  <p>Price: $${product.price}</p>
              `;
              productDetail.appendChild(productDiv);

              
              if (product.images && product.images.length > 0) {
                  product.images.forEach(imageUrl => {
                      const imageElement = document.createElement('img');
                      imageElement.src = imageUrl;
                      Gallery.appendChild(imageElement);
                  });
              } else {
                  Gallery.innerHTML = '<p>No images available,sorry.</p>';
              }
          } else {
              console.error('Product data not found');
              productDetail.innerHTML = '<p>Product details are not available.</p>';
          }
      })
      .catch(error => {
          console.error('There was a problem fetching the product data:', error);
          productDetail.innerHTML = '<p>Failed to fetch product details. Please try again later.</p>';
      });
});
