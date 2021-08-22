'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizzesQuestionsChoices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  QuizzesQuestionsChoices.init({
    questionId: DataTypes.INTEGER,
    quizId: DataTypes.INTEGER,
    choiceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QuizzesQuestionsChoices',
    timestamps: false,
  });
  return QuizzesQuestionsChoices;
};