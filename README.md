# ☕ Quito Coffee Roasters - Café de Especialidad

¡Bienvenido a **Quito Coffee Roasters**! Una aplicación web interactiva, moderna y responsiva diseñada para amantes del café de especialidad. La plataforma permite a los usuarios explorar nuestro catálogo exclusivo de granos, visualizar su carrito de compras con un desglose detallado en tiempo real, calcular el costo de su pedido según su ubicación en Quito, realizar conversiones automáticas de moneda (USD a EUR) y mantenerse informados con datos dinámicos obtenidos desde APIs públicas en vivo.

Este proyecto ha sido desarrollado como una aplicación de página única (SPA) utilizando prácticas modernas de desarrollo web bajo el estándar **ES6+**.

---

## 🚀 Demo En Vivo
Puedes acceder a la versión desplegada en producción aquí:
👉 **[https://espinozajhon18-bot.github.io/Quito-coffee-roasters/](https://espinozajhon18-bot.github.io/Quito-coffee-roasters/)**

---

## 🛠️ Tecnologías y Estándares Utilizados

La aplicación fue construida desde cero cumpliendo rigurosamente con los siguientes requisitos técnicos obligatorios:

### 1. Estructura HTML Semántica y Accesible
* **Etiquetas Semánticas:** Uso estricto de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` y `<footer>` para definir una estructura jerárquica clara y lógica.
* **Accesibilidad (A11y):** Implementación de atributos `aria-live="polite"` en los widgets de carga dinámica y atributos `aria-label` en las tarjetas de productos para mejorar la navegación con lectores de pantalla.

### 2. CSS Moderno, Responsive y de Diseño Cálido
* **Diseño Responsivo:** Layout fluido diseñado con **CSS Grid** para el catálogo de productos y la estructura general, combinado con **Flexbox** para la navegación, cabecera y el formulario de contacto.
* **Paleta de Colores Corporativa:** Inspirada en el mundo del café utilizando variables CSS (`:root`) con tonos tierra, beige crema, marrones profundos y acentos en terracota para transmitir una atmósfera amigable y acogedora.
* **Scrollbars Personalizados:** El panel lateral del pedido incluye un contenedor de ítems con scroll vertical suave de alto máximo controlado para mantener la armonía de la interfaz visual sin romper el diseño responsivo.
* **Interactividad Visual:** Efectos de hover elegantes, elevación de tarjetas y transiciones sutiles que optimizan la experiencia de usuario (UX).

### 3. JavaScript Moderno (ES6+) con Enfoque Modular
* **Declaración de Variables:** Uso exclusivo de `const` y `let` para un control seguro de ámbitos (evitando `var`).
* **Sintaxis Moderna:** Arrow functions para el manejo de callbacks, template literals para la interpolación de HTML dinámico, desestructuración de objetos y arrays, y uso del operador Spread.
* **Arquitectura Modular:** Organización limpia del código en módulos JS (`import`/`export`) dividiendo responsabilidades:
  * `data.js`: Almacenamiento de datos del catálogo categorizados y tarifas de envío.
  * `api.js`: Peticiones asíncronas a APIs externas de forma centralizada con sistema de control de tiempo de espera (*timeout*).
  * `ui.js`: Renderizado dinámico del DOM, lógica de filtros contextuados, manipulación e interacción en tiempo real del carrito de compras, validación del formulario y eventos interactivos.
  * `main.js`: Orquestador principal de la carga y eventos de la aplicación.
* **Métodos de Array:** Manipulación y cálculo de datos mediante `map()`, `filter()`, `find()` y `reduce()`.

### 4. Programación Asíncrona e Integración de APIs Públicas
Implementación de peticiones HTTP utilizando `fetch()` con la estructura `async/await` y bloques `try/catch` para un manejo robusto de errores:
1. **Clima de Quito:** Conexión en tiempo real con **Open-Meteo API** según ubicación geográfica.
2. **Frase del Día (Hero Banner):** Consumo dinámico de citas inspiradoras mediante la API de **PhrasesAPI** (con fallback local optimizado a 3 segundos mediante `AbortController` para prevenir demoras por servidores inactivos en Render).
3. **Conversión de Divisas:** Integración con **ExchangeRate-API** para realizar la conversión dinámica del total de la orden de Dólares (USD) a Euros (EUR).
4. **Cotizaciones del Dólar:** Indicadores del dólar para Chile (CLP) y Argentina (ARS) consumidos desde APIs públicas de integración.

---

## 📦 Características Especiales del Proyecto

### 🌤️ Lógica de Recomendación Inteligente por Clima (Contextual UX)
Para llevar la experiencia de usuario al siguiente nivel, la plataforma se adapta de manera orgánica a las condiciones climáticas del momento en la ciudad de Quito:
* La aplicación consulta la temperatura en vivo a través de la API de **Open-Meteo**.
* **Día Frío / Nublado (≤ 18°C):** La interfaz muestra automáticamente un banner interactivo sugiriendo bebidas calientes y filtra el catálogo priorizando opciones como el *Lojano Exclusivo*, *Espresso* o *Carchi Honey* para ayudar al usuario a abrigarse.
* **Día Cálido (> 18°C):** El catálogo se reconfigura de inmediato para recomendar bebidas refrescantes heladas como el *Cold Brew Cítrico*, *Iced Latte* o *Frappé de Caramelo*.
* *Nota:* Si el usuario interactúa manualmente con la barra de búsqueda o el selector de países, la recomendación por clima se pausa temporalmente para dar prioridad absoluta a la intención de búsqueda explícita del cliente.

### 💾 Almacenamiento Local de Recursos (Resiliencia)
A diferencia de los enlaces remotos que sufren caídas de red, **todas las imágenes del catálogo han sido integradas de manera local** en la estructura del proyecto bajo la carpeta `image/`. Esto asegura una velocidad de carga instantánea y una presentación impecable de las tarjetas de café en cualquier navegador.

---

## 📦 Funcionalidades Generales del Proyecto

### 🌟 Sección 1: Hero y Bienvenida
* Banner principal interactivo donde se destaca el nombre **Quito Coffee Roasters** sobre una imagen de alta resolución con contraste de legibilidad optimizado.
* Visualización en vivo del clima de la ciudad de Quito y tipo de cambio de divisas latinoamericanas en la barra de navegación superior.
* Slogan del día cargado directamente desde una API en español e integrado de forma asíncrona.

### ☕ Sección 2: Catálogo Dinámico de Cafés
* Tarjetas de producto generadas dinámicamente que muestran el nombre del café, el origen, las notas de cata del barista, el precio y un botón de compra.
* **Filtros Avanzados:** Barra de búsqueda en tiempo real por texto que filtra mientras se escribe, acompañada de un filtro interactivo por país de origen (Ecuador, Colombia, Brasil, Etiopía).

### 🧮 Sección 3: Calculadora y Desglose de Pedido Interactiva
* **Carrito Visual en Tiempo Real:** Muestra un listado detallado de cada café que agregas al pedido con su respectivo nombre, precio dinámico adaptado a la divisa elegida y un botón de eliminación (`×`).
* **Control de Ítems:** Permite al cliente remover tazas específicas de su orden sin la necesidad de vaciar todo el pedido por un error de selección.
* **Cálculo Preciso:** Subtotal calculado de forma acumulativa al presionar "Agregar al Pedido".
* **Distribución de Envíos:** Selector dinámico con las tarifas oficiales de envío por zonas en Quito (Norte, Centro, Sur, Valles).
* **Multidivisa:** Conversión automática de todo el pedido y su desglose a Dólares (USD) o Euros (EUR).

### ✉️ Sección 4: Formulario de Contacto con Validación en Tiempo Real
* Validación dinámica del formulario (Nombre, Email, Teléfono y Mensaje) que interactúa con el usuario avisando inmediatamente si hay errores de formato antes de permitir el envío.

---

## 🧠 Prompts de IA Utilizados (Asistentes de IA)
Para optimizar el flujo de desarrollo y resolver retos lógicos complejos, se utilizaron los siguientes enfoques de prompt:

1. **Estructuración Modular ES6:** *"Ayúdame a dividir un archivo monolítico de JavaScript en una arquitectura limpia orientada a módulos de ES6 separando datos, APIs y lógica de renderizado del DOM de forma independiente"*.
2. **Resiliencia de Red con AbortController:** *"Necesito implementar un temporizador de límite (Timeout) de 3 segundos usando Fetch y AbortController para una API de Render que suele demorar en despertar, asegurando que si falla, retorne una lista de respuestas local de manera inmediata"*.
3. **Filtro Combinado con Sugerencia Climática:** *"Escribe un método de filtrado inteligente de arrays en JS usando .filter() que combine la búsqueda de texto del usuario, un filtro por país y una sugerencia climática automática si el usuario no ha interactuado manualmente con los inputs"*.
4. **Calculadora con Reduce y Conversión Dinámica:** *"¿Cómo puedo calcular el total acumulado de un carrito de compras usando .reduce() y aplicar al vuelo una tasa de cambio cargada asíncronamente junto con costos de envío dinámicos?"*.
5. **Validación de Formularios en Vivo:** *"Proporcióname un script para validar campos de formulario (correo con regex, longitud de mensaje y teléfono) en tiempo real usando eventos input y blur sin interrumpir la experiencia de usuario"*.
6. **Manejo Dinámico de Elementos del Carrito:** *"Ayúdame a modificar mi resumen de compra de forma que cree un div dinámico donde se listen uno a uno los productos del carrito con su respectiva información de precio convertida a la divisa actual, agregando además un escuchador de eventos interactivo para remover ítems usando su índice de array con splice()"*.

---

## 💻 Instalación y Ejecución Local

Para ejecutar este proyecto en tu entorno local, sigue estos sencillos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/espinozajhon18-bot/Quito-coffee-roasters.git](https://github.com/espinozajhon18-bot/Quito-coffee-roasters.git)