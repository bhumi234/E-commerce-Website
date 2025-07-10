// Sample Product Data
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'electronics',
    price: 2999,
    rating: 4.5,
    image: 'assets/images/headphones.jpg',
    desc: 'High-quality wireless headphones with noise cancellation and long battery life.'
  },
  {
    id: 2,
    name: 'Smart Watch',
    category: 'electronics',
    price: 4999,
    rating: 4.2,
    image: 'assets/images/smartwatch.jpg',
    desc: 'Track your fitness, notifications, and more with this stylish smart watch.'
  },
  {
    id: 3,
    name: 'Men\'s Jacket',
    category: 'fashion',
    price: 1599,
    rating: 4.0,
    image: 'assets/images/jacket.jpg',
    desc: 'Trendy and comfortable jacket for all seasons.'
  },
  {
    id: 4,
    name: 'Coffee Maker',
    category: 'home',
    price: 2499,
    rating: 4.3,
    image: 'assets/images/coffeemaker.jpg',
    desc: 'Brew the perfect cup every time with this easy-to-use coffee maker.'
  },
  {
    id: 5,
    name: 'Bestselling Novel',
    category: 'books',
    price: 499,
    rating: 4.7,
    image: 'assets/images/book.jpg',
    desc: 'A gripping story that will keep you hooked till the last page.'
  },
  {
    id: 6,
    name: 'Women\'s Handbag',
    category: 'fashion',
    price: 1299,
    rating: 4.1,
    image: 'assets/images/handbag.jpg',
    desc: 'Elegant and spacious handbag for all occasions.'
  },
  {
    id: 7,
    name: 'LED Desk Lamp',
    category: 'home',
    price: 899,
    rating: 4.4,
    image: 'assets/images/desk-lamp.jpg',
    desc: 'Brighten your workspace with this energy-efficient LED lamp.'
  },
  {
    id: 8,
    name: 'Bluetooth Speaker',
    category: 'electronics',
    price: 2199,
    rating: 4.6,
    image: 'assets/images/speaker.jpg',
    desc: 'Portable speaker with deep bass and crystal-clear sound.'
  },
  {
    id: 9,
    name: 'Cookbook',
    category: 'books',
    price: 799,
    rating: 4.0,
    image: 'assets/images/cookbook.jpg',
    desc: 'Delicious recipes from around the world, easy to follow.'
  },
  {
    id: 10,
    name: 'Sofa Throw Blanket',
    category: 'home',
    price: 1499,
    rating: 4.3,
    image: 'assets/images/blanket.jpg',
    desc: 'Soft and cozy throw blanket for your living room.'
  }
];

const productsGrid = document.getElementById('products-grid');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const filterCategory = document.getElementById('filter-category');
const filterPrice = document.getElementById('filter-price');
const filterRating = document.getElementById('filter-rating');
const modal = document.getElementById('product-modal');
const closeBtn = document.querySelector('.close-btn');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalPrice = document.getElementById('modal-price');
const modalRating = document.getElementById('modal-rating');
const modalDesc = document.getElementById('modal-desc');

function renderProducts(list) {
  productsGrid.innerHTML = '';
  if (!list.length) {
    productsGrid.innerHTML = '<div style="color:#ffb347;text-align:center;opacity:0.7;">No products found!</div>';
    return;
  }
  list.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-img" />
      <div class="product-title">${product.name}</div>
      <div class="product-category">${capitalize(product.category)}</div>
      <div class="product-price">₹${product.price.toLocaleString()}</div>
      <div class="product-rating">${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 >= 0.5 ? '½' : ''} (${product.rating})</div>
    `;
    card.onclick = () => openModal(product);
    productsGrid.appendChild(card);
  });
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function filterProducts() {
  let filtered = products.slice();
  // Category
  const cat = filterCategory.value;
  if (cat !== 'all') filtered = filtered.filter(p => p.category === cat);
  // Price
  const price = filterPrice.value;
  if (price !== 'all') {
    const [min, max] = price.split('-').map(Number);
    filtered = filtered.filter(p => p.price >= min && p.price <= max);
  }
  // Rating
  const rating = filterRating.value;
  if (rating !== 'all') filtered = filtered.filter(p => p.rating >= Number(rating));
  // Search
  const q = searchInput.value.trim().toLowerCase();
  if (q) filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  renderProducts(filtered);
}
// Event Listeners
[filterCategory, filterPrice, filterRating].forEach(el => el.addEventListener('change', filterProducts));
searchBtn.addEventListener('click', filterProducts);
searchInput.addEventListener('input', filterProducts);

function openModal(product) {
  modalImg.src = product.image;
  modalTitle.textContent = product.name;
  modalCategory.textContent = 'Category: ' + capitalize(product.category);
  modalPrice.textContent = 'Price: ₹' + product.price.toLocaleString();
  modalRating.innerHTML = 'Rating: ' + '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '½' : '') + ` (${product.rating})`;
  modalDesc.textContent = product.desc;
  modal.classList.add('active');
}
if (closeBtn) closeBtn.onclick = () => modal.classList.remove('active');
window.addEventListener('click', function(e) {
  if (e.target === modal) modal.classList.remove('active');
});

// Initial render
renderProducts(products);
