module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'regiones',
        { nombre: {
            type: DataTypes.STRING,
            validate: { notEmpty: {msg: "-> Falta Nombre"} }
        }
    }
    );
};
