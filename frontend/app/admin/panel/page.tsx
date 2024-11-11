import {Section} from "@/app/_Components/Section";
import {Spacing} from "@/app/_Components/Spacing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {UserFetcher} from "@/app/_Components/fetchers/UserFetcher";
import AddArticle from "@/app/admin/panel/articles/AddArticle";
import {UpdateArticle} from "@/app/admin/panel/articles/UpdateArticle";

const AdminPanel =()=>{
    return(
        <Section>
            <Spacing size={'lg'}/>
            <Tabs defaultValue="Users" className="w-full">
                <TabsList className={'bg-primary/50 text-white'}>
                    <TabsTrigger value="Users">Gerer les utilisateurs</TabsTrigger>
                    <TabsTrigger value="Articles">Gerer les Articles</TabsTrigger>
                    <TabsTrigger value="addArticle">Ajouter un article</TabsTrigger>
                    <TabsTrigger value="Events">Gerer les evenements</TabsTrigger>
                    <TabsTrigger value="Permis">Gerer les permis</TabsTrigger>
                </TabsList>
                <TabsContent value="Users"><UserFetcher/></TabsContent>
                <TabsContent value="Articles"><UpdateArticle/></TabsContent>
                <TabsContent value="addArticle"><AddArticle/></TabsContent>
                <TabsContent value="Permis"></TabsContent>
            </Tabs>
        </Section>
    )
}

export default AdminPanel;