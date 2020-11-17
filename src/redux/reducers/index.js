import { combineReducers } from "redux";
import settings from "./settings";
import user from "./user";
import role from "./role";
import category from "./category";

export default combineReducers({ settings, role, category, user });
