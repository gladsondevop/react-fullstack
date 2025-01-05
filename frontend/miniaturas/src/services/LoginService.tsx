import axiosInstance from "../infra/axiosInstance";

class LoginService {
    apiUrl = import.meta.env.VITE_API_URL;

    login(usuario:string, senha:string) {
        return axiosInstance.post(this.apiUrl + "/auth/login", {email: usuario, password:senha})
    }

    myProfile() {
        return axiosInstance.get(this.apiUrl + "/auth/my-profile")
    }

}
export default LoginService;