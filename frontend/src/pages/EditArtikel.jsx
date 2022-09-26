import {React, useEffect} from 'react'
import Layout from './Layout'
import FormEditArtikel from '../components/FormEditArtikel'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getMe} from "../features/AuthSlice"

const EditArtikel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {iserror} = useSelector((state => state.auth));
  
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch])

  useEffect(() => {
    if(iserror){
      navigate("/");
    }
  }, [iserror, navigate]);

  return (
    <Layout>
            <FormEditArtikel/>

    </Layout>
  )
}

export default EditArtikel;