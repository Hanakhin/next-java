import RegisterComponent from "@/app/auth/register/RegisterComponent";
import {Section} from "@/app/_Components/Section";
import {Spacing} from "@/app/_Components/Spacing";

const RegisterPage=()=>{

    return(
        <Section>
            <Spacing size={"lg"}/>
            <RegisterComponent/>
        </Section>
    )
}

export default RegisterPage