const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Backend API',
    version: '1.0.0',
    description: 'API documentation for frontend integration',
  },
  servers: [
    {
      url: 'https://ardonis-js-3.onrender.com',
    },
  ],

    // ✅ ADD THIS PART HERE
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  },
}

export default swaggerDefinition