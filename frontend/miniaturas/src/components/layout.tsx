import Container from "./container";
import Footer from "./footer";
import Header from "./header";
import Menu from "./menu";

function Layout ({children}) {
    return (
        <>
            <Container>
                <Header />
                <Menu />
                <main className="container">{children}</main>
                <Footer />
            </Container>
        </>
    );
}

export default Layout;