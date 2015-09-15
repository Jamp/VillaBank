module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'distritos',
        { nombre: {
            type: DataTypes.STRING,
            validate: { notEmpty: {msg: "-> Falta Nombre"} }
        }
    }
    );
};