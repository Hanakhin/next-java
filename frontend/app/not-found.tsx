import { Section } from "@/app/_Components/Section";
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <Section>
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <h1 className="text-6xl font-bold text-primary">404</h1>
                <h2 className="mt-4 text-2xl">Page Non Trouvée</h2>
                <p className="mt-2 text-lg text-primary">
                    Désolé, la page que vous recherchez n&#39;existe pas ou a été déplacée.
                </p>
                <Link href="/" className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Revenir en lieu sûr
                </Link>
            </div>
        </Section>
    );
}