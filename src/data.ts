import { Category, Product, Testimonial, Promotion } from './types';

export const HERO_IMAGE = '/src/assets/images/hero_arepa_banner_1784216453995.jpg';

export const CATEGORIES: Category[] = [
  {
    id: 'clasicas',
    name: 'Clásicas',
    icon: 'CookingPot',
    description: 'Nuestras arepas tradicionales con masa artesanal.'
  },
  {
    id: 'gourmet',
    name: 'Gourmet',
    icon: 'ChefHat',
    description: 'Sabores elaborados y recetas refinadas.'
  },
  {
    id: 'especiales',
    name: 'Especiales',
    icon: 'Flame',
    description: 'Creaciones únicas con ingredientes gourmet.'
  }
];

export const PRODUCTS: Product[] = [
  // --- AREPAS ---
  {
    id: 'arepa_explosiva',
    name: 'La Explosiva',
    description: 'Deliciosa arepa rellena de jugoso pollo desmechado, tocineta crujiente caramelizada, maíz dulce tierno y queso mozzarella fundido de primera calidad.',
    price: 18900,
    category: 'gourmet',
    image: '/src/assets/images/arepa_explosiva_1784216468842.jpg',
    isPopular: true,
    ingredients: ['Masa de maíz tierno', 'Pollo desmechado', 'Tocineta crujiente', 'Maíz tierno', 'Queso Mozzarella']
  },
  {
    id: 'arepa_desmechada',
    name: 'La Desmechada',
    description: 'Tradicional sabor con carne desmechada sazonada lentamente, deliciosas rodajas de plátano maduro frito (maduritos) y abundante queso blanco nacional rallado.',
    price: 19900,
    category: 'clasicas',
    image: '/src/assets/images/arepa_desmechada_1784216482682.jpg',
    isPopular: true,
    ingredients: ['Masa de maíz tierno', 'Carne desmechada de res', 'Plátano maduro frito', 'Queso blanco rallado']
  },
  {
    id: 'arepa_marinera',
    name: 'La Marinera',
    description: '¡Una explosión de sabor marino! Camarones salteados al ajillo, cremosa salsa de atún de la casa, maicitos dulces y cobertura de queso mozzarella fundido.',
    price: 24900,
    category: 'especiales',
    image: '/src/assets/images/arepa_marinera_1784216495160.jpg',
    isNew: true,
    ingredients: ['Masa de maíz tierno', 'Camarones al ajillo', 'Salsa de atún gourmet', 'Maíz dulce', 'Queso Mozzarella']
  },
  {
    id: 'arepa_parrillera',
    name: 'La Parrillera',
    description: 'Sabor rústico que encanta: chorizo artesanal caramelizado a la plancha, plátano maduro frito y una lluvia de queso blanco rallado.',
    price: 17900,
    category: 'clasicas',
    image: '/src/assets/images/arepa_parrillera_1784216508384.jpg',
    ingredients: ['Masa de maíz tierno', 'Chorizo artesanal', 'Plátano maduro frito', 'Queso blanco rallado']
  },
  {
    id: 'arepa_paisita',
    name: 'La Paisita',
    description: 'Inspirada en la bandeja paisa: trozos de chicharrón súper crujientes, frijoles refritos sazonados, hogao criollo tradicional y queso blanco rallado.',
    price: 21900,
    category: 'especiales',
    image: '/src/assets/images/arepa_paisita_1784216522146.jpg',
    isPopular: true,
    ingredients: ['Masa de maíz tierno', 'Chicharrón crujiente', 'Frijol refrito', 'Hogao criollo', 'Queso blanco rallado']
  }
];

