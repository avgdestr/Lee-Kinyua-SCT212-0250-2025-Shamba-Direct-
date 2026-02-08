let allProducts = [];
let filteredProducts = [];

function initProducts() {
    allProducts = products;
    filteredProducts = [...allProducts];
    renderProducts();
    updateCount();
    setupFilters();
}

function setupFilters() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const categoryFilter = document.getElementById('category-filter');
    const locationFilter = document.getElementById('location-filter');
    const sortFilter = document.getElementById('sort-filter');
    const clearBtn = document.getElementById('clear-filters');
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', applyFilters);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (locationFilter) {
        locationFilter.addEventListener('change', applyFilters);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', applySort);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearFilters);
    }
}
function applyFilters() {
    const searchText = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const location = document.getElementById('location-filter').value;
    filteredProducts = [...allProducts];
    if (searchText) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchText) ||
            p.category.toLowerCase().includes(searchText) ||
            p.location.toLowerCase().includes(searchText)
        );
    }
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    if (location !== 'all') {
        filteredProducts = filteredProducts.filter(p => 
            p.location.toLowerCase() === location.toLowerCase()
        );
    }
    applySort();
    renderProducts();
    updateCount();
}

function applySort() {
    const sort = document.getElementById('sort-filter').value;
    switch(sort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        case 'featured':
        default:
            filteredProducts.sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return 0;
            });
    }
    renderProducts();
}

function renderProducts() {
    const grid = document.getElementById('products-grid');
    const noResults = document.getElementById('no-results');
    if (!grid) return;
    if (filteredProducts.length === 0) {
        grid.classList.add('hidden');
        if (noResults) noResults.classList.remove('hidden');
        return;
    }
    grid.classList.remove('hidden');
    if (noResults) noResults.classList.add('hidden');
    grid.innerHTML = filteredProducts.map(createProductCard).join('');
}

function updateCount() {
    const count = document.getElementById('results-count');
    if (!count) return;
    const showing = filteredProducts.length;
    const total = allProducts.length;
    if (showing === total) {
        count.textContent = `Showing all ${total} products`;
    } else {
        count.textContent = `Showing ${showing} of ${total} products`;
    }
}

function clearFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('category-filter').value = 'all';
    document.getElementById('location-filter').value = 'all';
    document.getElementById('sort-filter').value = 'featured';
    filteredProducts = [...allProducts];
    applySort();
    renderProducts();
    updateCount();
}

function checkURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        document.getElementById('category-filter').value = category;
        applyFilters();
    }
}

if (document.getElementById('products-grid')) {
    document.addEventListener('DOMContentLoaded', function() {
        initProducts();
        checkURL();
    });
}