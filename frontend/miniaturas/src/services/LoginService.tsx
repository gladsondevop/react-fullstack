import axios from "axios";

class LoginService {
    serverPath = "/auth/login"

    login(usuario:String, senha:String) {
        return axios.post("http://localhost:8080" + this.serverPath, {email: usuario, password:senha})
    }

}
export default LoginService;