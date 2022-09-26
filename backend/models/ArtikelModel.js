import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "../models/UserModel.js";

const {DataTypes} = Sequelize;

const Artikel = db.define('artikel',{
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate : {
            notEmpty: true
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
      },
      
    deskripsi: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
      },
    image:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    url:{
        type: DataTypes.STRING,
        //allowNull: false
    },
    
    artikelId: {
        type : DataTypes.INTEGER,
        // allowNull: false,
        // // validate: {
        // //     notEmpty: false
        // // }
    }


},{
    freezeTableName : true
});

Users.hasMany(Artikel);
Artikel.belongsTo(Users, {foreignKey: 'userId'});


export default Artikel;

// (async () => {
//     await db.sync();
// }) ();

