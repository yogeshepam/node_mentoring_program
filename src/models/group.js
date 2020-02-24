
module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        name: DataTypes.STRING,
        permissions: DataTypes.ARRAY(DataTypes.STRING)
    }, {});
    Group.associate = function (models) {
    // associations can be defined here
        Group.belongsToMany(models.User, {
            through: models.UserGroup,
            as: 'users',
            foreignKey: 'groupId'
        });
    };
    return Group;
};
