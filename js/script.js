// ========== NAVIGATION FUNCTIONS ==========

window.navigateTo = function(url) {
    window.location.href = url;
};

// Set active navigation based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Check for URL parameters
    if (currentPage === 'products.html') {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        if (category) {
            const categoryFilter = document.getElementById('categoryFilter');
            if (categoryFilter) {
                categoryFilter.value = category;
                filterProducts();
            }
        }
    }

    if (currentPage === 'product-details.html') {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (productId) {
            loadProductDetails(productId);
        }
    }

    initializePageContent();
    loadCartCount();
});

// ========== PRODUCT DATABASE ==========

const productDatabase = {
    1: {
        id: 1,
        name: 'Classic White Shirt',
        price: 49.99,
        originalPrice: 69.99,
        category: 'men',
        rating: 4.5,
        reviews: 120,
        description: 'Classic white shirt made from 100% cotton. Perfect for formal and casual occasions.',
        images: [
            'https://via.placeholder.com/500x600',
            'https://via.placeholder.com/500x600/ff6b6b',
            'https://via.placeholder.com/500x600/3498db',
            'https://via.placeholder.com/500x600/2ecc71'
        ],
        colors: ['white', 'black', 'blue', 'gray'],
        sizes: ['S', 'M', 'L', 'XL']
    },
    2: {
        id: 2,
        name: 'Denim Jacket',
        price: 89.99,
        originalPrice: 119.99,
        category: 'men',
        rating: 4.3,
        reviews: 85,
        description: 'Classic denim jacket with a modern fit. Durable and stylish.',
        images: [
            'https://via.placeholder.com/500x600/2c3e50',
            'https://via.placeholder.com/500x600/34495e',
            'https://via.placeholder.com/500x600/7f8c8d'
        ],
        colors: ['blue', 'black', 'gray'],
        sizes: ['S', 'M', 'L', 'XL']
    },
    3: {
        id: 3,
        name: 'Leather Shoes',
        price: 129.99,
        originalPrice: 179.99,
        category: 'footwear',
        rating: 4.7,
        reviews: 200,
        description: 'Genuine leather shoes with comfortable insoles. Perfect for office and parties.',
        images: [
            'https://via.placeholder.com/500x600/8b4513',
            'https://via.placeholder.com/500x600/654321',
            'https://via.placeholder.com/500x600/000000'
        ],
        colors: ['brown', 'black'],
        sizes: ['7', '8', '9', '10', '11']
    },
    4: {
        id: 4,
        name: 'Casual Watch',
        price: 199.99,
        originalPrice: 249.99,
        category: 'accessories',
        rating: 4.6,
        reviews: 150,
        description: 'Stylish casual watch with leather strap. Water resistant.',
        images: [
            'https://via.placeholder.com/500x600/c39bd3',
            'https://via.placeholder.com/500x600/bb8fce',
            'https://via.placeholder.com/500x600/7d3c98'
        ],
        colors: ['brown', 'black'],
        sizes: ['One Size']
    }
};

const allProducts = [
    { id: 1, name: 'Classic White Shirt', price: 49.99, category: 'men', rating: 4.5, image: 'https://via.placeholder.com/250x300' },
    { id: 2, name: 'Denim Jacket', price: 89.99, category: 'men', rating: 4.3, image: 'https://via.placeholder.com/250x300/2c3e50' },
    { id: 3, name: 'Leather Shoes', price: 129.99, category: 'footwear', rating: 4.7, image: 'https://via.placeholder.com/250x300/8b4513' },
    { id: 4, name: 'Casual Watch', price: 199.99, category: 'accessories', rating: 4.6, image: 'https://via.placeholder.com/250x300/c39bd3' },
    { id: 5, name: 'Summer Dress', price: 59.99, category: 'women', rating: 4.4, image: 'https://via.placeholder.com/250x300/ff6b6b' },
    { id: 6, name: 'Sunglasses', price: 39.99, category: 'accessories', rating: 4.2, image: 'https://via.placeholder.com/250x300/3498db' },
    { id: 7, name: 'Backpack', price: 79.99, category: 'accessories', rating: 4.3, image: 'https://via.placeholder.com/250x300/2ecc71' },
    { id: 8, name: 'Running Shoes', price: 149.99, category: 'footwear', rating: 4.8, image: 'https://via.placeholder.com/250x300/e74c3c' }
];

