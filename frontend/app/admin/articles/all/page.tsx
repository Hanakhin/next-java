import {Section} from "@/app/_Components/Section";
import {Spacing} from "@/app/_Components/Spacing";
import {ArticleFetcher} from "@/app/_Components/fetchers/ArticleFetcher";

const AllArticles=()=>{
    return(
        <Section>
            <Spacing size={"lg"}/>
            <ArticleFetcher/>
        </Section>
    )
}

export default AllArticles