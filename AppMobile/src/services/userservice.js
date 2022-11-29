// import axios from "../axios"
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseurl = process.env['REACT_APP_URL']



sendDataLogin =(email,password) =>{
    
    fetch(`${baseurl}/api/login`,{
        method: 'POST',
        data: {
            
        }
    }) 

    
}





export { sendDataLogin } 