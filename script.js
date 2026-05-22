// ===== CONSTANTES =====
const MENU_DATA_URL = 'menu-data.json';

// ===== ELEMENTOS DEL DOM =====
const pizzaGrid = document.getElementById('pizzaGrid');
const empanadonesList = document.getElementById('empanadonesList');
const calzoneList = document.getElementById('calzoneList');
const fainaList = document.getElementById('fainaList');
const gaseosasList = document.getElementById('gaseosasList');
const cervezasList = document.getElementById('cervezasList');
const tragosList = document.getElementById('tragosList');

const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');

const navLinks = document.querySelectorAll('.nav-link');

// ===== DATOS DEL MENÚ =====
let menuData = null;

// ===== UTILIDADES =====
function formatPrice(price) {
    if (!price) return 'Consultar';
    return `$${price.toLocaleString('es-AR')}`;
}

function parseBebidaNombre(nombre) {
    const match = nombre.match(/^(.+?)\s+(\d+(?:\.\d+)?(?:cc|ml|L))\s*$/i);
    if (match) return { main: match[1].trim(), vol: match[2] };
    return { main: nombre, vol: null };
}

function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

// ===== RENDERIZADO =====
function renderPizzas(pizzas) {
    pizzaGrid.innerHTML = pizzas.map(pizza => `
        <div class="pizza-card" data-name="${normalizeText(pizza.nombre)}" data-ingredients="${normalizeText(pizza.ingredientes)}">
            <h3 class="pizza-name">${pizza.nombre}</h3>
            <p class="pizza-ingredients">${pizza.ingredientes}</p>
            <div class="pizza-prices">
                <div class="price-item">
                    <div class="price-label">Grande</div>
                    <div class="price-value">${formatPrice(pizza.precio.grande)}</div>
                </div>
                <div class="price-item">
                    <div class="price-label">Chica</div>
                    <div class="price-value">${formatPrice(pizza.precio.chica)}</div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderEmpanadones(empanadones) {
    empanadonesList.innerHTML = empanadones.map(emp => `
        <div class="empanada-item">
            <span class="item-name">${emp.sabor}</span>
            <span class="item-price">${formatPrice(emp.precio)}</span>
        </div>
    `).join('');
}

function renderCalzone(calzones) {
    calzoneList.innerHTML = calzones.map(calzone => `
        <div class="calzone-item">
            <div>
                <div class="item-name">${calzone.nombre}</div>
                <div class="item-ingredients">${calzone.ingredientes}</div>
            </div>
            <span class="item-price">${formatPrice(calzone.precio)}</span>
        </div>
    `).join('');
}

function renderFaina(fainas) {
    fainaList.innerHTML = fainas.map(faina => `
        <div class="faina-item">
            <span class="item-name">${faina.nombre}</span>
            <span class="item-price">${formatPrice(faina.precio)}</span>
        </div>
    `).join('');
}

function renderBebidas(bebidas) {
    const renderItem = (bebida) => {
        const { main, vol } = parseBebidaNombre(bebida.nombre);
        return `
            <div class="bebida-item">
                <span class="bebida-name">${main}${vol ? `<small>${vol}</small>` : ''}</span>
                <span class="bebida-price">${formatPrice(bebida.precio)}</span>
            </div>
        `;
    };

    gaseosasList.innerHTML = bebidas.gaseosas.map(renderItem).join('');
    cervezasList.innerHTML = bebidas.cervezas.map(renderItem).join('');
    const tragosVinos = [...bebidas.tragos, ...bebidas.vinos];
    tragosList.innerHTML = tragosVinos.map(renderItem).join('');
}

// ===== CARGA DE DATOS =====
async function loadMenuData() {
    try {
        const response = await fetch(MENU_DATA_URL);
        if (!response.ok) throw new Error('Error al cargar el menú');
        
        menuData = await response.json();
        
        // Renderizar todo
        renderPizzas(menuData.menu.pizzas);
        renderEmpanadones(menuData.menu.empanadones);
        renderCalzone(menuData.menu.calzone);
        renderFaina(menuData.menu.faina);
        renderBebidas(menuData.menu.bebidas);
        
    } catch (error) {
        console.error('Error cargando el menú:', error);
        pizzaGrid.innerHTML = '<p style="text-align: center; color: var(--gris);">Error al cargar el menú. Por favor, recarga la página.</p>';
    }
}

// ===== BUSCADOR =====
function toggleSearch() {
    searchBar.classList.toggle('active');
    if (searchBar.classList.contains('active')) {
        searchInput.focus();
    } else {
        searchInput.value = '';
        filterPizzas('');
    }
}

function filterPizzas(query) {
    const normalizedQuery = normalizeText(query);
    const pizzaCards = document.querySelectorAll('.pizza-card');
    
    pizzaCards.forEach(card => {
        const name = card.getAttribute('data-name');
        const ingredients = card.getAttribute('data-ingredients');
        
        if (name.includes(normalizedQuery) || ingredients.includes(normalizedQuery)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// ===== NAVEGACIÓN =====
function updateActiveNav() {
    const sections = document.querySelectorAll('.menu-section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== EVENT LISTENERS =====
searchToggle.addEventListener('click', toggleSearch);
searchClose.addEventListener('click', toggleSearch);

searchInput.addEventListener('input', (e) => {
    filterPizzas(e.target.value);
});

// Cerrar búsqueda con Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchBar.classList.contains('active')) {
        toggleSearch();
    }
});

// Actualizar nav activo al hacer scroll
window.addEventListener('scroll', updateActiveNav);

// Smooth scroll al hacer click en nav
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    loadMenuData();
});
