import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FormEditArtikel = () => {
    const [title, setTitle] = useState("");
    const [deskripsi,setDeskripsi] = useState("");
    const [file, setFile] = useState("");
    const [msg, setMsg] = useState("")
    const [preview, setPreview] = useState("");
    const { id } = useParams() ;
    const navigate = useNavigate();

    useEffect(()=> {
        getArtikelById();
    },[id]);
    

        const getArtikelById = async () => {
            // try {
                const response = await axios.get(`http://localhost:5000/artikel/${id}`)
                setTitle(response.data.title);
                setDeskripsi(response.data.deskripsi);
                setFile(response.data.image);
                setPreview(response.data.url);
        };

            const loadImage = (e) => {
                const image = e.target.files[0];
                setFile(image);
                setPreview(URL.createObjectURL(image));
            };

        const updateArtikel = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append("title", title);
            formData.append("deskripsi",deskripsi);
            formData.append("file",file);

         try {
        
            await axios.patch(`http://localhost:5000/artikel/${id}`, formData, {
              headers:{
                "Content-type" : "multipart/form-data",
              },
            });

        navigate("/artikel");
        } catch (error) {
            if(error.response) {
               
                setMsg(error.response.data.msg);
            }
            
        }
    };


  
    return (
    <div>
        <div>
        <h1 className='title'>Artikel</h1>
        <h2 className='subtitle'>Edit Artikel</h2>
       
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                 <form onSubmit={updateArtikel}>
                    <p className='has-text-centered'>{msg}</p>
                    <div className='field'>
                        <label className='label'>Judul Artikel</label>
                        <div className="control">
                            <input 
                            type="text" 
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
                            onChange= {(e) => setDeskripsi(e.target.value)}
                            placeholder='Diskripsi'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">image</label>
                        <div className="control">
                            <div className='file'>
                             <label className='file-label'>   
                            <input type="file" 
                            className="file-input" 
                            onChange={loadImage}
                            />

                            <span className='file-cta'>
                                <span className='file-label'> choose a file .. </span>
                            </span>
                            </label>
                        </div>

                      </div>
                       
                    </div>
                 
                                {preview ? (
                        <figure className="image is-128x128">
                        <image src={preview} alt="Preview Image" />
                        </figure>
                    ) : (
                        ""
                    )}

                   <div className="field">
                       <div className="control">
                        <button type="submit" className="button is-success" >Update</button>
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


export default FormEditArtikel