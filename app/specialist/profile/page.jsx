import dynamic from "next/dynamic";

export const dynamic = "force-dynamic";

const ProfileClient = dynamic(
  () => import("./ProfileClient"),
  { ssr: false }
);

export default function ProfilePage() {
  return <ProfileClient />;
}
