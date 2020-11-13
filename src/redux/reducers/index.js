import { combineReducers } from "redux";
import settings from "./settings";
import user from "./user";
import role from "./role";

export default combineReducers({ settings, role, user });
