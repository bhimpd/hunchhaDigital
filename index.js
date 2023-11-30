const express = require("express");
const bodyParser = require("body-parser");

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());


const taskRouter = require("./src/routes/taskRoutes");
app.use("/task",taskRouter);
const loginRoute = require("./src/routes/loginRoute");
app.use("/login",loginRoute);



const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'TASK API',
        version: '1.0.0',
        description: 'This is an API for task CRUD Operation.',
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
        },
      ],
      components: {
        schemas: {
          Tasks: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
              },
              status: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    apis: ['./src/routes/*.js'],
  };
  
  
  const specs = swaggerJSDoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.listen(PORT, ()=>{
    console.log(`server is running at PORT No. ${PORT}`)
})
