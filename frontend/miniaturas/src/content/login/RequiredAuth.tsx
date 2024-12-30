
function RequiredAuth(props){
    if(localStorage.getItem("token")){
        return props.children;
    }else{
        window.location.reload();
    }
}
export default RequiredAuth;