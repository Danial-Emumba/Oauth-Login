const Provider = require("./provider");
const User = require("./user");

User.hasMany(Provider, { onDelete: "cascade" });
Provider.belongsTo(User);
