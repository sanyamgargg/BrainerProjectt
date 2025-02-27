
import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";



function Signin(){

      const usernameRef = useRef<HTMLInputElement>(null);
        const passwordRef = useRef<HTMLInputElement>(null);
        const navigate = useNavigate() ;
    
        async function signin() {
            const username = usernameRef.current?.value;
            console.log(username) ;
            const password = passwordRef.current?.value;
    
            if (!username || !password) {
                alert("Please enter both username and password.");
                return;
            }

            try {
                const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                    username,
                    password
                });

                const jwt = response.data.token ;
                localStorage.setItem("token",jwt) ;
                //redirect to the dashboard
                navigate("/dashboard") ;

                
            } catch (error) {
                console.error("Signin error:", error);
                alert("Signin failed. Please try again.");
            }
        }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border  min-w-48 p-10 ">
            <Input ref={usernameRef} placeholder="Username" />
            <Input ref={passwordRef} placeholder="Password" />

            <div className="flex justify-center p-4">
            <Button variant="primary" text="Signin" fullWidth={true} loading={false} onClick={signin}/>
            </div>
             
        </div>
    </div>
 }


export default Signin