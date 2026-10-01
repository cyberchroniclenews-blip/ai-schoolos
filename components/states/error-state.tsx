import { Alert } from "@/components/ui/alert";
export function ErrorState({ message = "We couldn’t load this information. Please try again." }: { message?: string }) { return <Alert variant="error"><strong className="font-semibold">Something went wrong. </strong>{message}</Alert>; }
