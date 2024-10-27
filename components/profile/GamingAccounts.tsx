import gl1 from "@/public/img/gl-1.png";
import gl10 from "@/public/img/gl-10.png";
import gl2 from "@/public/img/gl-2.png";
import gl3 from "@/public/img/gl-3.png";
import gl4 from "@/public/img/gl-4.png";
import gl5 from "@/public/img/gl-5.png";
import gl6 from "@/public/img/gl-6.png";
import gl7 from "@/public/img/gl-7.png";
import gl8 from "@/public/img/gl-8.png";
import gl9 from "@/public/img/gl-9.png";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
const gameData = [
  { id: 1, name: "Axie Origin", logo: gl1 },
  { id: 2, name: "Rocket League", logo: gl2 },
  { id: 3, name: "Valorant", logo: gl3 },
  { id: 4, name: "Battlegrounds", logo: gl4 },
  { id: 5, name: "Hollow Knight", logo: gl5 },
  { id: 6, name: "Rocket League", logo: gl6 },
  { id: 7, name: "Apex Legends", logo: gl7 },
  { id: 8, name: "Doom Eternal", logo: gl8 },
  { id: 9, name: "Stardew Valley", logo: gl9 },
  { id: 10, name: "Genshin Impact", logo: gl10 },
];
const GamingAccounts = () => {
  return (
    <section className="gaming-accounts-section pb-120">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="display-three tcn-1 cursor-scale growUp title-anim mb-lg-15 mb-sm-10 mb-6">
              Gaming Accounts
            </h2>
          </div>
        </div>
        <div className="row g-6">
          {gameData.map((game) => (
            <div key={game.id} className="col-lg-4 col-md-6">
              <GameCard {...game} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GamingAccounts;

const GameCard = ({
  logo,
  name,
}: {
  name: string;
  logo: string | StaticImageData;
}) => (
  <div className="gaming-account-card p-xl-8 p-sm-4 p-2 bgn-4 rounded card-tilt">
    <div className="d-between mb-10">
      <div className="gaming-account-thumb">
        <Image className="w-100" src={logo} alt="game-logo" />
      </div>
      <span className="py-2 px-3 bgn-3 rounded-pill tcn-1">Not Connected</span>
    </div>
    <span className="tcn-1 fs-four title mb-3 title-anim">{name}</span>
    <Link href="#" className="tcn-1 d-block mb-8 text-decoration-underline">
      How to setup account <i className="ti ti-external-link"></i>{" "}
    </Link>
    <div className="d-flex align-items-center gap-5 mb-15">
      <div className="single-input py-3">
        <input type="text" placeholder="User1234" />
      </div>
      <i className="ti ti-edit fs-2xl edit-id"></i>
    </div>
    <div className="text-center">
      <Link href="#" className="claim-btn tcn-1">
        Connect
      </Link>
    </div>
  </div>
);
