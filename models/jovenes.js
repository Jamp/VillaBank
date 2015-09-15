module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'jovenes',
        { nombres: {
            type: DataTypes.STRING,
            validate: { notEmpty: {msg: "Falta Nombres"} }
        },
        apellidos: {
            type: DataTypes.STRING,
            validate: { notEmpty: {msg: "Falta Apellidos"} }
        }
    });
};
