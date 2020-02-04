module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'Users',
            [
                {
                    age: 25,
                    isDeleted: false,
                    login: 'temp@gmail.com',
                    password: '1ER',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    age: 29,
                    isDeleted: false,
                    login: 'temp2@gmail.com',
                    password: '1ER',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    age: 99,
                    isDeleted: false,
                    login: 'temp3@gmail.com',
                    password: '1ER',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', [
            {
                first_name: 'John'
            }
        ]);
    }
};
