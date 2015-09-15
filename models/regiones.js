module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'region',
        { nombre: {
            type: DataTypes.STRING,
            validate: { notEmpty: {msg: "Falta Nombre"} }
        }
    }
    );
};
