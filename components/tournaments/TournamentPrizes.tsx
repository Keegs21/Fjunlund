const TournamentPrizes = () => {
  return (
    <section className="tournament-prize-section mb-10">
      <div className="container bgn-4 p-lg-10 p-sm-6 p-4">
        <div className="d-flex align-items-center gap-xxl-20 gap-6 flex-wrap">
          <div className="tour-prize-card">
            <div className="icon-area mb-6">
              <i className="ti ti-coin-bitcoin display-five fw-normal tcp-2"></i>
            </div>
            <h4 className="tcn-1 cursor-scale growDown title-anim mb-1">
              Prize Pool
            </h4>
            <p className="tcn-1 title-anim">50 ~ $50.00</p>
          </div>
          <div className="tour-prize-card">
            <div className="icon-area mb-6">
              <i className="ti ti-wallet display-five fw-normal tcp-2"></i>
            </div>
            <h4 className="tcn-1 cursor-scale growDown title-anim mb-1">
              Entry Fee
            </h4>
            <p className="tcn-1 title-anim">$50.00</p>
          </div>
          <div className="tour-prize-card">
            <div className="icon-area mb-6">
              <i className="ti ti-users-group display-five fw-normal tcp-2"></i>
            </div>
            <h4 className="tcn-1 cursor-scale growDown title-anim mb-1">
              Mode
            </h4>
            <p className="tcn-1 title-anim">solo</p>
          </div>
          <div className="tour-prize-card">
            <div className="icon-area mb-6">
              <i className="ti ti-sitemap display-five fw-normal tcp-2"></i>
            </div>
            <h4 className="tcn-1 cursor-scale growDown title-anim mb-1">
              Format
            </h4>
            <p className="tcn-1 title-anim">Single Elimination</p>
          </div>
          <div className="tour-prize-card">
            <div className="icon-area mb-6">
              <i className="ti ti-trophy display-five fw-normal tcp-2"></i>
            </div>
            <h4 className="tcn-1 cursor-scale growDown title-anim mb-1">
              Type
            </h4>
            <p className="tcn-1 title-anim"> -- </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TournamentPrizes;
