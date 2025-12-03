import { getTranslations } from "next-intl/server";
import PageClient from "./PageClient";

interface Props {
  params: {
    locale: string;
    code: string;
  };
}

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "Metadata.marketing.cmi_test.result" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function CMIResultPage({ params: { code } }: Props) {
  return <PageClient code={code} />;
}