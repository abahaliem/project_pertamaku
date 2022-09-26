import sequelize from "sequelize";

const db = new sequelize ('project_db','root','presidenalim',{
    host : "localhost",
    dialect : "mysql"
});



export default db;