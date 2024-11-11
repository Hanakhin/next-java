import {Section} from "@/app/_Components/Section";
import {ArticleFetcher} from "@/app/_Components/fetchers/ArticleFetcher";
import {Spacing} from "@/app/_Components/Spacing";

const ShopPage=()=>{

    return(
        <Section>
            <Spacing size={"lg"}/>
            <ArticleFetcher/>
        </Section>
    )
}

export default ShopPage;