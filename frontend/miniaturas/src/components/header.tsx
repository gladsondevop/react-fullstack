import { Toaster } from "react-hot-toast";
import Logo from "../assets/images/logo.jpg"

function Header() {
    return (
        <header>
            <Toaster />
            <div className="logo">
                <img src={Logo}/>
            </div>
        </header>
    );
}

export default Header;