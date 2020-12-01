import React, {useState} from 'react'
import {useGlobalState} from '../config/store' 
import {loginUser} from "../services/authServices"

const Login = ({history}) =>{  
    
    const initialFormState = {
        username: "",
        password: ""
    }

    const [userDetails,setUserDetails] = useState(initialFormState)
    const {dispatch} = useGlobalState() 

    const detailsChange = (event) =>{ 
        const name = event.target.name
        const value = event.target.value
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }

    const loginSubmit = (event) =>{ 
      event.preventDefault()    
      
      console.log(userDetails)
      
      loginUser(userDetails) 
      .then(() =>{ 
          dispatch({ 
              type: "setLoggedInUser", 
              data: userDetails.username
          }) 
          history.push("/")
      }) 
      .catch((error) => {
        console.log(`Error : ${error}`)
    })	
    }

    return( 
        <div> 
            its me login  
     

            <form onSubmit={loginSubmit}>
            <div>
                <label>Username</label>
                <input required type="text" name="username" placeholder="Enter a username" onChange={detailsChange}></input>
            </div>
            <div>
                <label>Password</label>
                <input required type="password" name="password" placeholder="Enter a password" onChange={detailsChange}></input>
            </div>
            <input type="submit" value="Login"></input>
            
        </form>
        </div>
    )
}



export default Login