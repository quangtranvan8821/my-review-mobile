import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./Login/reducer";
const AppReducer = combineReducers({
    AuthReducer
})
const rootReducer = (state, action) => {
    return AppReducer(state,action)
}
let store = createStore(rootReducer, applyMiddleware(thunk));
export default store;