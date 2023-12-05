document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById('productList');
  const search = document.getElementById('search');
  const categoryfltr = document.getElementById('categoryfltr');

  let productsData = []; 

  const renderProducts = () => {
    const searchTerm = search.value.toLowerCase().trim();
    const selectedCategory = categoryfltr.value.toLowerCase().trim();

    const filteredProducts = productsData.filter(product => {
      const isInSearch = 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm);
      const isInCategory = selectedCategory === '' || product.category.toLowerCase() === selectedCategory;
      
      return isInSearch && isInCategory;
    });

    renderProductList(filteredProducts);
  };

  const renderProductList = (products) => {
    productList.innerHTML = ''; 

    if (products.length === 0) {
      productList.innerHTML = '<p>No matching products found.</p>';
    } else {
      products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item'); 
        productDiv.innerHTML = `
          <h2>${product.title || 'Product Name Unavailable'}</h2>
          <img src=${product.thumbnail} data-id="${product.id}" class="product-image" />
          <p>Description: ${product.description}</p>
          <p>Category: ${product.category}</p>
          <p>Price: $${product.price}</p>
        `;
        productList.appendChild(productDiv);
      });
    }
  };

  const navigateToProductDetail = (productId) => {
    window.location.href = `productDetail.html?id=${productId}`;
  };

  fetch('https://dummyjson.com/products?limit=100')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data && Array.isArray(data.products)) {
        productsData = data.products; 
        renderProductList(productsData);

        productList.addEventListener('click', (event) => {
          const clickedElement = event.target;
          if (clickedElement.classList.contains('product-image')) {
            const productId = clickedElement.getAttribute('data-id');
            navigateToProductDetail(productId);
          }
        });

        const categories = [...new Set(productsData.map(product => product.category))];
        categories.forEach(category => {
          const option = document.createElement('option');
          option.value = category.toLowerCase();
          option.textContent = category;
          categoryfltr.appendChild(option);
        });

        search.addEventListener('input', renderProducts);
        categoryfltr.addEventListener('change', renderProducts);
      } else {
        console.error('Data is not in the expected format:', data);
        productList.innerHTML = '<p>Unexpected data format. Please try again later.</p>';
      }
    })
    .catch(error => {
      console.error('There was a problem fetching the data:', error);
      productList.innerHTML = '<p>Failed to fetch data. Please try again later.</p>';
    });
});
