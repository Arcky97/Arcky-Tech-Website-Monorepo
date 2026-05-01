import { publicEnv } from "@/config";
import { redirect } from "next/navigation";

export default function DocsIndex() {
  redirect(publicEnv.WEB_URL);
}