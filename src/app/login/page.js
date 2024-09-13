import LoginForm from "@/components/loginComponent/loginForm";
import NavBar from "@/components/navBarComponent/navBar";

export default function Login() {
    return <>
        <div>
            <NavBar />
            <div style={{ background: '#303030', height: '100vh' }}>
                <LoginForm />
            </div>
        </div >
    </>;
}
