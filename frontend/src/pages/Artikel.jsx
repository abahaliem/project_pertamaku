import {React, useEffect} from 'react'
import Layout from './Layout'
import Artikellist from '../components/Artikellist'
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {getMe} from "../features/AuthSlice"

const Artikel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state => state.auth));

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if(isError){
      navigate ("/");
    }
  }, [isError,navigate]);

  return (
  <Layout>
        <Artikellist/>
  </Layout>
  )
}

export default Artikel