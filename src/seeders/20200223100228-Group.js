const PERMISSIONS = require('../utils/enums');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'Groups',
            [
                {
                    name: 'Mentor',
                    permissions: [
                        PERMISSIONS.READ,
                        PERMISSIONS.WRITE,
                        PERMISSIONS.DELETE,
                        PERMISSIONS.SHARE,
                        PERMISSIONS.UPLOAD_FILES
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'Mentee',
                    permissions: [
                        PERMISSIONS.READ,
                        PERMISSIONS.SHARE,
                        PERMISSIONS.UPLOAD_FILES
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {});
    },

    down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    }
};
