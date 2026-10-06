import { Link } from "react-router";
import "../styles/landing.scss";

const Landing = () => {
    return (
        <main className="landing-page">
            <section className="landing-card">
                <div className="landing-mark">P<span>×</span></div>
                <p className="eyebrow">A small space for big moments</p>
                <h1>Keep the good<br /><em>things</em> close.</h1>
                <p className="subtext">
                    Pixly is a simple place to share the images you want to remember.
                </p>

                <div className="landing-actions">
                    <Link className="button landing-button" to="/login">
                        Sign in
                    </Link>
                    <Link className="button landing-button" to="/register">
                        Create an account
                    </Link>
                </div>
                <p className="landing-note">No noise. Just your pictures.</p>
            </section>
        </main>
    );
};

export default Landing;