// ========== PAGE INITIALIZATION ==========

function initializePageContent() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'products.html') {
        displayProducts(allProducts);
    } else if (currentPage === 'product-details.html') {
        loadRelatedProducts();
        displayReviews(reviews);
    }
}

// ========== PRODUCT LISTING PAGE FUNCTIONS ==========

function displayProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" onclick="navigateTo('product-details.html?id=${product.id}')">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.rating >= 4.5 ? '<div class="product-badge">Top Rated</div>' : ''}
                <div class="product-overlay">
                    <button class="quick-view" onclick="event.stopPropagation(); navigateTo('product-details.html?id=${product.id}')">Quick View</button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">$${product.price}</p>
                <button class="btn-add-to-cart" onclick="event.stopPropagation(); addToCartFromCard(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const sortBy = document.getElementById('sortFilter').value;
    
    let filteredProducts = [...allProducts];
    
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    if (sortBy === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
        filteredProducts.sort((a, b) => b.id - a.id);
    }
    
    displayProducts(filteredProducts);
}

// ========== PAGINATION ==========

let currentPage = 1;

function changePage(page) {
    if (page === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (page === 'next' && currentPage < 5) {
        currentPage++;
    } else if (typeof page === 'number') {
        currentPage = page;
    }
    
    const pageBtns = document.querySelectorAll('.page-btn');
    pageBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === currentPage.toString()) {
            btn.classList.add('active');
        }
    });
    
    const prevBtn = document.querySelector('.page-btn.prev');
    const nextBtn = document.querySelector('.page-btn.next');
    
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === 5;
    
    const start = (currentPage - 1) * 8;
    const end = start + 8;
    displayProducts(allProducts.slice(start, end));
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== PRODUCT DETAILS PAGE FUNCTIONS ==========

function loadProductDetails(productId) {
    const product = productDatabase[productId];
    if (!product) return;
    
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = `$${product.price}`;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productBreadcrumb').textContent = product.name;
    
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage) mainImage.src = product.images[0];
    
    const thumbnails = document.querySelectorAll('.thumbnail');
    product.images.forEach((img, index) => {
        if (thumbnails[index]) {
            thumbnails[index].src = img;
            thumbnails[index].onclick = () => changeImage(img);
        }
    });
    
    const sizeSelect = document.getElementById('size');
    if (sizeSelect) {
        sizeSelect.innerHTML = '<option value="">Choose a size</option>';
        product.sizes.forEach(size => {
            sizeSelect.innerHTML += `<option value="${size}">${size}</option>`;
        });
    }
}

function loadRelatedProducts() {
    const relatedGrid = document.getElementById('relatedProductsGrid');
    if (!relatedGrid) return;
    
    const related = [...allProducts].sort(() => 0.5 - Math.random()).slice(0, 4);
    
    relatedGrid.innerHTML = related.map(product => `
        <div class="product-card" onclick="navigateTo('product-details.html?id=${product.id}')">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-overlay">
                    <button class="quick-view" onclick="event.stopPropagation(); navigateTo('product-details.html?id=${product.id}')">Quick View</button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">$${product.price}</p>
            </div>
        </div>
    `).join('');
}

// ========== PRODUCT INTERACTIONS ==========

window.changeImage = function(src) {
    const mainImage = document.getElementById('mainProductImage');
    if (!mainImage) return;
    
    mainImage.src = src;
    
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        if (thumb.src === src) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
};

