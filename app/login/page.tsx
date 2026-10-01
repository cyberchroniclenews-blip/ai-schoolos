import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return <main className="grid min-h-screen place-items-center bg-canvas p-5"><Card className="w-full max-w-md"><CardHeader><div><p className="text-sm font-semibold text-brand-600">AI SCHOOL<span className="text-ink">OS</span></p><CardTitle className="mt-3">Sign in to your workspace</CardTitle><p className="mt-2 text-sm text-slate-500">Use the account provided by your school administrator.</p></div></CardHeader><CardContent><LoginForm /></CardContent></Card></main>;
}
