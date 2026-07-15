// js/main.js
import { getQuitoWeather, getRandomQuote, getEconomicIndicators } from './api.js';
import { renderCatalog, renderWidgets, updateOrderSummary, setupFormValidation, clearCart } from './ui.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Render inicial del catálogo
    renderCatalog();

    // 2. Configurar validaciones de formulario
    setupFormValidation();

    // 3. Listeners de búsqueda y filtrado interactivo
    const searchInput = document.getElementById('search-input');
    const originFilter = document.getElementById('origin-filter');

    const handleFilters = () => {
        renderCatalog(searchInput.value, originFilter.value);
    };

    if (searchInput) searchInput.addEventListener('input', handleFilters);
    if (originFilter) originFilter.addEventListener('change', handleFilters);

    // 4. Listeners para recálculo de costos y moneda
    const zoneSelect = document.getElementById('zone-select');
    const currencySelect = document.getElementById('currency-select');
    const btnClearCart = document.getElementById('btn-clear-cart');

    if (zoneSelect) zoneSelect.addEventListener('change', updateOrderSummary);
    if (currencySelect) currencySelect.addEventListener('change', updateOrderSummary);
    if (btnClearCart) btnClearCart.addEventListener('click', clearCart);

    // 5. Carga asíncrona paralela de APIs con Promise.all
    try {
        const [weather, quote, indicators] = await Promise.all([
            getQuitoWeather(),
            getRandomQuote(),
            getEconomicIndicators()
        ]);
        renderWidgets(weather, quote, indicators);
    } catch (err) {
        console.error("Error al cargar APIs globales:", err);
    }
});