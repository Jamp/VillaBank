module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'estaciones',
        { nombre: {
            type: DataTypes.STRING,
            validate: { notEmpty: {msg: "Falta Nombre"} }
        }, maximo: {
            type: DataTypes.INTEGER,
            validate: { notEmpty: {msg: "Falta Máximo"} }
        }, tipo: {
            type: DataTypes.BOOLEAN,
            validate: { notEmpty: {msg: "Falta Tipo"} }
        }
    }
    );
};