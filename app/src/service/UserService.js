import axios from "axios";
const baseurl = process.env['REACT_APP_URL']


const HandleLogin = async (email_input, password_input) => {
    console.log(baseurl)
    return await axios.post(`${baseurl}/api/login`, {
        email: email_input,
        password: password_input

    })
}


export {
    HandleLogin,
}