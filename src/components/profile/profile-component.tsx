import { ScrollView } from "react-native";
import { ProfileActions } from "./profile-actions";
import { ProfileHeader } from "./profile-header";
import { ProfileSection } from "./profile-section";

export function ProfileComponent() {
  return (
    <ScrollView
      className="flex-1 bg-zinc-950"
      contentContainerClassName="flex-grow px-6 pt-16"
    >
      <ProfileHeader />
      <ProfileSection />
      <ProfileActions />
    </ScrollView>
  );
}
