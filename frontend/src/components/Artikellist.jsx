import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import axios from "axios";

const Artikellist = () => {
    const [artikel, setArtikel] = useState ([]);
   
    useEffect(() => {
        getArtikel();
    }, [])
  
    const getArtikel = async () => {
        const response = await axios.get('http://localhost:5000/artikel');
       // console.log(response)
        setArtikel(response.data.response);
    }
   
    const deleteArtikel = async (artikelid) => {
        await axios.delete(`http://localhost:5000/artikel/${artikelid}`) ;
        getArtikel();
    } 
  return (
    <div>
        <h1 className='title'>Artikel</h1>
        <h2 className='subtitle'>List Of Artikel</h2>
        <Link to="/artikel/add" className='button is-primary mb-2'>Add New</Link>
        
        <table className='table is-striped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Judul Artikel</th>
                    <th>Deskripsi</th>
                    <th>Image</th>
                    <th>Created By</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {artikel.map((artikel, index) => (
                    <tr key={artikel.uuid}>
                    <td>{index + 1}</td>
                    <td>{artikel.title}</td>
                    <td>{artikel.deskripsi}</td>
                    <td>
                    <figure className="image is-5by4">
                         <img className="is-rounded" src= {artikel.url} />
                    </figure>                  
                    </td>

                    <td>{artikel.user.name}</td>
                    <td>
                        <Link to ={`/artikel/edit/${artikel.uuid}`} className="button is-small is-info">Edit</Link>
                        <button onClick={() => deleteArtikel(artikel.uuid)} className="button is-small is-danger">Hapus</button>
                    </td>
                </tr>  

                ))} 
              
            </tbody>
        </table>

    </div>
  )
}

export default Artikellist