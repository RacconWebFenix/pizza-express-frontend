import { ProfilePageLayout } from "@/features/profile/components/ProfilePageLayout";

/**
 * Rota para /profile.
 * Renderiza o layout principal da feature de perfil.
 * Esta rota deve ser protegida por middleware.
 */
export default function ProfilePage() {
  return <ProfilePageLayout />;
}
