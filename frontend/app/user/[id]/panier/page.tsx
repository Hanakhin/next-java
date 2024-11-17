import {Section} from "@/app/_Components/Section";
import {PanierFetcher} from "@/app/_Components/fetchers/PanierFetcher";
import {Spacing} from "@/app/_Components/Spacing";

const PanierPage = ()=>{
    return(
        <Section>
            <Spacing size={"lg"}/>
            <PanierFetcher/>
        </Section>
    )
}

export default PanierPage;