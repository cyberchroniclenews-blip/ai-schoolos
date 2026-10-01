import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function UnauthorizedPage() { return <main className="grid min-h-screen place-items-center bg-canvas p-5"><Card className="w-full max-w-md"><CardHeader><CardTitle>Access not authorized</CardTitle></CardHeader><CardContent><p className="text-sm leading-6 text-slate-500">Your account does not have permission to access this school resource. Contact your school administrator if you believe this is an error.</p><Button asChild className="mt-6"><Link href="/">Return to workspace</Link></Button></CardContent></Card></main>; }
