// js/ui.js
import { COFFEE_CATALOG, SHIPPING_RATES } from './data.js';
import { getEurExchangeRate } from './api.js';

let recommendedClimateType = "warm"; // Por defecto "warm" (caliente) si la API falla o está cargando
let cart = [];
let eurRate = 0.92; // Tasa de cambio por defecto

// Carga la tasa real al iniciar
getEurExchangeRate().then(rate => eurRate = rate);

/**
 * Renderiza el catálogo filtrando de manera inteligente según el clima actual de Quito
 */
export const renderCatalog = (filterText = "", originFilter = "all") => {
  const container = document.getElementById('catalog-container');
  if (!container) return;

  // Filtros dinámicos usando filter()
  const filteredList = COFFEE_CATALOG.filter(({ name, origin, type }) => {
    const matchesSearch = name.toLowerCase().includes(filterText.toLowerCase());
    const matchesOrigin = originFilter === "all" || origin === originFilter;
    
    // Si el usuario no ha escrito nada en la barra de búsqueda ni filtrado por país,
    // aplicamos la recomendación inteligente según el clima de Quito.
    const matchesClimateRecommendation = (filterText === "" && originFilter === "all") 
      ? type === recommendedClimateType 
      : true;

    return matchesSearch && matchesOrigin && matchesClimateRecommendation;
  });

  // Crear banner informativo de la sugerencia actual
  const climateBannerHTML = (filterText === "" && originFilter === "all") ? `
    <div class="climate-suggestion-banner" style="grid-column: 1 / -1; margin-bottom: 1rem;">
      📌 ${recommendedClimateType === "warm" 
        ? "<strong>¡Hace frío en Quito!</strong> Te sugerimos nuestras bebidas calientes para abrigarte." 
        : "<strong>¡Qué buen clima en Quito!</strong> Te sugerimos refrescarte con nuestras bebidas frías."}
    </div>
  ` : "";

  if (filteredList.length === 0) {
    container.innerHTML = `<p class="no-results">No encontramos cafés que coincidan con tu búsqueda. ☕</p>`;
    return;
  }

  // Renderizamos las tarjetas dinámicas
  container.innerHTML = climateBannerHTML + filteredList.map(({ id, name, origin, notes, price, image }) => `
    <article class="coffee-card" aria-label="Café ${name}">
      <img src="${image}" alt="${name}" class="coffee-img" />
      <div class="coffee-info">
        <h3>${name}</h3>
        <p class="origin">📌 Origen: ${origin}</p>
        <p class="notes"><em>"${notes}"</em></p>
        <p class="price">$${price.toFixed(2)} USD</p>
        <button class="btn-add" data-id="${id}">Agregar al Pedido</button>
      </div>
    </article>
  `).join('');

  // Eventos para agregar al carrito
  container.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const coffeeId = parseInt(e.target.dataset.id);
      const selectedCoffee = COFFEE_CATALOG.find(c => c.id === coffeeId);
      if (selectedCoffee) {
        cart.push(selectedCoffee);
        updateOrderSummary();
      }
    });
  });
};

/**
 * Recalcula el total del pedido, aplicando zona de envío y conversión de divisas (reduce())
 * Adicionalmente actualiza la lista dinámica de productos añadidos al carrito.
 */
export const updateOrderSummary = async () => {
  const subtotalEl = document.getElementById('subtotal');
  const shippingEl = document.getElementById('shipping-cost');
  const totalEl = document.getElementById('total-cost');
  const zoneSelect = document.getElementById('zone-select');
  const currencySelect = document.getElementById('currency-select');
  const cartItemsList = document.getElementById('cart-items-list');

  const subtotalUsd = cart.reduce((acc, item) => acc + item.price, 0);
  const selectedZone = zoneSelect.value;
  const shippingUsd = SHIPPING_RATES[selectedZone] || 0;
  const totalUsd = subtotalUsd > 0 ? subtotalUsd + shippingUsd : 0;

  const useEur = currencySelect.value === "EUR";
  const rate = useEur ? eurRate : 1;
  const symbol = useEur ? "€" : "$";
  const currencyName = useEur ? "EUR" : "USD";

  // Renderizar la lista de productos dentro del resumen del pedido
  if (cartItemsList) {
    if (cart.length === 0) {
      cartItemsList.innerHTML = `<p class="empty-cart-text">El carrito está vacío. ¡Añade un buen café! ☕</p>`;
    } else {
      cartItemsList.innerHTML = cart.map((item, index) => `
        <div class="cart-item-row">
          <span class="cart-item-name">☕ ${item.name}</span>
          <span class="cart-item-price">${symbol}${(item.price * rate).toFixed(2)}</span>
          <button class="btn-remove-item" data-index="${index}" title="Quitar item">×</button>
        </div>
      `).join('');

      // Agregar eventos individuales para eliminar del carrito por elemento
      cartItemsList.querySelectorAll('.btn-remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const indexToRemove = parseInt(e.target.dataset.index);
          cart.splice(indexToRemove, 1);
          updateOrderSummary();
        });
      });
    }
  }

  subtotalEl.textContent = `${symbol}${(subtotalUsd * rate).toFixed(2)} ${currencyName}`;
  shippingEl.textContent = `${symbol}${(shippingUsd * rate).toFixed(2)} ${currencyName}`;
  totalEl.textContent = `${symbol}${(totalUsd * rate).toFixed(2)} ${currencyName}`;
};

