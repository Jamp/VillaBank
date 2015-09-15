module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'grupo',
        { nombre: {
            type: DataTypes.STRING,
            validate: { notEmpty: {msg: "Falta Nombre"} }
        }
    }
    );
};
