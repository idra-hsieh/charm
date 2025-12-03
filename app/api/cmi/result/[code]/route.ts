import { StoredCMIResult } from "@/lib/cmi/api-types";
import { supabaseAdmin } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{
    code: string;
  }>;
};

export async function GET(req: NextRequest, props: Props) {
  const params = await props.params;
  try {
    const { code } = params;

    if (!code) {
      return NextResponse.json(
        { message: "Result code is required" },
        { status: 400 }
      );
    }

    // Ensure supabaseAdmin is available
    if (!supabaseAdmin) {
      console.error("Supabase Admin client not initialized");
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }

    // Query the database for the result with the matching code
    const { data, error } = await supabaseAdmin
      .from("cmi_results")
      .select("code, email, locale, subscribe, answers, trait_scores, result, created_at")
      .eq("code", code)
      .single();

    if (error) {
      // PGRST116 is the PostgREST error code for "The result contains 0 rows" (Not Found)
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { message: "Result not found" },
          { status: 404 }
        );
      }

      console.error("Supabase fetch error:", error);
      return NextResponse.json(
        { message: "Failed to fetch result" },
        { status: 500 }
      );
    }

    // Transform database snake_case columns back to camelCase application types
    const resultData: StoredCMIResult = {
      code: data.code,
      email: data.email,
      subscribe: data.subscribe,
      
      answers: data.answers,
      traitScores: data.trait_scores, // Map snake_case (DB) -> camelCase (TS)
      result: data.result,
      createdAt: new Date(data.created_at).getTime(), // Convert ISO string to timestamp
    };

    return NextResponse.json(resultData);

  } catch (error) {
    console.error("Unexpected error in result fetch API:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}