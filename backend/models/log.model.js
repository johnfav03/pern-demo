module.exports = (sequelize, Sequelize) => {
    const Log = sequelize.define("log", {
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        },
        public: {
            type: Sequelize.BOOLEAN
        }
    });
    return Log;
};