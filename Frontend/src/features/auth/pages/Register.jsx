import "../styles/form.scss";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {handleRegister, loading} = useAuth()
    const navigate = useNavigate()

    if(loading){
        return (
            <h1>Loading...</h1>
        )
    }
    
        async function handleSubmit(e) {
            e.preventDefault();
    
            try {
                await handleRegister(username, email, password);
                navigate("/login");
            } catch (err) {
                console.log(err);
            }
        }

    return (
        <main>
            <div className="form-container">
                <p className="form-kicker">PIXLY</p>
                <h1>Make it yours.</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        autoComplete="username"
                        onInput={(e) => {
                            setUsername(e.target.value);
                        }}
                        value={username}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        autoComplete="email"
                        onInput={(e) => {
                            setEmail(e.target.value);
                        }}
                        // value={email}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        autoComplete="new-password"
                        onInput={(e) => {
                            setPassword(e.target.value);
                        }}
                        // value={password}
                    />

                    <button className="button primary-button" type="submit">Create account</button>
                </form>

                <p>
                    Already have an account?{" "}
                    <Link className="toggleAuthForm" to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Register;
