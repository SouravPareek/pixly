import "../styles/form.scss";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {handleLogin, loading} = useAuth()
    const navigate = useNavigate()

    if(loading){
        return (
            <h1>Loading...</h1>
        )
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await handleLogin(username, password);
            navigate("/feed");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <main>
            <div className="form-container">
                <p className="form-kicker">PIXLY</p>
                <h1>Welcome back.</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        autoComplete="username"
                        onInput={(e) => {
                            setUsername(e.target.value);
                        }}
                        // value={username}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        autoComplete="current-password"
                        onInput={(e) => {
                            setPassword(e.target.value);
                        }}
                        // value={password}
                    />
                    <button className="button primary-button" type="submit">Sign in</button>
                </form>

                <p>
                    New here?{" "}
                    <Link className="toggleAuthForm" to="/register">
                        Create an account
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Login;
