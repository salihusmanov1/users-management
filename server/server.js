const app = require("./app");
const db = require('./models')

db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server running on port: 5000');
  });
}) 
