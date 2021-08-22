'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Choice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Choice.belongsToMany(models.Quiz, { through: models.QuizzesQuestionsChoices } )
      Choice.belongsToMany(models.Question, { through: models.QuizzesQuestionsChoices } )


    }
  };
  Choice.init({
    choice: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Choice',
  });
  return Choice;
};