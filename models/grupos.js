module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'grupos',
        { nombre: {
            type: DataTypes.STRING,
            validate: { notEmpty: {msg: "-> Falta Nombre"} }
        }
    }
    );
};
