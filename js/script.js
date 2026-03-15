// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== SEARCH BAR FUNCTIONALITY ==========
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    
    // Sample product database for search
    const products = [
        { name: 'Classic White Shirt', category: 'Men', price: 49.99 },
        { name: 'Denim Jacket', category: 'Men', price: 89.99 },
        { name: 'Leather Shoes', category: 'Footwear', price: 129.99 },
        { name: 'Casual Watch', category: 'Accessories', price: 199.99 },
        { name: 'Summer Dress', category: 'Women', price: 59.99 },
        { name: 'Sunglasses', category: 'Accessories', price: 39.99 },
        { name: 'Backpack', category: 'Accessories', price: 79.99 },
        { name: 'Running Shoes', category: 'Footwear', price: 149.99 },
        { name: 'Black T-Shirt', category: 'Men', price: 29.99 },
        { name: 'Handbag', category: 'Women', price: 89.99 }
    ];

    // Search function
    function performSearch(query) {
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        const results = products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );
        
        displaySearchResults(results);
    }

    // Display search results
    function displaySearchResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No products found</div>';
        } else {
            searchResults.innerHTML = results.map(product => `
                <div class="search-result-item" onclick="selectProduct('${product.name}')">
                    <span class="result-name">${product.name}</span>
                    <span class="result-category">${product.category}</span>
                    <span class="result-price">$${product.price}</span>
                </div>
            `).join('');
        }
        searchResults.style.display = 'block';
    }

    // Search input event
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            performSearch(e.target.value);
        });

        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }

    // Search button click
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
    }

    // ========== SIZE DROPDOWN FUNCTIONALITY ==========
    const sizeDropdown = document.getElementById('size');
    
    if (sizeDropdown) {
        sizeDropdown.addEventListener('change', function() {
            const selectedSize = this.value;
            if (selectedSize) {
                showNotification(`Selected size: ${selectedSize}`);
                // You can add more functionality here
                // Like updating price, checking stock, etc.
            }
        });
    }

    // ========== COLOR SELECTION ==========
    const colorDots = document.querySelectorAll('.color-dot');
    
    colorDots.forEach(dot => {
        dot.addEventListener('click', function() {
            // Remove active class from all dots
            colorDots.forEach(d => d.classList.remove('active'));
            // Add active class to clicked dot
            this.classList.add('active');
            
            const selectedColor = this.getAttribute('data-color');
            showNotification(`Selected color: ${selectedColor}`);
            
            // You can change the main image based on color here
            // changeProductImage(selectedColor);
        });
    });

    // ========== QUANTITY CONTROLS ==========
    window.decreaseQuantity = function() {
        const quantityInput = document.getElementById('quantity');
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    };

    window.increaseQuantity = function() {
        const quantityInput = document.getElementById('quantity');
        let value = parseInt(quantityInput.value);
        if (value < 10) {
            quantityInput.value = value + 1;
        }
    };

    // ========== ADD TO CART FUNCTION ==========
    window.addToCart = function() {
        const size = document.getElementById('size')?.value;
        const quantity = document.getElementById('quantity')?.value;
        const color = document.querySelector('.color-dot.active')?.getAttribute('data-color');
        
        // Validation
        if (!size) {
            showNotification('Please select a size!', 'error');
            return;
        }
        
        if (!color) {
            showNotification('Please select a color!', 'error');
            return;
        }
        
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        let currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount + parseInt(quantity);
        
        // Animate cart icon
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 200);
        
        // Show success message
        showNotification(`Added ${quantity} item(s) to cart!`, 'success');
        
        // You can save to localStorage here
        saveToCart(size, quantity, color);
    };

    // ========== BUY NOW FUNCTION ==========
    window.buyNow = function() {
        const size = document.getElementById('size')?.value;
        const quantity = document.getElementById('quantity')?.value;
        
        if (!size) {
            showNotification('Please select a size!', 'error');
            return;
        }
        
        showNotification('Redirecting to checkout...', 'success');
        // Redirect to checkout page
        // window.location.href = 'checkout.html';
    };

    // ========== NOTIFICATION SYSTEM ==========
    function showNotification(message, type = 'info') {
        // Check if notification container exists
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
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // ========== SAVE TO CART (localStorage) ==========
    function saveToCart(size, quantity, color) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        const item = {
            id: Date.now(),
            name: 'Classic White Shirt',
            size: size,
            color: color,
            quantity: parseInt(quantity),
            price: 49.99,
            image: 'https://via.placeholder.com/100x100'
        };
        
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // ========== LOAD CART COUNT ON PAGE LOAD ==========
    function loadCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = totalItems;
        }
    }

    // ========== WISHLIST FUNCTIONALITY ==========
    const wishlistBtn = document.querySelector('.btn-wishlist');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
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
            
            // Add heart beat animation
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // ========== PRODUCT IMAGE GALLERY ==========
    window.changeImage = function(src) {
        const mainImage = document.getElementById('mainProductImage');
        if (mainImage) {
            mainImage.src = src;
            
            // Update thumbnail active state
            const thumbnails = document.querySelectorAll('.thumbnail');
            thumbnails.forEach(thumb => {
                if (thumb.src === src) {
                    thumb.classList.add('active');
                } else {
                    thumb.classList.remove('active');
                }
            });
        }
    };

    // ========== REVIEW LOAD MORE ==========
    const loadMoreBtn = document.querySelector('.btn-load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more reviews
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                // Add more reviews here
                this.textContent = 'No more reviews';
                this.style.opacity = '0.5';
                this.disabled = true;
            }, 1500);
        });
    }

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========== HEADER SCROLL EFFECT ==========
    let lastScroll = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            return;
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }

        lastScroll = currentScroll;
    });

    // Initialize
    loadCartCount();
});

// ========== GLOBAL FUNCTION FOR PRODUCT SELECTION ==========
window.selectProduct = function(productName) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = productName;
    }
    
    document.getElementById('searchResults').style.display = 'none';
    showNotification(`Searching for: ${productName}`);
    
    // Redirect to product page or search results
    // window.location.href = `search-results.html?q=${encodeURIComponent(productName)}`;
};