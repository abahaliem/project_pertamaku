import {BrowserRouter, Routes, Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Artikel from "./pages/Artikel";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddArtikel from "./pages/AddArtikel";
import EditArtikel from "./pages/EditArtikel";

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/users" element={<Users/>}/>
              <Route path="/users/add" element={<AddUser/>}/>
              <Route path="/users/edit/:id" element={<EditUser/>}/>
              <Route path="/artikel" element={<Artikel/>}/>
              <Route path="/artikel/add" element={<AddArtikel/>}/>
              <Route path="/artikel/edit/:id" element={<EditArtikel/>}/>

              
        </Routes>

      </BrowserRouter>
     </div>
  );
}

export default App;