export const PROMOTIONS: Promotion[] = [
  {
    id: 'promo_martes_2x1',
    title: 'Martes de 2x1 en Parrilleras',
    description: 'Compra una Arepa La Parrillera con delicioso chorizo artesanal, maduro y queso blanco, y te obsequiamos la segunda totalmente gratis.',
    price: 17900,
    originalPrice: 35800,
    badge: '2x1 EXCLUSIVO',
    image: '/src/assets/images/arepa_parrillera_1784216508384.jpg',
    category: 'clasicas'
  },
  {
    id: 'promo_combo_sabor',
    title: 'Combo Fiesta Sabor Arepa',
    description: 'Lleva la espectacular Arepa Paisita súper crujiente con chicharrón, una Arepa La Parrillera tradicional y una porción generosa de maduritos.',
    price: 33900,
    originalPrice: 39800,
    badge: 'AHORRO EXTRA',
    image: '/src/assets/images/arepa_paisita_1784216522146.jpg',
    category: 'especiales'
  },
  {
    id: 'promo_pareja',
    title: 'Combo Pareja Enamorada',
    description: 'Dos Arepas a tu elección (La Explosiva o La Desmechada), acompañadas de una lluvia de queso mozzarella extra fundido y dos bebidas tradicionales.',
    price: 41900,
    originalPrice: 52000,
    badge: 'MEJOR VALOR',
    image: '/src/assets/images/arepa_desmechada_1784216482682.jpg',
    category: 'gourmet'
  },
  {
    id: 'promo_combo_explosivo',
    title: 'Combo Explosión Personal',
    description: 'Arepa La Explosiva rellena de pollo, tocineta y maíz dulce, acompañada de doble porción de queso gratinado al soplete.',
    price: 21900,
    originalPrice: 24900,
    badge: 'RECOMENDADO',
    image: '/src/assets/images/arepa_explosiva_1784216468842.jpg',
    category: 'gourmet'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test_1',
    name: 'Carlos Mendoza',
    role: 'Cliente Frecuente',
    comment: '¡Las mejores arepas rellenas que he probado en mi vida! La Explosiva es de otro mundo, la tocineta caramelizada con el pollo es una mezcla perfecta. El servicio a domicilio es súper rápido.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'test_2',
    name: 'Valentina Restrepo',
    role: 'Amante de la Comida',
    comment: 'La Marinera es exquisita. Nunca había probado camarones en una arepa y la salsa de atún que preparan es increíble. Además, el menú digital es genial, pides todo directo al WhatsApp.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'test_3',
    name: 'Santiago Bedoya',
    role: 'Crítico Gastronómico Local',
    comment: 'Excelente atención y los ingredientes son de una frescura indiscutible. La arepa Paisita con ese chicharrón súper tostado y crujiente merece 10 estrellas. ¡Súper recomendado!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  }
];

export const BRAND_INFO = {
  name: 'La Casa del Sabor',
  slogan: '¡Las Arepas Rellenas que Conquistan el Sabor!',
  colors: {
    primary: '#F7A600', // Amarillo
    secondary: '#4B2E20', // Marrón
    white: '#FFFFFF',
    black: '#1E1E1E'
  },
  whatsapp: '+57 3206749078',
  phone: '+573206749078',
  address: 'Apartadó, Antioquia',
  schedule: 'Lunes a Domingo: 5:00 PM - 10:00 PM',
  social: {
    facebook: 'https://facebook.com/lacasadelsabor',
    instagram: 'https://instagram.com/lacasadelsabor',
    tiktok: 'https://tiktok.com/@lacasadelsabor'
  },
  whyChooseUs: [
    {
      title: 'Ingredientes frescos',
      description: 'Seleccionamos las mejores carnes, quesos y vegetales diariamente para garantizar un sabor insuperable.',
      icon: 'Sparkles'
    },
    {
      title: 'Productos artesanales',
      description: 'Nuestra masa de maíz es preparada de forma artesanal, sin conservantes y asada a la parrilla de carbón.',
      icon: 'Flame'
    },
    {
      title: 'Excelente atención',
      description: 'Nos esmeramos por brindarte una experiencia cálida y atenta, tanto en local como en nuestros canales digitales.',
      icon: 'HeartHandshake'
    },
    {
      title: 'Entrega rápida',
      description: 'Contamos con una red de domiciliarios ágiles para que tu pedido llegue calientito y en tiempo récord.',
      icon: 'Bike'
    }
  ]
};
