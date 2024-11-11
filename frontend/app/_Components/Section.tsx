import {PropsWithChildren} from "react";
import {cn} from "@/lib/utils";


export const Section=(props :PropsWithChildren<{className?: string}>)=>{

    return(
        <section className={cn("max-w-screen-xl h-full px-4 m-auto",props.className)}>
            {props.children}
        </section>
    )
}