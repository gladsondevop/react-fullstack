import Login from "../content/login/Login";
import Container from "./container";
import Footer from "./footer";
import Header from "./header";
import Menu from "./menu";

function Layout ({children}) {
    const token = localStorage.getItem("token");
    return (
        <>
            
            {token ? <Container>
                <Header />
                <Menu />
                <main className="container">{children}</main>
                <Footer />
            </Container> : <main className="login-container"><Login/></main>}
        </>
    );
}

export default Layout;