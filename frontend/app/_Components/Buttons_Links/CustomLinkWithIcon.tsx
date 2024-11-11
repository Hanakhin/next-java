import {LucideIcon} from "lucide-react";
import Link from "next/link";

export const CustomLinkWithIcon = (props:{name:string,url:string,Icon:LucideIcon,classname?:string}) =>{

    return(
        <Link
            href={props.url}
            className={"inline-flex items-center justify-center gap-2 text-white hover:text-green-400 transition-colors"}>
            <props.Icon/>
            {props.name}
        </Link>
    )
}