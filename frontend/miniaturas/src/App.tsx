import Container from "./components/container";
import Login from "./content/login/Login";

function App ({children}) {
    const token = localStorage.getItem("token");
    return (
        <>{token ? <Container /> : <main className="login-container"><Login/></main>}</>
    );
}
export default App;