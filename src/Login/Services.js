// All api calls will be done in service

// function joinUrl(baseUrl,url){
//     return `${baseUrl}/${url}`
// }

// class Servises{
//     constructor(){
//         this.domain = "http://localhost:3000"
//     }

//     request(url,method="POST",data="null"){
//         url = joinUrl(this.domain,url)
//         const options={
//             method,
//         }
//         if(data){
//             options.body = JSON.stringify({...data})
//         }
//         return fetch(url,options)
//     }

//     post(url,data){
//         const method = "POST"
//         return this.request(url,method,data).then(response =>response.json())
//     }

//     put(url,data){
//         const method = "PUT"
//         return this.request(url,method,data).then(response =>response.json())
//     }
// }

// export default Servises





// ----------------------  All api calls will be done in service  ------------------------
    
// const API_URL = 'https://apis.ccbp.in/login'

const API_URL = 'http://localhost:3000'

export const SIGN_UP_API_URL = `${API_URL}/${''}`
export const LOGIN_API_URL = `${API_URL}/${''}`
export const OTP_API_URL = `${API_URL}/${''}`
export const RESETPASSWORD_API_URL = `${API_URL}/${''}`
export const PHONE_API_URL = `${API_URL}/${''}`
export const FORGOTPASSWORD_API_URL = `${API_URL}/${''}`

