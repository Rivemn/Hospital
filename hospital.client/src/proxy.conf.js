const PROXY_CONFIG = [
  {
    context: [
      "/api/categories",
      "/api/subcategories",
      "/api/subcategories/{categoryName}",
      "/api/items/{subcategoryName}",
    ],
    target: "https://localhost:7275",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
