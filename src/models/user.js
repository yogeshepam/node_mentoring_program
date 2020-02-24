module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        age: DataTypes.INTEGER,
        isDeleted: DataTypes.BOOLEAN,
        login: DataTypes.STRING,
        password: DataTypes.STRING
    }, {});

    User.associate = (models) => {
    // associations can be defined here
        User.belongsToMany(models.Group, {
            through: models.UserGroup,
            as: 'groups',
            foreignKey: 'userId'
        });
    };

    return User;
};
