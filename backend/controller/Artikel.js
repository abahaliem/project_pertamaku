import Artikel from "../models/ArtikelModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";

export const getArtikel = async (req, res) => {
   try {
        let response;
        if(req.role === "admin"){
            response = await Artikel.findAll({
                attributes : ['uuid','title','deskripsi','url','image'],                
                include:[{
                        model : User,
                        attributes : ['name','email'] 
            }]
            })
        }else {
            response = await Artikel.findAll({
                attributes : ['uuid','title','deskripsi','url','image'],
                where : {
                    userId: req.userId
                },
                include : [{
                    model : User,
                    attributes : ['name','email'] 
                }]
               
            })
           
        }
        res.status(200).json({response});
   } catch (error) {
        res.status(500).json({msg: error.message});
   }
}


export const createArtikel = async (req, res) => {
    if(req.files === null) return res.status(400).json({msg:"no file uploaded"});  
    const {title, deskripsi, image,url} = req.body;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const urllink = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg', '.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg:"image must be less than 5 MB"});
    file.mv(`./public/images/${fileName}`, async(err) => {
        if(err) return res.status(500).json({msg:err.message});
        try {
        await Artikel.create({
                    title : title,
                    deskripsi :deskripsi,
                    image: fileName,
                    url : urllink,
                    userId : req.userId
                })
                res.status(201).json({msg: " Artikel Created Successfuly"});
            } catch (error) {
                res.status(500).json({msg: error.message});
            }
        })
    }



export const getArtikelById = async (req, res) => {
    try {
        const artikel = await Artikel.findOne({
            where : {
                uuid : req.params.id
            }
        });
        if(!artikel) return res.status(404).json({msg:"Data tidak ditemukan"});
        let response ;
        if(req.role === "admin") {
            response = await Artikel.findOne({
               attributes: ['uuid', 'title', 'deskripsi', 'url', 'image'],
               where: {
                    id: artikel.id
               },
               include : [{
                    model : User,
                    attributes : ['name','email']
               }]
            });
        }else {
            response = await Artikel.findOne({
                attributes:['uuid', 'title', 'deskripsi', 'url', 'image'],
                where : {
                    [Op.and] : [{id: artikel.id}, {userId: req.userId}]
                },
                include:[{
                    model : User,
                    attributes: ['name','email']
                }]

            });
        }
        res.status(200).json(response);
    }catch (error) {
        res.status(500).json({msg:error.message});
    }
}


// UPDATE ARTIKEL

export const updateArtikel = async (req, res) => {
    try {
        const artikel = await Artikel.findOne({
            where :{
                uuid: req.params.id
            }
        });
        if(!artikel) return res.status(404).json({msg: "Data tidak ditemukan"});
                           
      //  const {title, deskripsi, image, url} = req.body;
        let fileName = "";
        if (req.files === null) {
            fileName = Artikel.image;

        }else{

            const file = req.files.file;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            fileName = file.md5 + ext;
           
            const allowedType = ['.png','.jpg','.jpeg'];
            if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid Images"});
            if(fileSize > 5000000) return res.status(422).json({msg:"image must be less than 5 MB"});
          
            const filepath = `./public/images/${artikel.image}`;
            fs.unlinkSync(filepath);
            file.mv(`./public/images/${fileName}`,(err) => {
             if(err) return res.status(500).json({msg:err.message});
        })

    }
        const {title, deskripsi, image,url} = req.body;
        const urllink = `${req.protocol}://${req.get("host")}/images/${fileName}`;

        if(req.role === "admin"){
            await Artikel.update({
                title: title, 
                deskripsi : deskripsi,
                image: fileName,
                url : urllink
             },{
                where:{
                    id : artikel.id
                }
            });
         }else{
            if(req.userId !== artikel.userId) return res.status(403).json({msg:"Akses dilarang"});
             await Artikel.update({
                title : title, 
                deskripsi : deskripsi, 
                image : fileName, 
                url : urllink
            },{
                where : {
                    [Op.and] : [{id: artikel.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Artikel berhasil di updated"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}



// DELETE ARTIKEL

export const deleteArtikel = async (req, res) => {
    try {
        const artikel = await Artikel.findOne({
            where :{
                uuid: req.params.id
            }
        });
        if(!artikel) return res.status(404).json({msg: "Data tidak ditemukan"});
      //  const filepath = `./public/images/${artikel.image}`;
        if(req.role === "admin"){
        const filepath = `./public/images/${artikel.image}`;
        fs.unlinkSync(filepath);
         await Artikel.destroy({
                where:{
                    id : artikel.id                 
                }
            });6
         }else{
            if(req.userId !== artikel.userId) return res.status(403).json({msg:"Akses dilarang"});
             await Artikel.destroy({
                where : {
                    [Op.and] : [{id: artikel.id}, {userId: req.userId}]
                }
            });
    }
        res.status(200).json({msg: "Deleted succesfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

