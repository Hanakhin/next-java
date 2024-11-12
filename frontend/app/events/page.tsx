import {ConcoursFetcher} from "@/app/events/eventsComponent";
import {Spacing} from "@/app/_Components/Spacing";
import {Section} from "@/app/_Components/Section";

const EventsPage=()=>{

    return(
        <Section>
            <Spacing size={"lg"}/>
            <ConcoursFetcher/>
        </Section>
    )
}

export default EventsPage;