import { createStore, applyMiddleware } from "redux";
import { useDispatch } from "react-redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunk)));

//  AppDispatch type that correctly knows about thunks and declare that dispatch here is that type
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
