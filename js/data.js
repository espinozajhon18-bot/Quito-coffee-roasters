// Catálogo clasificado por tipo de clima recomendado
export const COFFEE_CATALOG = [
    {
        id: 1,
        name: "Lojano Exclusivo (Caliente)",
        origin: "Ecuador",
        notes: "Chocolate amargo, notas cítricas y jazmín. Perfecto para abrigarse.",
        price: 12.50,
        type: "warm", 
        image: "image/Lojano Exclusivo .png" 
    },
    {
        id: 2,
        name: "Espresso Doble (Caliente)",
        origin: "Ecuador",
        notes: "Sabor intenso, cuerpo denso y un final deliciosamente dulce.",
        price: 11.00,
        type: "warm", 
        image: "image/espresso doble.png" 
    },
    {
        id: 3,
        name: "Carchi Honey (Caliente)",
        origin: "Ecuador",
        notes: "Miel, frutos rojos y acidez brillante.",
        price: 14.00,
        type: "warm", 
        image: "image/Carchi Honey.png" 
    },
    {
        id: 4,
        name: "Cold Brew Cítrico (Frío)",
        origin: "Colombia",
        notes: "Café extraído en frío por 24 horas con rodajas de naranja. Súper refrescante.",
        price: 13.50,
        type: "cold", 
        image: "image/Cold Brew Cítrico.png"
    },
    {
        id: 5,
        name: "Iced Latte de Vainilla (Frío)",
        origin: "Brasil",
        notes: "Espresso vertido sobre leche fría, hielo y un toque artesanal de vainilla.",
        price: 12.00,
        type: "cold", 
        image: "image/Iced Latte de Vainilla.png"
    },
    {
        id: 6,
        name: "Frappé de Caramelo (Frío)",
        origin: "Etiopía",
        notes: "Café licuado con hielo, crema batida y salsa de caramelo de la casa.",
        price: 14.50,
        type: "cold",
        image: "image/Frappé de Caramelo.png"
    }
];

export const SHIPPING_RATES = {
    norte: 2.50,
    centro: 1.80,
    sur: 3.00,
    valles: 3.50
};