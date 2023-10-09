module.exports = (sequelize, Sequelize) => {
    return sequelize.define("cricketers", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        age: {
            type: Sequelize.INTEGER,
        },
        dob: {
            type: Sequelize.DATE,
        }
    })
}