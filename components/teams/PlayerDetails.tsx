import player1 from "@/public/img/player1.png";
import player2 from "@/public/img/player2.png";
import chessQueen from "@/public/img/chess-queen.png";
import Image from "next/image";

const PlayerDetails = () => {
  return (
    <section className="player-details-section pb-120">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ul
              className="nav nav-pills gap-3 mb-lg-10 mb-6"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="parent-tab1"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-parent1"
                  role="tab"
                  aria-selected="true"
                >
                  Players
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="parent-tab2"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-parent2"
                  role="tab"
                  aria-selected="false"
                >
                  Tournaments
                </button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-parent1"
                role="tabpanel"
              >
                <div className="player-list-wrapper">
                  <ul className="player-list d-grid gap-6">
                    <li className="d-between bgn-4 py-sm-4 py-3 px-sm-8 px-3 rounded">
                      <div className="d-flex gap-3 align-items-center">
                        <div className="player-img">
                          <Image
                            className="w-100 rounded-circle"
                            src={player1}
                            alt="player"
                          />
                        </div>
                        <h5 className="player-name tcn-1">Ashadul Islam</h5>
                        <div className="player-badge">
                          <Image src={chessQueen} alt="badge" />
                        </div>
                      </div>
                      <span className="player-type">captain</span>
                    </li>
                    <li className="d-between bgn-4 py-sm-4 py-3 px-sm-8 px-3 rounded">
                      <div className="d-flex gap-3 align-items-center">
                        <div className="player-img">
                          <Image
                            className="w-100 rounded-circle"
                            src={player2}
                            alt="player"
                          />
                        </div>
                        <h5 className="player-name tcn-1">Cucahook</h5>
                      </div>
                    </li>
                    <li className="d-between bgn-4 py-sm-4 py-3 px-sm-8 px-3 rounded">
                      <div className="d-flex gap-3 align-items-center">
                        <div className="player-img">
                          <Image
                            className="w-100 rounded-circle"
                            src={player1}
                            alt="player"
                          />
                        </div>
                        <h5 className="player-name tcn-1">Teemz</h5>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="tab-pane fade" id="pills-parent2" role="tabpanel">
                {/* <!-- nested tabs start here --> */}
                <ul
                  className="nested-tabs nav nav-pills gap-6 my-lg-10 my-6"
                  id="pill-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="child-tab1"
                      data-bs-toggle="pill"
                      data-bs-target="#pill-child1"
                      role="tab"
                      aria-selected="true"
                    >
                      All
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="child-tab2"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-child2"
                      role="tab"
                      aria-selected="false"
                    >
                      Active
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="child-tab3"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-child3"
                      role="tab"
                      aria-selected="false"
                    >
                      Played
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="pill-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pill-child1"
                    role="tabpanel"
                  >
                    <div className="table-responsive">
                      <table
                        className="team-game-table w-100"
                        data-lenis-prevent
                      >
                        <thead>
                          <tr>
                            <th className="tdw p-3 text-nowrap tcn-5">Game</th>
                            <th className="tdw p-3 text-nowrap tcn-5">Date</th>
                            <th className="tdw p-3 text-nowrap tcn-5">Time</th>
                            <th className="tdw p-3 text-nowrap tcn-5">
                              Entry Fee
                            </th>
                            <th className="tdw p-3 text-nowrap tcn-5">
                              Prize Pool
                            </th>
                            <th className="tdw p-3 text-nowrap tcn-5">Teams</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="tdw p-3 tcn-6">
                              Rocket League Rocket League Rocket League Rocket
                              League Rocket League RocketLeague
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              30-11-2023
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              11:00 UTC +6
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              200 USD
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              20000 USD
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              BG TEAM
                            </td>
                          </tr>
                          <tr>
                            <td className="tdw p-3 tcn-6">
                              Rocket League Rocket League Rocket League
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              30-11-2023
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              11:00 UTC +6
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              200 USD
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              20000 USD
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              BG TEAM
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-child2"
                    role="tabpanel"
                  >
                    <div className="table-responsive">
                      <table
                        className="team-game-table w-100"
                        data-lenis-prevent
                      >
                        <thead>
                          <tr>
                            <th className="tdw p-3 text-nowrap tcn-6">Game</th>
                            <th className="tdw p-3 text-nowrap tcn-6">Date</th>
                            <th className="tdw p-3 text-nowrap tcn-6">Time</th>
                            <th className="tdw p-3 text-nowrap tcn-6">
                              Entry Fee
                            </th>
                            <th className="tdw p-3 text-nowrap tcn-6">
                              Prize Pool
                            </th>
                            <th className="tdw p-3 text-nowrap tcn-6">Teams</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="tdw p-3 tcn-6">Clash Royale</td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              30-11-2023
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              20:00 UTC +6
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              80 USD
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              1000 USD
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              EQUIPO DE JUAN
                            </td>
                          </tr>
                          <tr>
                            <td className="tdw p-3 tcn-6">
                              Rainbow Six Siege Rainbow Six Siege
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              30-12-2023
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              23:00 UTC +6
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              150 USD
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              15000 USD
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              ASIA MOK32
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-child3"
                    role="tabpanel"
                  >
                    <div className="table-responsive">
                      <table
                        className="team-game-table w-100"
                        data-lenis-prevent
                      >
                        <thead>
                          <tr>
                            <th className="tdw p-3 text-nowrap tcn-6">Game</th>
                            <th className="tdw p-3 text-nowrap tcn-6">Date</th>
                            <th className="tdw p-3 text-nowrap tcn-6">Time</th>
                            <th className="tdw p-3 text-nowrap tcn-6">
                              Entry Fee
                            </th>
                            <th className="tdw p-3 text-nowrap tcn-6">
                              Prize Pool
                            </th>
                            <th className="tdw p-3 text-nowrap tcn-6">Teams</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="tdw p-3 tcn-6">Clash Royale</td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              30-11-2023
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              20:00 UTC +6
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              80 USD
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              1000 USD
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              EQUIPO DE JUAN
                            </td>
                          </tr>
                          <tr>
                            <td className="tdw p-3 tcn-6">
                              Rainbow Six Siege Rainbow Six Siege
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              30-12-2023
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              23:00 UTC +6
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              150 USD
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              15000 USD
                            </td>
                            <td className="tdw p-3 text-nowrap tcn-6">
                              ASIA MOK32
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* <!-- nested tabs end here --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayerDetails;
