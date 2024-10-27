const RegProcess = () => {
  return (
    <section className="tour-reg-process-section mb-10">
      <div className="container bgn-4 p-lg-10 p-sm-6 px-4 py-8">
        {/* <!-- tournament registration step area  --> */}
        <div className="row row-cols-xl-5 row-cols-md-3 row-cols-sm-2 row-cols-1 gy-10 trp-area">
          <div className="col trp-box">
            <div className="tour-reg-process-area complete mb-6">
              <div className="step-area">
                <div className="step">
                  <div className="step-number">
                    <span className="tcn-1 fs-xl">1</span>
                  </div>
                  <div className="check">
                    <i className="ti ti-check fs-2xl tcn-1"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="tour-reg-content-area">
              <h4 className="tcn-1 cursor-scale growDown title-anim mb-2">
                Registration Open
              </h4>
              <span className="tcn-6 d-block mb-5">
                Register now to play in the tournament.
              </span>
              <span className="date rounded py-2 px-3">OCT 04 - NOV 25</span>
            </div>
          </div>
          <div className="col trp-box">
            <div className="tour-reg-process-area complete mb-6">
              <div className="step-area">
                <div className="step">
                  <div className="step-number">
                    <span className="tcn-1 fs-xl">1</span>
                  </div>
                  <div className="check">
                    <i className="ti ti-check fs-2xl tcn-1"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="tour-reg-content-area">
              <h4 className="tcn-1 cursor-scale growDown title-anim mb-2">
                Registration Closed
              </h4>
              <span className="tcn-6 d-block mb-5">
                Creating the brackets we&apos;ll start soon
              </span>
              <span className="date rounded py-2 px-3">OCT 07</span>
            </div>
          </div>
          <div className="col trp-box">
            <div className="tour-reg-process-area pending mb-6">
              <div className="step-area">
                <div className="step">
                  <div className="step-number">
                    <span className="tcn-1 fs-xl">1</span>
                  </div>
                  <div className="check">
                    <i className="ti ti-check fs-2xl tcn-1"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="tour-reg-content-area">
              <h4 className="tcn-1 cursor-scale growDown title-anim mb-2">
                Playing
              </h4>
              <span className="tcn-6 d-block mb-5">
                Register now to play in the tournament.
              </span>
              <span className="date rounded py-2 px-3">OCT 07 - OCT 31</span>
            </div>
          </div>
          <div className="col trp-box">
            <div className="tour-reg-process-area mb-6">
              <div className="step-area">
                <div className="step">
                  <div className="step-number">
                    <span className="tcn-1 fs-xl">4</span>
                  </div>
                  <div className="check">
                    <i className="ti ti-check fs-2xl tcn-1"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="tour-reg-content-area">
              <h4 className="tcn-1 cursor-scale growDown title-anim mb-2">
                Finished
              </h4>
              <span className="tcn-6 d-block mb-5">
                Tournament finished Prizes are on their way.
              </span>
              <span className="date rounded py-2 px-3">OCT 31</span>
            </div>
          </div>
          <div className="col trp-box">
            <div className="tour-reg-process-area mb-6">
              <div className="step-area">
                <div className="step">
                  <div className="step-number">
                    <span className="tcn-1 fs-xl">5</span>
                  </div>
                  <div className="check">
                    <i className="ti ti-check fs-2xl tcn-1"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="tour-reg-content-area">
              <h4 className="tcn-1 cursor-scale growDown title-anim mb-2">
                Paid
              </h4>
              <span className="tcn-6 d-block mb-5">
                Payments sent to the winners. Congrats!
              </span>
              <span className="date rounded py-2 px-3">OCT 04 - NOV 25</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegProcess;
