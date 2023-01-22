const sequelize = require('../db.js');
const { DataTypes } = require('sequelize');

const Todo = sequelize.define(
  'todo',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true },
);

module.exports = {
  Todo,
};
