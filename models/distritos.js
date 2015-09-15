module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'distrito',
        { nombre: {
            type: DataTypes.STRING,
            validate: { notEmpty: {msg: "Falta Nombre"} }
        }
    }
    );
};