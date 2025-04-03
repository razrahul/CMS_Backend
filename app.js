//root file (server ceated here)
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const sequelize = require("./src/config/dbConnect");
const Roles = require("./src/models/role");
const Users = require("./src/models/user");
const Companys = require("./src/models/company");
const indexRouter = require("./src/routes/index");
require('./src/associations');

const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.use("/api/V1", indexRouter);

//server listen
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  try {
    console.log(`Server is running on port ${PORT}`);
    //db connection check
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await Roles.sync({ force: false });
    await Companys.sync({ force: false }); 
    await Users.sync({ force: false });
  } catch (error) {
    console.log("Error", error.message);
  }
});
