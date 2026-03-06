/* ============================================
   TECH CATALOG – Main Application Logic
   ============================================ */

const DATA_URL = './data/productos.json';

// ---------- DOM References ----------
const productGrid    = document.getElementById('product-grid');
const searchInput    = document.getElementById('search-input');
const productCount   = document.getElementById('product-count');

// ---------- State ----------
let allProducts = [];

// ---------- Fetch & Render ----------
async function init() {
  try {
    const res  = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    allProducts = await res.json();
    renderProducts(allProducts);
  } catch (err) {
    console.error('Error al cargar los productos:', err);
    productGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">⚠️</div>
        <h3 class="empty-state__title">Error al cargar el catálogo</h3>
        <p class="empty-state__text">Comprueba que el archivo <strong>data/productos.json</strong> existe y es válido.</p>
      </div>`;
  }
}

// ---------- Render ----------
function renderProducts(products) {
  if (products.length === 0) {
    productGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">🔍</div>
        <h3 class="empty-state__title">Sin resultados</h3>
        <p class="empty-state__text">No se encontraron productos que coincidan con tu búsqueda.</p>
      </div>`;
    productCount.textContent = '0 productos encontrados';
    return;
  }

  productCount.textContent = `${products.length} producto${products.length !== 1 ? 's' : ''} encontrado${products.length !== 1 ? 's' : ''}`;

  productGrid.innerHTML = products.map(p => `
    <article class="card" data-id="${p.id}">
      <div class="card__image-wrapper">
        <img
          class="card__image"
          src="${p.foto}"
          alt="${p.titulo}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/400x300/12121a/6b7280?text=Imagen+no+disponible';"
        />
      </div>
      <div class="card__body">
        <h2 class="card__title">${p.titulo}</h2>
        <p class="card__description">${p.descripcion}</p>
        <div class="card__colors">
          ${p.colores.map(c => `<span class="card__color-tag">${c}</span>`).join('')}
        </div>
        <div class="card__footer">
          <div>
            <span class="card__price-label">Precio</span>
            <div class="card__price">$${p.precio.toLocaleString('en-US')}</div>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

// ---------- Search ----------
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim().toLowerCase();
  const filtered = allProducts.filter(p =>
    p.titulo.toLowerCase().includes(query)
  );
  renderProducts(filtered);
});

// ---------- Boot ----------
document.addEventListener('DOMContentLoaded', init);
