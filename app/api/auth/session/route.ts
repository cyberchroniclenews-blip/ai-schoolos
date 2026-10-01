import { NextResponse } from "next/server";
import { getServerAuthContext } from "@/lib/supabase/server";

export async function GET() {
  try {
    const { user } = await getServerAuthContext();
    return NextResponse.json({ user, profile: null, memberships: [], activeMembership: null });
  } catch {
    return NextResponse.json({ user: null, profile: null, memberships: [], activeMembership: null }, { status: 503 });
  }
}
