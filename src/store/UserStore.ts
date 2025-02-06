import { createContext } from "react"
import { Action } from "../models/Action"
import { User } from "../models/User"

const initialState: User = {
    id: '',
    firstName: '',
    lastName: '',
    passward: '',
    email: '',
    address: '',
    phone: '',
    isLoggedIn: false
}
export const UserContext=createContext<{
    currentUser: User,userDispatch:React.Dispatch<Action>}>
    ({currentUser:initialState,userDispatch:()=>{}});

export const userReducer=(current = initialState,action:Action): User =>{
    switch(action.type)
    {
        case 'CREATE':
            return {
              ...current, 
              ...action.new_data,
              isLoggedIn: true
             }
        case 'UPDATE':
            return {
                ...current, 
                ...action.new_data
            }
        default:
            return current

    }

}
