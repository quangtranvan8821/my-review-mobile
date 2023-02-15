import { LOGIN } from "./const";
const initState = {
    token: null,
    info: null,
    listPermission:[]
}
const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN: return {
            ...state,
            infoUser: action.payload
        }
        default: return {...state}
    } 
}
export default AuthReducer