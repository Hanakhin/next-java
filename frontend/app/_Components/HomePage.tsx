import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
    return (
        <section className={"h-screen bg-home"}>
            <div className={"flex h-full"}>
                <div className={'flex-1 h-full w-1/2 bg-transparent'}></div>
                <div className={'flex-[1] flex h-full w-1/2 bg-transparent justify-center items-center'}>
                    <div className={'w-full h-1/3 rounded-l-xl flex flex-col justify-center items-center px-12 gap-8'}>
                        <div className={'text-center'}>
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-8xl text-white">
                                GET
                                <br/>
                                OUTSIDE
                            </h1>
                            <p className="leading-7 [&:not(:first-child)]:mt-6 text-white">
                                Equipements professionels aux prix les plus bas.
                            </p>
                        </div>
                        <Link href={'/shop'}><Button variant={'outline'} className={'rounded-none'}>Découvrir</Button></Link>
                    </div>
                </div>
            </div>
        </section>
    );
}