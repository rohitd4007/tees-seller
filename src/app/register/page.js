import NavBar from "@/components/navBarComponent/navBar";
import RegistrationForm from "@/components/registerComponent/registrationForm";

export default function Register() {
    return <>
        <div >
            <NavBar />
            <div style={{ background: '#303030', height: '100vh' }}>
                <RegistrationForm />
            </div>
        </div>
    </>
}
