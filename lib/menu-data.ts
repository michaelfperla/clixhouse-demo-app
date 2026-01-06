export type Category = "todos" | "tacos" | "antojitos" | "bebidas" | "postres";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Exclude<Category, "todos">;
  image: string;
  pointsEarned: number;
  popular?: boolean;
}

// Category icons use Lucide icon names
export const CATEGORIES: { id: Category; label: string; icon: string }[] = [
  { id: "todos", label: "Todos", icon: "Utensils" },
  { id: "tacos", label: "Tacos", icon: "Beef" },
  { id: "antojitos", label: "Antojitos", icon: "Cookie" },
  { id: "bebidas", label: "Bebidas", icon: "Coffee" },
  { id: "postres", label: "Postres", icon: "Cake" },
];

export const MENU_ITEMS: MenuItem[] = [
  // Tacos
  {
    id: "tacos-pastor",
    name: "Tacos al Pastor",
    description: "Carne marinada en adobo con piña, cebolla y cilantro",
    price: 45,
    category: "tacos",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop&q=80",
    pointsEarned: 5,
    popular: true,
  },
  {
    id: "tacos-asada",
    name: "Tacos de Asada",
    description: "Carne asada con guacamole y salsa verde",
    price: 50,
    category: "tacos",
    image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=300&fit=crop&q=80",
    pointsEarned: 5,
  },
  {
    id: "tacos-carnitas",
    name: "Tacos de Carnitas",
    description: "Carnitas estilo Michoacán con cebolla curtida",
    price: 48,
    category: "tacos",
    image: "https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=400&h=300&fit=crop&q=80",
    pointsEarned: 5,
  },
  // Antojitos
  {
    id: "quesadilla",
    name: "Quesadilla",
    description: "Tortilla de harina con queso Oaxaca derretido",
    price: 35,
    category: "antojitos",
    image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&h=300&fit=crop&q=80",
    pointsEarned: 4,
    popular: true,
  },
  {
    id: "burrito",
    name: "Burrito",
    description: "Tortilla grande con arroz, frijoles, carne y crema",
    price: 65,
    category: "antojitos",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop&q=80",
    pointsEarned: 7,
  },
  {
    id: "nachos",
    name: "Nachos con Queso",
    description: "Totopos con queso fundido, jalapeños y guacamole",
    price: 55,
    category: "antojitos",
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop&q=80",
    pointsEarned: 6,
  },
  {
    id: "elote",
    name: "Elote en Vaso",
    description: "Maíz con mayonesa, queso, chile y limón",
    price: 30,
    category: "antojitos",
    image: "https://images.unsplash.com/photo-1470119693884-47d3a1d1f180?w=400&h=300&fit=crop&q=80",
    pointsEarned: 3,
  },
  // Bebidas
  {
    id: "agua-horchata",
    name: "Agua de Horchata",
    description: "Bebida de arroz con canela y vainilla",
    price: 25,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=400&h=300&fit=crop&q=80",
    pointsEarned: 3,
    popular: true,
  },
  {
    id: "agua-jamaica",
    name: "Agua de Jamaica",
    description: "Té de flor de jamaica bien frío",
    price: 25,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&q=80",
    pointsEarned: 3,
  },
  {
    id: "cerveza",
    name: "Cerveza",
    description: "Cerveza mexicana bien fría",
    price: 35,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=300&fit=crop&q=80",
    pointsEarned: 4,
  },
  // Postres
  {
    id: "churros",
    name: "Churros",
    description: "Churros crujientes con azúcar y canela",
    price: 30,
    category: "postres",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&q=80",
    pointsEarned: 3,
    popular: true,
  },
  {
    id: "flan",
    name: "Flan Napolitano",
    description: "Flan casero con caramelo",
    price: 35,
    category: "postres",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop&q=80",
    pointsEarned: 4,
  },
];

export function getMenuItemById(id: string): MenuItem | undefined {
  return MENU_ITEMS.find((item) => item.id === id);
}

export function getMenuItemsByCategory(category: Category): MenuItem[] {
  if (category === "todos") return MENU_ITEMS;
  return MENU_ITEMS.filter((item) => item.category === category);
}
