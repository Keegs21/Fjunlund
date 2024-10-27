import Link from "next/link";
const gamingData = [
  {
    id: 1,
    title: "A New Gaming Experience",
    desc: "NFTs Integrated with DeFi to provide a new gaming experience.",
    icon: <i className="ti ti-12-hours fs-2xl tcn-1"></i>,
  },
  {
    id: 2,
    title: "Play To Earn",
    desc: "Flex your wisdom to earn more with our play to earn system.",
    icon: <i className="ti ti-tools fs-2xl tcn-1"></i>,
  },
  {
    id: 3,
    title: "Real Ownership",
    desc: "Own all of your assets and NFTs are tradeable on any NFT market.",
    icon: <i className="ti ti-coins fs-2xl tcn-1"></i>,
  },
  {
    id: 4,
    title: "Playable NFTs",
    desc: "Our in-development game will utilize your NFTs in it.",
    icon: <i className="ti ti-free-rights fs-2xl tcn-1"></i>,
  },
  {
    id: 5,
    title: "Prove-able Fairness",
    desc: "Our contracts are open source for transparent gameplay.",
    icon: <i className="ti ti-scale fs-2xl tcn-1"></i>,
  },
  {
    id: 6,
    title: "Secured by the blockchain",
    desc: "Naturally secure from the blockchain for a fast, transparent, and open economy.",
    icon: <i className="ti ti-license fs-2xl tcn-1"></i>,
  },
];

const NextLevelGaming = () => {
  return (
    <section
      className="next-level-gaming-section pt-120 pb-120"
      id="next-level-gaming">
      <div className="red-ball bottom-50"></div>
      <div className="container">
        <div className="row justify-content-between mb-15">
          <div className="col-lg-6 col-sm-10">
            <h2 className="display-four tcn-1 cursor-scale growUp title-anim">
              <span className="d-block">Gaming To</span> The Next Level
            </h2>
          </div>
        </div>
        <div className="row g-6">
          {gamingData.map(({ desc, icon, id, title }) => (
            <div key={id} className="col-lg-4 col-md-6">
              <div className="next-level-game-card d-grid gap-5 py-lg-10 py-sm-6 py-4 px-xl-9 px-sm-5 px-3">
                <div className="card-icon">{icon}</div>
                <h4 className="card-title tcn-1 cursor-scale growDown2 title-anim">
                  {title}
                </h4>
                <p className="card-text tcs-6">{desc}</p>
                <div className="pt-3">
                  <Link
                    href="/game"
                    className="card-link d-inline-flex align-items-center w-auto">
                    Play Now<i className="ti ti-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NextLevelGaming;
