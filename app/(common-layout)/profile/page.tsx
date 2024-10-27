import ConnectedAccounts from "@/components/profile/ConnectedAccounts";
import GamingAccounts from "@/components/profile/GamingAccounts";
import ProfileBanner from "@/components/profile/ProfileBanner";
import UserEarning from "@/components/profile/UserEarning";

const ProfilePage = () => {
  return (
    <>
      <ProfileBanner />
      <UserEarning />
      <GamingAccounts />
      <ConnectedAccounts />
    </>
  );
};

export default ProfilePage;
