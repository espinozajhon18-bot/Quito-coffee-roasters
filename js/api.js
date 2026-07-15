// js/api.js

const QUITO_LAT = -0.1807;
const QUITO_LON = -78.4678;

// 1. Clima en Quito
export const getQuitoWeather = async () => {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${QUITO_LAT}&longitude=${QUITO_LON}&current_weather=true`);
        if (!response.ok) throw new Error("Fallo al conectar con Open-Meteo.");
        const { current_weather } = await response.json();
        return { temp: current_weather.temperature, wind: current_weather.windspeed };
    } catch (error) {
        console.warn("Clima Fallback activo:", error);
        return { temp: 17, wind: 10 }; // Fallback
    }
};

// js/api.js

/**
 * Obtiene una frase inspiradora en español con un tiempo de espera límite (Timeout)
 */
export const getRandomQuote = async () => {
    // Lista de frases de respaldo excelentes en español por si la API tarda en despertar
    const fallbackQuotes = [
        { text: "El café de especialidad no es una bebida, es una experiencia.", author: "Barista Local" },
        { text: "Detrás de cada gran taza de café hay una gran historia por contar.", author: "Quito Coffee Roasters" },
        { text: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.", author: "Anónimo" },
        { text: "La excelencia no es un acto, es un hábito.", author: "Aristóteles" },
        { text: "Un buen café de especialidad alegra cualquier mañana en Quito.", author: "Café de Altura" }
    ];

    // Creamos un controlador para poder cancelar la petición si tarda demasiado
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 segundos de límite

    try {
        const response = await fetch("https://phrasesapi.onrender.com/getSuccessAndFailure", {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId); // Si responde a tiempo, cancelamos el temporizador

        if (!response.ok) throw new Error("Respuesta de API no exitosa.");
        
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomQuote = data[randomIndex];
            return { 
                text: randomQuote.phrase, 
                author: randomQuote.author || "Anónimo" 
            };
        } else {
            throw new Error("Formato de datos de la API inválido.");
        }
    } catch (error) {
        // Si el servidor de Render está dormido o la red falla, entra aquí de inmediato
        if (error.name === 'AbortError') {
            console.warn("⏱️ La API de frases tardó demasiado en responder (Timeout). Usando frase local.");
        } else {
            console.warn("⚠️ Error en la API de frases. Usando frase de respaldo:", error.message);
        }
        
        // Seleccionamos una frase de nuestra lista local aleatoriamente para que siempre varíe
        const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        return randomFallback;
    }
};
// 3. Indicadores de Chile y Argentina (APIs Locales)
export const getEconomicIndicators = async () => {
    const indicators = { clp: "N/D", ars: "N/D" };
    try {
        const resCl = await fetch("https://mindicador.cl/api");
        if (resCl.ok) {
            const data = await resCl.json();
            indicators.clp = `$${data.dolar.valor} CLP`;
        }
    } catch (e) { console.error("Error CLP:", e); }

    try {
        const resAr = await fetch("https://dolarapi.com/v1/dolares/oficial");
        if (resAr.ok) {
            const data = await resAr.json();
            indicators.ars = `$${data.venta} ARS`;
        }
    } catch (e) { console.error("Error ARS:", e); }

    return indicators;
};

// 4. Conversor a Euros (ExchangeRate-API)
export const getEurExchangeRate = async () => {
    try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!response.ok) throw new Error("Fallo al consultar ExchangeRate API.");
        const data = await response.json();
        return data.rates.EUR || 0.92; // Retorna tasa de USD a EUR
    } catch (error) {
        console.warn("Usando tasa fija EUR de seguridad (0.92):", error);
        return 0.92;
    }
};