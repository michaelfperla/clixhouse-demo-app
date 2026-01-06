export type Category = "todos" | "tacos" | "antojitos" | "bebidas" | "postres";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Exclude<Category, "todos">;
  emoji: string;
  pointsEarned: number;
  popular?: boolean;
}

export const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: "todos", label: "Todos", emoji: "🍽️" },
  { id: "tacos", label: "Tacos", emoji: "🌮" },
  { id: "antojitos", label: "Antojitos", emoji: "🫓" },
  { id: "bebidas", label: "Bebidas", emoji: "🥤" },
  { id: "postres", label: "Postres", emoji: "🍩" },
];

export const MENU_ITEMS: MenuItem[] = [
  // Tacos
  {
    id: "tacos-pastor",
    name: "Tacos al Pastor",
    description: "Carne marinada en adobo con piña, cebolla y cilantro",
    price: 45,
    category: "tacos",
    emoji: "🌮",
    pointsEarned: 5,
    popular: true,
  },
  {
    id: "tacos-asada",
    name: "Tacos de Asada",
    description: "Carne asada con guacamole y salsa verde",
    price: 50,
    category: "tacos",
    emoji: "🌮",
    pointsEarned: 5,
  },
  {
    id: "tacos-carnitas",
    name: "Tacos de Carnitas",
    description: "Carnitas estilo Michoacán con cebolla curtida",
    price: 48,
    category: "tacos",
    emoji: "🌮",
    pointsEarned: 5,
  },
  // Antojitos
  {
    id: "quesadilla",
    name: "Quesadilla",
    description: "Tortilla de harina con queso Oaxaca derretido",
    price: 35,
    category: "antojitos",
    emoji: "🧀",
    pointsEarned: 4,
    popular: true,
  },
  {
    id: "burrito",
    name: "Burrito",
    description: "Tortilla grande con arroz, frijoles, carne y crema",
    price: 65,
    category: "antojitos",
    emoji: "🌯",
    pointsEarned: 7,
  },
  {
    id: "nachos",
    name: "Nachos con Queso",
    description: "Totopos con queso fundido, jalapeños y guacamole",
    price: 55,
    category: "antojitos",
    emoji: "🫓",
    pointsEarned: 6,
  },
  {
    id: "elote",
    name: "Elote en Vaso",
    description: "Maíz con mayonesa, queso, chile y limón",
    price: 30,
    category: "antojitos",
    emoji: "🌽",
    pointsEarned: 3,
  },
  // Bebidas
  {
    id: "agua-horchata",
    name: "Agua de Horchata",
    description: "Bebida de arroz con canela y vainilla",
    price: 25,
    category: "bebidas",
    emoji: "🥛",
    pointsEarned: 3,
    popular: true,
  },
  {
    id: "agua-jamaica",
    name: "Agua de Jamaica",
    description: "Té de flor de jamaica bien frío",
    price: 25,
    category: "bebidas",
    emoji: "🍹",
    pointsEarned: 3,
  },
  {
    id: "cerveza",
    name: "Cerveza",
    description: "Cerveza mexicana bien fría",
    price: 35,
    category: "bebidas",
    emoji: "🍺",
    pointsEarned: 4,
  },
  // Postres
  {
    id: "churros",
    name: "Churros",
    description: "Churros crujientes con azúcar y canela",
    price: 30,
    category: "postres",
    emoji: "🥖",
    pointsEarned: 3,
    popular: true,
  },
  {
    id: "flan",
    name: "Flan Napolitano",
    description: "Flan casero con caramelo",
    price: 35,
    category: "postres",
    emoji: "🍮",
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
