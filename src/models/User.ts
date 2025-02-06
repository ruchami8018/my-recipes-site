import { useContext,createContext } from "react"
import { useState } from "react"
import { userReducer } from "../store/UserStore"
import { Action } from "./Action"

export type User={
    id?:string,
    firstName?:string,
    lastName?:string,
    passward?:string,
    email?:string,
    address?:string,
    phone?:string,
    isLoggedIn?:boolean
}
