import { useRef, useState, useEffect } from "react";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('');
    const [emailID, setEmailID] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [success, setSuccess] = useState(false);
   
    const navigate = useNavigate();
    const location = useLocation();

    const REGISTER_URL = "/api/user/register"

    const handleSubmit = () => {
        try {
            const response = axios.post(REGISTER_URL,
                JSON.stringify({
                    "username" : username,
                    "emailID" : emailID,
                    "password" : password,
                    "phoneNumber" : phoneNumber
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            setUsername('');
            setPassword('');
            setPhoneNumber('');
            setEmailID('');
            setSuccess(true);
            navigate('/login', { state: { from: location }, replace: true });
        } catch (e) {
            console.log(e);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

    return(
            <div>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input type="text" class="input-field" onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                    <input type="email" class="input-field" onChange={(e) => setEmailID(e.target.value)} placeholder="Email ID" required />
                    <input type="password" class="input-field" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    <input type="tel" class="input-field" onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" required />
                    <button type="submit" class="submit-btn">Register</button>
                </form>
            )}
            </div>
    )
}

export default Register