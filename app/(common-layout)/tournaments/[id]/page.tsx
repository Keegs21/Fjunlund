import DetailsBanner from "@/components/tournaments/DetailsBanner";
import TournamentPrizes from "@/components/tournaments/TournamentPrizes";
import RegProcess from "@/components/tournaments/TournamentRegProcess";
import TournamentsMoreDetails from "@/components/tournaments/TournamentsMoreDetails";
import { tournamentsData } from "@/public/data/tournaments";
export async function generateStaticParams() {
  return tournamentsData.map((team) => ({
    id: team.id.toString(),
  }));
}
const TournamentsDetailsView = () => {
  return (
    <>
      <DetailsBanner />
      <TournamentPrizes />
      <RegProcess />
      <TournamentsMoreDetails />
    </>
  );
};

export default TournamentsDetailsView;
