import axios from "axios";
import { Miniatura } from "../model/miniatura";

class MiniaturaService {
    serverPath = "/minis"

    save(miniatura:Miniatura) {
        return axios.post("http://localhost:8080" + this.serverPath, miniatura)
    }

    getAllPaginated(page:number, limit:number) {
        return axios.get("http://localhost:8080" + this.serverPath, {
            headers: {
                "page": page,
                "size": limit
            }
        })
    }

    delete(id:number) {
        return axios.delete("http://localhost:8080" + this.serverPath + '/' + id)
    }

    getById(id:number) {
        return axios.get("http://localhost:8080" + this.serverPath + '/' + id)
    }

    update(miniatura:Miniatura) {
        return axios.put("http://localhost:8080" + this.serverPath, miniatura)
    }

}
export default MiniaturaService;