import ArticleForm from "@/app/admin/articles/add/_Components/AddArticle";
import {Spacing} from "@/app/_Components/Spacing";
import {Section} from "@/app/_Components/Section";

const AddArticlePage=()=>{
    return(
        <Section>

        <Spacing size={"lg"}/>
        <ArticleForm/>

        </Section>
    )
}

export default AddArticlePage