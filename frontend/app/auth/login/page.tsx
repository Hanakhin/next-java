import {Section} from "@/app/_Components/Section";
import SignIn from "@/app/auth/login/LoginComponent";
import {Spacing} from "@/app/_Components/Spacing";

const LoginPage=()=>{
    return(
        <Section>
            <Spacing size={'lg'}/>
            <SignIn/>
        </Section>
    )
}

export default LoginPage;