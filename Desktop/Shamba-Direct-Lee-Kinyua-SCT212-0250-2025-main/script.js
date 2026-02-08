function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cookieName = name + "=";
    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

function showCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const accepted = getCookie('cookies_accepted');
    
    if (!accepted && banner) {
        setTimeout(() => {
            banner.classList.remove('hidden');
        }, 1000);
    }
}

function acceptCookies() {
    setCookie('cookies_accepted', 'true', 365);
    
    const userId = 'user_' + Math.random().toString(36).substr(2, 9);
    setCookie('user_id', userId, 365);
    
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.classList.add('hidden');
    }
}

const products = [
    { id: 1, name: 'Fresh Cabbage', category: 'vegetables', price: 50, location: 'Kiambu', icon: '🥬', featured: true },
    { id: 2, name: 'Organic Carrots', category: 'vegetables', price: 80, location: 'Nakuru', icon: '🥕', featured: true },
    { id: 3, name: 'Sweet Corn', category: 'vegetables', price: 30, location: 'Meru', icon: '🌽', featured: true },
    { id: 4, name: 'Ripe Tomatoes', category: 'vegetables', price: 60, location: 'Nairobi', icon: '🍅', featured: true },
    { id: 5, name: 'Fresh Avocados', category: 'fruits', price: 15, location: 'Kiambu', icon: '🥑', featured: false },
    { id: 6, name: 'Sweet Mangoes', category: 'fruits', price: 100, location: 'Mombasa', icon: '🥭', featured: false },
    { id: 7, name: 'Fresh Bananas', category: 'fruits', price: 70, location: 'Kisii', icon: '🍌', featured: false },
    { id: 8, name: 'Red Apples', category: 'fruits', price: 150, location: 'Nyeri', icon: '🍎', featured: false },
    { id: 9, name: 'White Maize', category: 'grains', price: 45, location: 'Nakuru', icon: '🌽', featured: false },
    { id: 10, name: 'Red Beans', category: 'grains', price: 120, location: 'Meru', icon: '🫘', featured: false },
    { id: 11, name: 'Brown Rice', category: 'grains', price: 110, location: 'Kisumu', icon: '🍚', featured: false },
    { id: 12, name: 'Fresh Milk', category: 'dairy', price: 60, location: 'Nakuru', icon: '🥛', featured: false },
    { id: 13, name: 'Farm Eggs', category: 'dairy', price: 15, location: 'Kiambu', icon: '🥚', featured: false },
    { id: 14, name: 'Fresh Yogurt', category: 'dairy', price: 80, location: 'Nairobi', icon: '🥛', featured: false },
    { id: 15, name: 'Spinach', category: 'vegetables', price: 40, location: 'Kiambu', icon: '🥬', featured: false }
];

function createProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">KSh ${product.price}</div>
                <div class="product-location">📍 ${product.location}</div>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;
}

function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    const featured = products.filter(p => p.featured);
    container.innerHTML = featured.map(createProductCard).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`${product.name} added to cart!\n\nThis is a demo. Real shopping cart would be implemented with a backend.`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    showCookieBanner();
    const acceptBtn = document.getElementById('accept-cookies');
    if (acceptBtn) {
        acceptBtn.addEventListener('click', acceptCookies);
    }
    loadFeaturedProducts();
});