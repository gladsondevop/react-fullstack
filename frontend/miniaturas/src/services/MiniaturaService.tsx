import axios from "axios";
import { Miniatura } from "../model/miniatura";

class MiniaturaService {

    apiUrl = import.meta.env.VITE_API_URL;

    serverPath = "/minis"

    save(miniatura:Miniatura) {
        return axios.post(this.apiUrl + this.serverPath, miniatura)
    }

    getAllPaginated(page:number, limit:number, filterValue:string) {
        return axios.get(this.apiUrl + this.serverPath, {
            headers: {
                "page": page,
                "size": limit,
                "filterValue": filterValue
            }
        })
    }

    delete(id:number) {
        return axios.delete(this.apiUrl + this.serverPath + '/' + id)
    }

    getById(id:number) {
        return axios.get(this.apiUrl + this.serverPath + '/' + id)
    }

    update(miniatura:Miniatura) {
        return axios.put(this.apiUrl + this.serverPath, miniatura)
    }

}
export default MiniaturaService;