window.selectColor = function(color) {
    const colorDots = document.querySelectorAll('.color-dot');
    colorDots.forEach(dot => {
        if (dot.getAttribute('data-color') === color) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
};

window.decreaseQuantity = function() {
    const quantityInput = document.getElementById('quantity');
    let value = parseInt(quantityInput.value);
    if (value > 1) quantityInput.value = value - 1;
};

window.increaseQuantity = function() {
    const quantityInput = document.getElementById('quantity');
    let value = parseInt(quantityInput.value);
    if (value < 10) quantityInput.value = value + 1;
};

// ========== CART FUNCTIONS ==========

window.addToCartFromCard = function(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1,
        image: `https://via.placeholder.com/100x100`
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartCount();
    animateCart();
    showNotification(`Added ${productName} to cart!`, 'success');
};

window.addToCart = function() {
    const size = document.getElementById('size')?.value;
    const quantity = document.getElementById('quantity')?.value;
    const color = document.querySelector('.color-dot.active')?.getAttribute('data-color');
    const productName = document.getElementById('productName')?.textContent;
    const productPrice = document.getElementById('productPrice')?.textContent.replace('$', '');
    
    if (!size) {
        showNotification('Please select a size!', 'error');
        return;
    }
    
    if (!color) {
        showNotification('Please select a color!', 'error');
        return;
    }
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({
        id: Date.now(),
        name: productName,
        price: parseFloat(productPrice),
        size: size,
        color: color,
        quantity: parseInt(quantity),
        image: document.getElementById('mainProductImage')?.src
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartCount();
    animateCart();
    showNotification(`Added ${quantity} item(s) to cart!`, 'success');
};

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) cartCount.textContent = totalItems;
}

function animateCart() {
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 200);
}

function loadCartCount() {
    updateCartCount();
}

// ========== BUY NOW ==========

window.buyNow = function() {
    const size = document.getElementById('size')?.value;
    
    if (!size) {
        showNotification('Please select a size!', 'error');
        return;
    }
    
    showNotification('Redirecting to checkout...', 'success');
    setTimeout(() => {
        navigateTo('checkout.html');
    }, 1500);
};

// ========== WISHLIST ==========

window.toggleWishlist = function() {
    const btn = document.querySelector('.btn-wishlist');
    const icon = btn.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#ff6b6b';
        showNotification('Added to wishlist!', 'success');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '';
        showNotification('Removed from wishlist!');
    }
    
    btn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 200);
};

// ========== SEARCH FUNCTIONALITY ==========

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        const results = allProducts.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
        
        displaySearchResults(results);
    });

    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

function displaySearchResults(results) {
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No products found</div>';
    } else {
        searchResults.innerHTML = results.map(product => `
            <div class="search-result-item" onclick="selectProduct(${product.id}, '${product.name}')">
                <span class="result-name">${product.name}</span>
                <span class="result-category">${product.category}</span>
                <span class="result-price">$${product.price}</span>
            </div>
        `).join('');
    }
    searchResults.style.display = 'block';
}

window.selectProduct = function(productId, productName) {
    searchInput.value = productName;
    searchResults.style.display = 'none';
    navigateTo(`product-details.html?id=${productId}`);
};

// ========== REVIEWS ==========

const reviews = [
    {
        id: 1,
        name: 'John Doe',
        rating: 5,
        date: '2 days ago',
        comment: 'Great product! The material is high quality and fits perfectly. Highly recommended!',
        avatar: 'https://via.placeholder.com/50x50'
    },
    {
        id: 2,
        name: 'Jane Smith',
        rating: 4.5,
        date: '1 week ago',
        comment: 'Very comfortable and stylish. The delivery was fast and packaging was good.',
        avatar: 'https://via.placeholder.com/50x50'
    },
    {
        id: 3,
        name: 'Mike Johnson',
        rating: 4,
        date: '2 weeks ago',
        comment: 'Good quality for the price. Would definitely buy again.',
        avatar: 'https://via.placeholder.com/50x50'
    }
];

function displayReviews(reviewsToShow) {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) return;
    
    reviewsList.innerHTML = reviewsToShow.map(review => `
        <div class="review-item">
            <div class="reviewer-info">
                <img src="${review.avatar}" alt="${review.name}">
                <div>
                    <h4>${review.name}</h4>
                    <div class="review-stars">
                        ${generateStars(review.rating)}
                    </div>
                </div>
                <span class="review-date">${review.date}</span>
            </div>
            <p class="review-text">${review.comment}</p>
        </div>
    `).join('');
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - rating < 1 && i - rating > 0) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

window.loadMoreReviews = function() {
    const btn = document.querySelector('.btn-load-more');
    btn.textContent = 'Loading...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = 'No more reviews';
        btn.style.opacity = '0.5';
    }, 1000);
};

// ========== NOTIFICATION SYSTEM ==========

function showNotification(message, type = 'info') {
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notificationContainer.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ========== HEADER SCROLL EFFECT ==========

let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.boxShadow = 'var(--shadow)';
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = 'var(--shadow)';
    }

    lastScroll = currentScroll;
});