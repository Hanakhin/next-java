import {Section} from "@/app/_Components/Section";
import {Spacing} from "@/app/_Components/Spacing";
import {UserFetcher} from "@/app/_Components/fetchers/UserFetcher";

const AllUsers=()=>{
    return(
        <Section>
            <Spacing size={"lg"}/>
            <UserFetcher/>
        </Section>
    )
}

export default AllUsers