/**
 * Vaciar Carrito
 */
export const clearCart = () => {
  cart = [];
  updateOrderSummary();
};

/**
 * Validaciones en Tiempo Real para el Formulario de Contacto
 */
export const setupFormValidation = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const inputs = {
    name: document.getElementById('form-name'),
    email: document.getElementById('form-email'),
    phone: document.getElementById('form-phone'),
    message: document.getElementById('form-message')
  };

  const errors = {
    name: document.getElementById('err-name'),
    email: document.getElementById('err-email'),
    phone: document.getElementById('err-phone'),
    message: document.getElementById('err-message')
  };

  const validateField = (field) => {
    let isValid = true;
    let msg = "";

    if (field === 'name') {
      if (!inputs.name.value.trim()) {
        msg = "El nombre es obligatorio.";
        isValid = false;
      }
    } else if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputs.email.value.trim())) {
        msg = "Ingresa un correo electrónico válido.";
        isValid = false;
      }
    } else if (field === 'phone') {
      if (inputs.phone.value.trim().length < 7) {
        msg = "Ingresa un número de teléfono válido (mín. 7 dígitos).";
        isValid = false;
      }
    } else if (field === 'message') {
      if (inputs.message.value.trim().length < 10) {
        msg = "El mensaje debe tener al menos 10 caracteres.";
        isValid = false;
      }
    }

    errors[field].textContent = msg;
    inputs[field].classList.toggle('invalid', !isValid);
    return isValid;
  };

  // Listeners de validación en tiempo real (Input y Blur)
  Object.keys(inputs).forEach(key => {
    inputs[key].addEventListener('input', () => validateField(key));
    inputs[key].addEventListener('blur', () => validateField(key));
  });

  // Evento Submit final
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const results = Object.keys(inputs).map(key => validateField(key));
    const allValid = results.every(val => val === true);

    if (allValid) {
      document.getElementById('form-success').style.display = 'block';
      form.reset();
      setTimeout(() => {
        document.getElementById('form-success').style.display = 'none';
      }, 5000);
    }
  });
};

/**
 * Pinta los datos de la API en los widgets correspondientes y actualiza la recomendación del catálogo
 */
export const renderWidgets = (weather, quote, indicators) => {
  const climaWidget = document.getElementById('widget-clima');
  const fraseWidget = document.getElementById('widget-frase');
  const cotizacionWidget = document.getElementById('widget-cotizacion');

  if (climaWidget && weather) {
    climaWidget.innerHTML = `🌤️ Quito: <strong>${weather.temp}°C</strong>`;
    
    // 🌡️ LÓGICA INTELIGENTE:
    // Si la temperatura es menor o igual a 18°C, sugerimos calientes ("warm").
    // Si hace calor (mayor a 18°C), sugerimos bebidas heladas ("cold").
    recommendedClimateType = weather.temp <= 18.0 ? "warm" : "cold";
    
    // Volvemos a renderizar el catálogo para que cargue la selección inteligente según el clima real recibido
    renderCatalog();
  }

  if (fraseWidget && quote) {
    fraseWidget.innerHTML = `“${quote.text}” <small>— ${quote.author}</small>`;
  }

  if (cotizacionWidget && indicators) {
    cotizacionWidget.innerHTML = `📈 USD: 🇨🇱 ${indicators.clp} | 🇦🇷 ${indicators.ars}`;
  }
};