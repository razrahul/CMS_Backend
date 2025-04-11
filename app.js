//root file (server ceated here)
const express = require("express");
// require("dotenv").config();
const cors = require("cors");
const sequelize = require("./src/config/dbConnect");
const Roles = require("./src/models/role");
const Users = require("./src/models/user");
const Companys = require("./src/models/company");
const indexRouter = require("./src/routes/index");
const { tableSync } = require("./src/utils/commonMethod");
require('./src/associations');

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

//swagger
const fs = require("fs");
const { fileURLToPath } = require("url");
const path = require("path"); 
const  YAML = require("yaml");
const swaggerUi = require("swagger-ui-express");

const PORT = process.env.PORT || 3001;

// console.log("__filename:", __filename);
// console.log("__dirname:", __dirname);


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const file = fs.readFileSync(path.resolve(__dirname, './swagger.yaml'), 'utf8');
const swaggerDocument = YAML.parse(
  file?.replace(
    "- url: ${{server}}",
    `- url: ${process.env.SWAGGER_HOST_URL || `http://localhost:${PORT}`}/api/v1`
  )
);
// console.log("file",file);

// console.log("swaggerDocument",swaggerDocument);


const app = express();

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: { docExpansion: "none" },
    customSiteTitle: "CMS - Contact User Dashboard API Docs",
  })
);

//middleware
app.use(express.json());
app.use(cors());

app.use("/api/V1", indexRouter);

//server listen

app.listen(PORT, async () => {
  try {
    console.log(`Server is running on port ${PORT}`);
    //db connection check
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    // await Roles.sync({ force: false });
    // await Companys.sync({ force: false }); 
    // await Users.sync({ force: false });
    await tableSync();
  } catch (error) {
    console.log("Error", error.message);
  }
});
