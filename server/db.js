const Sequilize = require('sequelize');

module.exports = new Sequilize('perntodo', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});
