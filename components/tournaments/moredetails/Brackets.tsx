import treev1 from "@/public/img/treev1.png";
import treev2 from "@/public/img/treev2.png";
import Image from "next/image";

const Brackets = () => {
  return (
    <>
      <div className="row g-6 mb-10 ">
        {/* <!-- Brackets--> */}
        <div className="col-lg-3 col-md-4 col-sm-6">
          <div className="bracket-card p-lg-8 p-sm-6 p-4 bgn-4 rounded">
            <div className="bracket-card-header d-flex align-items-center gap-2 mb-2">
              <h4 className="tcn-1">Round 01</h4>
              <span className="bracket-badge fs-xs tcn-1 rounded-pill py-1 px-2">
                BO3
              </span>
            </div>
            <span className="tcn-1 d-block mb-3">Agu 17, 5.30 AM</span>
            <span className="tcn-6">128 Players</span>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <div className="bracket-card p-lg-8 p-sm-6 p-4 bgn-4 rounded">
            <div className="bracket-card-header d-flex align-items-center gap-2 mb-2">
              <h4 className="tcn-1">Round 02</h4>
              <span className="bracket-badge fs-xs tcn-1 rounded-pill py-1 px-2">
                BO3
              </span>
            </div>
            <span className="tcn-1 d-block mb-3">Agu 17, 5.30 AM</span>
            <span className="tcn-6">64 Players</span>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <div className="bracket-card p-lg-8 p-sm-6 p-4 bgn-4 rounded">
            <div className="bracket-card-header d-flex align-items-center gap-2 mb-2">
              <h4 className="tcn-1">Round 03</h4>
              <span className="bracket-badge fs-xs tcn-1 rounded-pill py-1 px-2">
                BO3
              </span>
            </div>
            <span className="tcn-1 d-block mb-3">Agu 17, 5.30 AM</span>
            <span className="tcn-6">32 Players</span>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <div className="bracket-card p-lg-8 p-sm-6 p-4 bgn-4 rounded">
            <div className="bracket-card-header d-flex align-items-center gap-2 mb-2">
              <h4 className="tcn-1">Round 04</h4>
              <span className="bracket-badge fs-xs tcn-1 rounded-pill py-1 px-2">
                BO3
              </span>
            </div>
            <span className="tcn-1 d-block mb-3">Agu 17, 5.30 AM</span>
            <span className="tcn-6">16 Players</span>
          </div>
        </div>
      </div>

      {/* <!-- team tree view  --> */}
      <div className=" d-lg-block d-none">
        <div className="row align-items-center">
          {/* <!-- grand grand child tree view  --> */}
          <div className="col-3">
            <div className="d-grid gap-20">
              <div className="team-tree-view-area">
                <div className="d-grid gap-10">
                  <ul className="team-tree-view-list grand-grand-child d-grid gap-3">
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev1}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>1</span>
                    </li>
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev2}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>2</span>
                    </li>
                  </ul>
                  <ul className="team-tree-view-list grand-grand-child d-grid gap-3">
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev1}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>1</span>
                    </li>
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev2}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>2</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="team-tree-view-area">
                <div className="d-grid gap-10">
                  <ul className="team-tree-view-list grand-grand-child d-grid gap-3">
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev1}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>1</span>
                    </li>
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev2}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>2</span>
                    </li>
                  </ul>
                  <ul className="team-tree-view-list grand-grand-child d-grid gap-3">
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev1}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>1</span>
                    </li>
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev2}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>2</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="team-tree-view-area">
                <div className="d-grid gap-10">
                  <ul className="team-tree-view-list grand-grand-child d-grid gap-3">
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev1}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>1</span>
                    </li>
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev2}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>2</span>
                    </li>
                  </ul>
                  <ul className="team-tree-view-list grand-grand-child d-grid gap-3">
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev1}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>1</span>
                    </li>
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev2}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>2</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="team-tree-view-area">
                <div className="d-grid gap-10">
                  <ul className="team-tree-view-list grand-grand-child d-grid gap-3">
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev1}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>1</span>
                    </li>
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev2}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>2</span>
                    </li>
                  </ul>
                  <ul className="team-tree-view-list grand-grand-child d-grid gap-3">
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev1}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>1</span>
                    </li>
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev2}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>2</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- grand child tree view  --> */}
          <div className="col-3">
            <div className="d-grid gap-8">
              <div className="team-tree-view-area">
                <div className="d-grid gap-10">
                  <ul className="team-tree-view-list grand-child d-grid gap-3 mb-120">
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev1}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>1</span>
                    </li>
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev2}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>2</span>
                    </li>
                  </ul>
                  <ul className="team-tree-view-list grand-child d-grid gap-3 mt-120 mb-120">
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev1}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>1</span>
                    </li>
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev2}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>2</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="team-tree-view-area">
                <div className="d-grid gap-10">
                  <ul className="team-tree-view-list grand-child d-grid gap-3 mb-120 mt-120">
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev1}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>1</span>
                    </li>
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev2}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>2</span>
                    </li>
                  </ul>
                  <ul className="team-tree-view-list grand-child d-grid gap-3 mt-120">
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev1}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>1</span>
                    </li>
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev2}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>2</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- child tree view --> */}
          <div className="col-3">
            <div className="team-tree-view-area">
              <div className="d-grid">
                <div className="mb-120 pb-120">
                  <ul className="team-tree-view-list child d-grid gap-3 mb-120">
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev1}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>1</span>
                    </li>
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev2}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>2</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-120 pt-120">
                  <ul className="team-tree-view-list child d-grid gap-3 mt-120">
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev1}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>1</span>
                    </li>
                    <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="team-tree-view-thumb">
                          <Image
                            className="w-100 rounded-circle"
                            src={treev2}
                            alt="team-thumb"
                          />
                        </div>
                        <span className="d-block">Dianne Russell</span>
                      </div>
                      <span>2</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- parent tree view  --> */}
          <div className="col-3">
            <div className="team-tree-view-area">
              <ul className="team-tree-view-list parent d-grid gap-3">
                <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className="team-tree-view-thumb">
                      <Image
                        className="w-100 rounded-circle"
                        src={treev1}
                        alt="team-thumb"
                      />
                    </div>
                    <span className="d-block">Dianne Russell</span>
                  </div>
                  <span>1</span>
                </li>
                <li className="team-tree-view-item d-between p-3 rounded bgn-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className="team-tree-view-thumb">
                      <Image
                        className="w-100 rounded-circle"
                        src={treev2}
                        alt="team-thumb"
                      />
                    </div>
                    <span className="d-block">Dianne Russell</span>
                  </div>
                  <span>2</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Brackets;
