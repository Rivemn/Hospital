const PROXY_CONFIG = [
  {
    context: [ "/api/doctors",
      "/api/doctors/{doctorId}",
      "/api/doctors/{firstName}/{lastName}",
      "/api/doctors/id/{firstName}/{lastName}",


      "/api/chats",
      "/api/chats/{customerId}",
      "/api/chats/participants",

      "/api/messages",
      "/api/messages/{chatId}",
      "/api/chats/by-names",

      "/api/appointments",
      "/api/appointments/{id}",

      "/api/orders",
      "/api/orders/{id}",

      "/api/shoppingcart",
      "/api/shoppingcart/{id}",

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
