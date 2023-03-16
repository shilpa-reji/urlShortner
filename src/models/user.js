const url = (sequelize, DataTypes) => {
    const url = sequelize.define('url', {
      originalUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shortUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
    });
    
    return url;
  };
  export default url;