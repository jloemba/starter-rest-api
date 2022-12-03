'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lyrics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
  
    }
  };
  Lyrics.init({
    lyricsContent: DataTypes.STRING,
    songId: DataTypes.INTEGER,
    partId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Lyrics',
  });
  
  Lyrics.associate = function(models) {
    Lyrics.belongsTo(models.Song, {
      foreignKey: 'songId',
      onDelete: 'CASCADE'
    })

    Lyrics.belongsTo(models.Part, {
      foreignKey: 'partId',
      onDelete: 'CASCADE'
    })
  };

  return Lyrics;
};