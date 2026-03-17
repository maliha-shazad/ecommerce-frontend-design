// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.innerHTML = mainNav.classList.contains('active') ? 
                '<i class="fa-solid fa-times"></i>' : 
                '<i class="fa-solid fa-bars"></i>';
        });
    }

    // ===== SEARCH BAR TOGGLE =====
    const searchToggle = document.querySelector('.search-toggle');
    const searchBar = document.querySelector('.search-bar');
    
    if (searchToggle && searchBar) {
        searchBar.style.display = 'none';
        
        searchToggle.addEventListener('click', function() {
            if (searchBar.style.display === 'none') {
                searchBar.style.display = 'flex';
                searchBar.querySelector('input').focus();
            } else {
                searchBar.style.display = 'none';
            }
        });
    }

    // ===== PRODUCT FILTERS =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Here you would filter products
            // For demo, we'll just show an animation
            const products = document.querySelectorAll('.product-card');
            products.forEach(product => {
                product.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    product.style.animation = 'fadeInUp 0.5s ease';
                }, 300);
            });
        });
    });

    // ===== QUICK VIEW MODAL =====
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const modal = document.getElementById('quickViewModal');
    const closeModal = document.querySelector('.close-modal');
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Get product data
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            const productImage = productCard.querySelector('img').src;
            
            // Populate modal
            const modalBody = modal.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div class="quick-view-content">
                    <div class="quick-view-image">
                        <img src="${productImage}" alt="${productTitle}">
                    </div>
                    <div class="quick-view-details">
                        <h2>${productTitle}</h2>
                        <div class="product-rating">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star-half-stroke"></i>
                            <span>(245 reviews)</span>
                        </div>
                        <div class="product-price">
                            <span class="current-price">${productPrice}</span>
                        </div>
                        <p class="product-description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <div class="size-selection">
                            <label>Size:</label>
                            <select>
                                <option>Small</option>
                                <option>Medium</option>
                                <option>Large</option>
                            </select>
                        </div>
                        <div class="quantity-selector">
                            <label>Quantity:</label>
                            <div class="quantity-controls">
                                <button class="quantity-btn">-</button>
                                <input type="number" value="1" min="1">
                                <button class="quantity-btn">+</button>
                            </div>
                        </div>
                        <button class="add-to-cart-btn">
                            <i class="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `;
            
            modal.style.display = 'flex';
        });
    });
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // ===== ADD TO CART FUNCTIONALITY =====
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartCount = document.querySelector('.cart-icon .count');
    let cartTotal = parseInt(cartCount ? cartCount.textContent : 0);
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            cartTotal++;
            if (cartCount) {
                cartCount.textContent = cartTotal;
                cartCount.style.animation = 'pulse 0.3s ease';
                setTimeout(() => {
                    cartCount.style.animation = '';
                }, 300);
            }
            
            // Show success message
            showNotification('Product added to cart!');
        });
    });

    // ===== WISHLIST FUNCTIONALITY =====
    const wishlistBtns = document.querySelectorAll('.add-to-wishlist');
    const wishlistCount = document.querySelector('.wishlist-icon .count');
    let wishlistTotal = parseInt(wishlistCount ? wishlistCount.textContent : 0);
    
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                this.style.color = 'var(--danger)';
                wishlistTotal++;
                showNotification('Added to wishlist!');
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                this.style.color = '';
                wishlistTotal--;
                showNotification('Removed from wishlist!');
            }
            
            if (wishlistCount) {
                wishlistCount.textContent = wishlistTotal;
            }
        });
    });

    // ===== QUANTITY CONTROLS (Dynamic) =====
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quantity-btn')) {
            const input = e.target.parentElement.querySelector('input');
            let value = parseInt(input.value);
            
            if (e.target.textContent === '+') {
                if (value < 10) input.value = value + 1;
            } else if (e.target.textContent === '-') {
                if (value > 1) input.value = value - 1;
            }
        }
    });

    // ===== COUNTDOWN TIMER =====
    function updateCountdown() {
        const timerNumbers = document.querySelectorAll('.timer-number');
        if (timerNumbers.length === 4) {
            // For demo, we'll just decrease seconds
            let seconds = parseInt(timerNumbers[3].textContent);
            if (seconds > 0) {
                seconds--;
                timerNumbers[3].textContent = seconds.toString().padStart(2, '0');
            } else {
                // Reset for demo
                timerNumbers[3].textContent = '30';
            }
        }
    }
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);

    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fa-solid fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        // Add styles dynamically
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--success);
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            animation: slideInRight 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.category-card, .product-card, .service-item, .supplier-card-enhanced').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // ===== STICKY HEADER =====
    let lastScroll = 0;
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            if (currentScroll > lastScroll) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
});

// Add keyframe animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(30px);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);