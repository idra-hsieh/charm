import { getTranslations } from "next-intl/server";
import PageClient from "./PageClient";
import { supabaseAdmin } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { StoredCMIResult } from "@/lib/cmi/api-types";

interface Props {
  params: Promise<{
    locale: string;
    code: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  // Await params here as well
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.marketing.cmi_test.result" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function CMIResultPage(props: Props) {
  // 1. Await params to get the code
  // Reuse the logic from our API but execute it directly to save overhead
  const params = await props.params;
  const { code } = params;

  // 2. Fetch data directly from Supabase (server-side)
  if (!supabaseAdmin) {
    console.error("Supabase Admin client not initialized");
    throw new Error("Internal Server Error");
  }

  const { data, error } = await supabaseAdmin
    .from("cmi_results")
    .select("code, email, locale, subscribe, answers, trait_scores, result, created_at")
    .eq("code", code)
    .single();
  
  // 3. Handle Not Found or Error
  if (error || !data) {
    console.error("Error fetching CMI result: ", error);
    if (error?.code === "PGRST116") { // Not found code
      notFound();
    }
    // Other erorrs
    throw new Error("Failed to load result");
  }

  // 4. Transform data to match our StoredCMIResult type
  const resultData: StoredCMIResult = {
    code: data.code,
    email: data.email,
    subscribe: data.subscribe,
    answers: data.answers,
    traitScores: data.trait_scores,
    result: data.result,
    createdAt: new Date(data.created_at).getTime(),
  }

  // 5. Pass data to the Client Component
  return <PageClient resultData={resultData} />;
}