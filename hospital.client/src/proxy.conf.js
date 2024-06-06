const PROXY_CONFIG = [
  {
    context: [
      "/api/authorization/customer", 
      "/api/authorization/doctor",
      "/api/registration/customer",
      "/api/categories",
      "/api/subcategories",
      "/api/subcategories/{categoryName}",
      "/api/items",
      "/api/items/{subcategoryName}",
      "/api/items/item/{itemName}",
    ],
    target: "https://localhost:7275",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
