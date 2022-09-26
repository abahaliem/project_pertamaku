import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"



const FormArtikel = () => {
    const [title, setTitle] = useState("");
    const [deskripsi,setDeskripsi] = useState("");
    const [file, setFile] = useState([])
    const [preview, setPreview] = useState("")
    const [msg, setMsg] = useState("")
    const navigate = useNavigate();


    const loadImage = (e) => {
    const image = e.target.files[0]; 
    setFile(image);
    setPreview(URL.createObjectURL(image))
   };

    const saveArtikel = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("deskripsi", deskripsi);
        formData.append("file", file);
    try { 
          
            await axios.post('http://localhost:5000/artikel',formData ,{
              headers : {
                "Content-type" : "multipart/form-data",
              },
            });      
       
        navigate("/artikel")

            } catch (error) {
                    if (error.response){
                        setMsg(error.response.data.msg)
                    }

            }
        };

  return (
    <div>
        <div>
        <h1 className='title'>Artikel</h1>
        <h2 className='subtitle'>Add New Artikel</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                 <form onSubmit={saveArtikel}>
                    <p className="has-text-centered">{msg}</p>
                    <div className='field'>
                        <label className='label'>Judul Artikel</label>
                        <div className="control">
                            <input type="text" 
                            className="input" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Judul Artikel'/>
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label'>Deskripsi</label>
                        <div className="control">
                            <input type="text" 
                            className="input" 
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            placeholder='Diskripsi'/>
                        </div>
                    </div>


                            <div className="file has-name">
                                <label className="file-label">
                                    <input className="file-input" 
                                            type="file" 
                                            onChange={loadImage}/>
                                    <span className="file-cta">
                                    <span className="file-icon">
                                        <i className="fas fa-upload"></i>
                                    </span>
                                    <span className="file-label">
                                        Choose a file…
                                    </span>
                                    </span>
                                   </label>
                                </div>
                                {preview ? (
                                    <figure className="image is-128x128">
                                    <img src={preview} alt="Preview Image" />
                                    </figure>
                                ) : (
                                    ""
                                )}
                      <div className="field">
                       <div className="control">
                          <button type="submit" className="button is-success" >Save</button>
                        </div>
                    </div>
                   
                </form>  
                </div>
            </div>
        </div>
    </div>
 </div>
  )
}

export default FormArtikel


