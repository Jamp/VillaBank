var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
//var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/i);
var url = "sqlite://:@:/".match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/i);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
//var storage  = process.env.DATABASE_STORAGE;
var storage = "villabank.sqlite";

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }
);

// Tablas
var jovenes_path = path.join(__dirname, 'jovenes');
var Jovenes = sequelize.import(jovenes_path);

var estaciones_path = path.join(__dirname, 'estaciones');
var Estaciones = sequelize.import(estaciones_path);

var grupos_path = path.join(__dirname, 'grupos');
var Grupos = sequelize.import(grupos_path);

var distritos_path = path.join(__dirname, 'distritos');
var Distritos = sequelize.import(distritos_path);

var regiones_path = path.join(__dirname, 'regiones');
var Regiones = sequelize.import(regiones_path);

// Relaciones
Jovenes.belongsTo(Grupos);
Grupos.hasMany(Jovenes);

Grupos.belongsTo(Distritos);
Distritos.hasMany(Grupos);

Distritos.belongsTo(Regiones);
Regiones.hasMany(Distritos);

// Modelos
exports.sequelize = sequelize;
exports.Jovenes = Jovenes;
exports.Estaciones = Estaciones;
exports.Grupos = Grupos;
exports.Distritos = Distritos;
exports.Regiones = Regiones;

// Iniciando con Estructuras
sequelize.sync().then(function () {
    Regiones.count().then( function (count) {
        if (count == 0) {
            Regiones.bulkCreate( [
                { nombre: 'Falcón' }
            ]).then(function (){
                console.log('Creando Región');
                Distritos.bulkCreate( [
                    { nombre: 'Paraguaná', regionId: 1 },
                    { nombre: 'Manaure', regionId: 1 },
                ]).then(function () {
                    console.log('Creando Distritos');
                    Grupos.bulkCreate( [
                        { nombre: 'Nazaret', distritoId: 1 }
                    ]).then(function () {
                        console.log('Creando Grupo');
                    });
                });
            });
        }
    });
});
