import Image from "next/image";
import winnerPrize from "@/public/img/winner-prize.png";
const Winners = () => {
  return (
    <div className="row align-items-center justify-content-center pt-lg-20 pt-sm-10">
      <div className="col-lg-4 col-sm-6">
        <div className="d-grid justify-content-center align-items-center gap-10">
          <div className="img-area mx-auto winner-img">
            <Image className="w-100" src={winnerPrize} alt="prize" />
          </div>
          <div className="content-area">
            <h4 className="tcn-1 fs-four title-anim mb-3 text-center">
              The tournament hasn&apos;t finished yet
            </h4>
            <span className="tcn-6 text-center d-block">
              Once the tournament is over, the data takes a few minutes to
              appear.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Winners;
