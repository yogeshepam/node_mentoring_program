
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        age: DataTypes.INTEGER,
        id: DataTypes.INTEGER,
        isDeleted: DataTypes.BOOLEAN,
        login: DataTypes.STRING,
        password: DataTypes.STRING
    }, {});
    User.associate = function (models) {
    // associations can be defined here
    };
    return User;
};
