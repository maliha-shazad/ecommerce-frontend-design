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

    loadCartCount();
});

// ========== SEARCH FUNCTIONALITY (Updated for suppliers) ==========
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Sample supplier database
const suppliers = [
    { name: 'koko.com', country: 'UAE', region: 'Dubai', category: 'Electronics' },
    { name: 'bananay.com', country: 'China', region: 'Shanghai', category: 'Electronics' },
    { name: 'emrsaj.com', country: 'UAE', region: 'Dubai', category: 'Textiles' },
    { name: 'snowball.com', country: 'Denmark', region: 'Copenhagen', category: 'Food' },
    { name: 'shugaf.com', country: 'France', region: 'Paris', category: 'Fashion' },
    { name: 'livelife.com', country: 'Greenland', region: 'Nuuk', category: 'Seafood' },
    { name: 'happycoc.com', country: 'Italy', region: 'Milan', category: 'Fashion' },
    { name: 'oidbh.com', country: 'Russia', region: 'Moscow', category: 'Energy' }
];

if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        
        if (query.length < 2) {
            if (searchResults) searchResults.style.display = 'none';
            return;
        }
        
        const results = suppliers.filter(supplier => 
            supplier.name.toLowerCase().includes(query) ||
            supplier.country.toLowerCase().includes(query) ||
            supplier.region.toLowerCase().includes(query) ||
            supplier.category.toLowerCase().includes(query)
        );
        
        displaySearchResults(results);
    });

    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults?.contains(e.target)) {
            if (searchResults) searchResults.style.display = 'none';
        }
    });
}

function displaySearchResults(results) {
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No suppliers found</div>';
    } else {
        searchResults.innerHTML = results.map(supplier => `
            <div class="search-result-item" onclick="selectSupplier('${supplier.name}')">
                <span class="result-name">${supplier.name}</span>
                <span class="result-category">${supplier.country}</span>
                <span class="result-price">${supplier.region}</span>
            </div>
        `).join('');
    }
    searchResults.style.display = 'block';
}

window.selectSupplier = function(supplierName) {
    if (searchInput) searchInput.value = supplierName;
    if (searchResults) searchResults.style.display = 'none';
    showNotification(`Viewing supplier: ${supplierName}`);
};

// ========== CART FUNCTIONS ==========
function loadCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) cartCount.textContent = totalItems;
}

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
        if (header) header.style.boxShadow = 'var(--shadow)';
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        if (header) header.style.transform = 'translateY(-100%)';
    } else {
        if (header) {
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = 'var(--shadow)';
        }
    }

    lastScroll = currentScroll;
});