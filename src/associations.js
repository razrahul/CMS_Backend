// const Auction = require("./models/auction");
// const AuctionCategory = require("./models/auctionCategory");
const Roles = require("./models/role");
const Users = require("./models/user");
const Companys = require("./models/company");

// Role and user (one to many)
Users.belongsTo(Roles, { foreignKey: "roleId", targetKey: "uuId", as: "role" });
Roles.hasMany(Users, { foreignKey: "roleId",sourceKey: "uuId",  as: "users" });

Users.belongsTo(Companys, { foreignKey: "company", targetKey: "uuId", as: "companyData" });
Companys.hasMany(Users, { foreignKey: "company", sourceKey: "uuId", as: "users" });



// user and auction (one to many)
// Users.hasMany(Auction, { foreignKey: "created_by", as: "createdAuctions" });
// Auction.belongsTo(Users, { foreignKey: "created_by", as: "creator" });

// // auction category and auctions (one to one )
// AuctionCategory.hasOne(Auction, { foreignKey: "category_id", as: "auction" });
// Auction.belongsTo(AuctionCategory, {
//   foreignKey: "category_id",
//   as: "category",
// });
