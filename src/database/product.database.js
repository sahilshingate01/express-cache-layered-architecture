// In-memory database
let products = [
  {
    id: 1,
    name: "Laptop",
    price: 80000,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Keyboard",
    price: 2500,
    category: "Electronics",
  },
  {
    id: 3,
    name: "Mouse",
    price: 1200,
    category: "Electronics",
  },
  {
    id: 4,
    name: "Desk",
    price: 15000,
    category: "Furniture",
  },
  {
    id: 5,
    name: "Chair",
    price: 8500,
    category: "Furniture",
  },
];

const findAll = () => {
  return [...products];
};

const findById = (id) => {
  const product = products.find((p) => p.id === id);
  return product ? { ...product } : null;
};

const insert = (productData) => {
  const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const newProduct = { id: newId, ...productData };
  products.push(newProduct);
  return { ...newProduct };
};

const update = (id, data) => {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updatedProduct = { id, ...data };
  products[index] = updatedProduct;
  return { ...updatedProduct };
};

const patch = (id, data) => {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updatedProduct = { ...products[index], ...data };
  products[index] = updatedProduct;
  return { ...updatedProduct };
};

const remove = (id) => {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;

  products.splice(index, 1);
  return true;
};

// Expose internal reset function for testing purposes
const resetDb = () => {
  products = [
    { id: 1, name: "Laptop", price: 80000, category: "Electronics" },
    { id: 2, name: "Keyboard", price: 2500, category: "Electronics" },
    { id: 3, name: "Mouse", price: 1200, category: "Electronics" },
    { id: 4, name: "Desk", price: 15000, category: "Furniture" },
    { id: 5, name: "Chair", price: 8500, category: "Furniture" },
  ];
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  patch,
  remove,
  resetDb, // Used for tests
};
