import axios from "axios"
interface IAuthenticateResponse{
    access_token:string
}
interface IUserDataResponse{
    name:string,
    id:string,
    avatar_url:string,
    login:string
}

class AuthenticateUserService{
    async execute(code:String){
        const url = "https://github.com/login/oauth/access_token"
        const {data} = await axios.post<IAuthenticateResponse>(url, null, {
            params:{
                client_id:process.env.GITHUB_CLIENT_ID,
                client_secret:process.env.GITHUB_CLIENT_SECRET,
                code
            },
            headers:{
                "Accept":"application/json"
            }
        })
        console.log(data.access_token)
        const response = await axios.get<IUserDataResponse>("https://api.github.com/user",{
            headers:{
                authorization:`Bearer ${data.access_token}`
            }
        })
        return response.data
    }
}

export {AuthenticateUserService}