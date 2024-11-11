import {cn} from "@/lib/utils";

export type SpacingProps = {
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
};

export const Spacing = ( {size = "md"} : SpacingProps )=>{
    return <div
        className={cn({
            "h-8 lg:h-16":size ==="sm",
            "h-16 lg:h-24":size ==="md",
            "h-24 lg:h-32":size ==="lg",
            "h-32 lg:h-40":size ==="xl",
            "h-40 lg:h-48":size ==="2xl",
            "h-48 lg:h-56":size ==="3xl",
            "h-56 lg:h-64":size ==="4xl",
            "h-64 lg:h-72":size ==="5xl",
        })}
    />
}