import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import MiniaturaList from "./content/MiniaturaList";
import MiniaturaAddForm from "./content/MiniaturaAddForm";
import MiniaturaEditForm from "./content/MiniaturaEditForm";

const Routers = () => {
    return (
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<MiniaturaList />} />
            <Route path="/cadastro" element={<MiniaturaAddForm />} />
            <Route path="/cadastro/:id" element={<MiniaturaEditForm />} />
            {/* <Route path="/detalhes/:id" element={<Detalhes />} /> */}
          </Routes>
        </Layout>
      </BrowserRouter>
    );
  };
  
  export default Routers;
