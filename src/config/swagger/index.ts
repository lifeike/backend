// In src/v1/swagger.js
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

// Basic Meta Informations about our API
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Feeco Express API with Swagger",
      version: "0.1.0",
      description: "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Feeco",
        url: "https://main.d3nhqx7mts8be0.amplifyapp.com/",
        email: "lifeike67@gmail.com",
      },
    },
    servers: [{ url: "staging" }, { url: "prod" }],
  },
  apis: ["./src/routes/movie.ts"],
}

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options)

// Function to setup our docs
const swaggerDocs = (app: any, port: any) => {
  // Route-Handler to visit our docs
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  // Make our docs in JSON format available
  app.get("/api/v1/docs.json", (req: any, res: any) => {
    res.setHeader("Content-Type", "application/json")
    res.send(swaggerSpec)
  })
  console.log(`Version 1 Docs are available on http://localhost:${port}/api/v1/docs`)
}

export default swaggerDocs
