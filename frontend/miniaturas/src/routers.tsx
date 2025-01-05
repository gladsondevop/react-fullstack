import { BrowserRouter, Route, Routes } from "react-router-dom";
import MiniaturaList from "./content/MiniaturaList";
import MiniaturaForm from "./content/MiniaturaForm";
import Layout from "./components/layout";
import RequiredAuth from "./content/login/RequiredAuth";
import Login from "./content/login/Login";

const Routers = () => {
    return (
      <>
        <BrowserRouter>
          <Layout >
            <Routes>
              <Route path="/" element={<RequiredAuth><MiniaturaList /></RequiredAuth>}  />
              <Route path="/login" element={<Login />}  />
              <Route path="/inicial" element={<RequiredAuth><MiniaturaList /></RequiredAuth>}  />
              <Route path="/cadastro" element={<RequiredAuth><MiniaturaForm /></RequiredAuth> } />
              <Route path="/cadastro/:id" element={<MiniaturaForm />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </>
    );
  };
  
  export default Routers;
