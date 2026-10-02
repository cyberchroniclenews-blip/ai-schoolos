import { NextResponse } from "next/server";
import { getServerAuthContext } from "@/lib/supabase/server";

export async function GET() {
  try {
    const { user, profile, memberships, activeMembership } = await getServerAuthContext();
    return NextResponse.json({ user, profile, memberships, activeMembership });
  } catch {
    return NextResponse.json({ user: null, profile: null, memberships: [], activeMembership: null }, { status: 503 });
  }
}
