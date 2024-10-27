import PlayerDetails from "@/components/teams/PlayerDetails";
import TeamDetailsBanner from "@/components/teams/TeamDetailsBanner";
import { teams } from "@/public/data/team";
export async function generateStaticParams() {
  return teams.map((team) => ({
    id: team.id.toString(),
  }));
}
const TeamsDetailsView = () => {
  return (
    <>
      <TeamDetailsBanner />
      <PlayerDetails />
    </>
  );
};

export default TeamsDetailsView;
