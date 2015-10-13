module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'banco',
        {
            coin: {
                type: DataTypes.INTEGER
            }
        }
    );
};