import msgsender1 from "@/public/img/msg-sender1.png";
import msgsender2 from "@/public/img/msg-sender2.png";
import msgsender3 from "@/public/img/msg-sender3.png";
import msgsender4 from "@/public/img/msg-sender4.png";
import msgsender5 from "@/public/img/msg-sender5.png";
import msgsender6 from "@/public/img/msg-sender6.png";
import PlayerOne from "@/public/img/player1.png";
import Image from "next/image";

const Chat = () => {
  return (
    <section className="chat-section pt-120 mt-lg-0 mt-sm-15 mt-10">
      <div className="row gx-6">
        <div className="col-lg-4 col-md-6 col-sm-8 position-relative">
          <div className="chat-list-area px-lg-6 px-4 py-lg-8 py-4 bgn-4 rounded">
            <div className="msg-list-user-info d-between mb-lg-4 mb-2">
              <div className="msg-list-user-thumb">
                <Image
                  className="w-100 rounded-circle"
                  src={PlayerOne}
                  alt="user thumb"
                />
              </div>
              <div className="msg-list-user-info d-flex gap-6">
                <button className="edit-user bttn outline-0">
                  <i className="ti ti-edit tcn-1 fs-2xl"></i>
                </button>
                <button className="more-action bttn outline-0">
                  <i className="ti ti-dots tcn-1 fs-2xl"></i>
                </button>
              </div>
            </div>
            <div className="search-chat mb-lg-6 mb-4">
              <form action="#">
                <div className="input-area d-flex align-items-center gap-3 rounded-4">
                  <i className="ti ti-search"></i>
                  <input type="text" placeholder="Search......" />
                </div>
              </form>
            </div>
            <div className="chat-list-wrapper" data-lenis-prevent>
              <ul className="chat-list d-grid gap-lg-6 gap-3">
                <li className="chat-item rounded-4">
                  <a href="#" className="d-between">
                    <div className="d-flex align-items-center gap-3">
                      <div className="msg-sender-list-thumb position-relative">
                        <Image
                          className="w-100 rounded-circle"
                          src={msgsender1}
                          alt="user thumb"
                        />
                        <div className="online-dot online"></div>
                      </div>
                      <div className="msg-list-user-info">
                        <span className="fs-five tcn-1 mb-1">
                          Bessie Cooper
                        </span>
                        <span className="fs-sm tcn-6">Let’s play now!</span>
                      </div>
                    </div>
                    <div className="msg-status">
                      <span className="fs-sm tcn-1">2d</span>
                    </div>
                  </a>
                </li>
                <li className="chat-item rounded-4">
                  <a href="#" className="d-between">
                    <div className="d-flex align-items-center gap-3">
                      <div className="msg-sender-list-thumb position-relative">
                        <Image
                          className="w-100 rounded-circle"
                          src={msgsender2}
                          alt="user thumb"
                        />
                        <div className="online-dot offline"></div>
                      </div>
                      <div className="msg-list-user-info">
                        <span className="fs-five tcn-1 mb-1">
                          Ronald Richards
                        </span>
                        <span className="fs-sm tcn-6">
                          You:I will go to sleep
                        </span>
                      </div>
                    </div>
                    <div className="msg-status">
                      <span className="fs-sm tcp-2">17m</span>
                      <span className="msg-count fs-sm">3</span>
                    </div>
                  </a>
                </li>
                <li className="chat-item rounded-4">
                  <a href="#" className="d-between">
                    <div className="d-flex align-items-center gap-3">
                      <div className="msg-sender-list-thumb position-relative">
                        <Image
                          className="w-100 rounded-circle"
                          src={msgsender3}
                          alt="user thumb"
                        />
                        <div className="online-dot online"></div>
                      </div>
                      <div className="msg-list-user-info">
                        <span className="fs-five tcn-1 mb-1">Robert Fox</span>
                        <span className="fs-sm tcn-6">Are you here?</span>
                      </div>
                    </div>
                    <div className="msg-status">
                      <span className="fs-sm tcn-1">2d</span>
                    </div>
                  </a>
                </li>
                <li className="chat-item rounded-4">
                  <a href="#" className="d-between">
                    <div className="d-flex align-items-center gap-3">
                      <div className="msg-sender-list-thumb position-relative">
                        <Image
                          className="w-100 rounded-circle"
                          src={msgsender4}
                          alt="user thumb"
                        />
                        <div className="online-dot online"></div>
                      </div>
                      <div className="msg-list-user-info">
                        <span className="fs-five tcn-1 mb-1">Jacob Jones</span>
                        <span className="fs-sm tcn-6">Let’s play now!</span>
                      </div>
                    </div>
                    <div className="msg-status">
                      <span className="fs-sm tcp-2">10m</span>
                      <span className="msg-count fs-sm">4</span>
                    </div>
                  </a>
                </li>
                <li className="chat-item rounded-4">
                  <a href="#" className="d-between">
                    <div className="d-flex align-items-center gap-3">
                      <div className="msg-sender-list-thumb position-relative">
                        <Image
                          className="w-100 rounded-circle"
                          src={msgsender5}
                          alt="user thumb"
                        />
                        <div className="online-dot offline"></div>
                      </div>
                      <div className="msg-list-user-info">
                        <span className="fs-five tcn-1 mb-1">
                          Bessie Cooper
                        </span>
                        <span className="fs-sm tcn-6">Let’s play now!</span>
                      </div>
                    </div>
                    <div className="msg-status">
                      <span className="fs-sm tcn-1">2d</span>
                    </div>
                  </a>
                </li>
                <li className="chat-item rounded-4">
                  <a href="#" className="d-between">
                    <div className="d-flex align-items-center gap-3">
                      <div className="msg-sender-list-thumb position-relative">
                        <Image
                          className="w-100 rounded-circle"
                          src={msgsender6}
                          alt="user thumb"
                        />
                        <div className="online-dot offline"></div>
                      </div>
                      <div className="msg-list-user-info">
                        <span className="fs-five tcn-1 mb-1">Guy Hawkins</span>
                        <span className="fs-sm tcn-6">I will go AFK</span>
                      </div>
                    </div>
                    <div className="msg-status">
                      <span className="fs-sm tcn-1">2d</span>
                    </div>
                  </a>
                </li>
                <li className="chat-item rounded-4">
                  <a href="#" className="d-between">
                    <div className="d-flex align-items-center gap-3">
                      <div className="msg-sender-list-thumb position-relative">
                        <Image
                          className="w-100 rounded-circle"
                          src={msgsender4}
                          alt="user thumb"
                        />
                        <div className="online-dot online"></div>
                      </div>
                      <div className="msg-list-user-info">
                        <span className="fs-five tcn-1 mb-1">Jacob Jones</span>
                        <span className="fs-sm tcn-6">
                          Let&apos;s play now!
                        </span>
                      </div>
                    </div>
                    <div className="msg-status">
                      <span className="fs-sm tcp-2">10m</span>
                      <span className="msg-count fs-sm">4</span>
                    </div>
                  </a>
                </li>
                <li className="chat-item rounded-4">
                  <a href="#" className="d-between">
                    <div className="d-flex align-items-center gap-3">
                      <div className="msg-sender-list-thumb position-relative">
                        <Image
                          className="w-100 rounded-circle"
                          src={msgsender5}
                          alt="user thumb"
                        />
                        <div className="online-dot offline"></div>
                      </div>
                      <div className="msg-list-user-info">
                        <span className="fs-five tcn-1 mb-1">
                          Bessie Cooper
                        </span>
                        <span className="fs-sm tcn-6">Let’s play now!</span>
                      </div>
                    </div>
                    <div className="msg-status">
                      <span className="fs-sm tcn-1">2d</span>
                    </div>
                  </a>
                </li>
                <li className="chat-item rounded-4">
                  <a href="#" className="d-between">
                    <div className="d-flex align-items-center gap-3">
                      <div className="msg-sender-list-thumb position-relative">
                        <Image
                          className="w-100 rounded-circle"
                          src={msgsender6}
                          alt="user thumb"
                        />
                        <div className="online-dot offline"></div>
                      </div>
                      <div className="msg-list-user-info">
                        <span className="fs-five tcn-1 mb-1">Guy Hawkins</span>
                        <span className="fs-sm tcn-6">I will go AFK</span>
                      </div>
                    </div>
                    <div className="msg-status">
                      <span className="fs-sm tcn-1">2d</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="chat-wrapper p-lg-6 p-sm-4 p-2 bgn-4 rounded">
            <div className="chat-header d-between pb-xl-8 pb-4 bb">
              <div className="d-flex align-items-center gap-2">
                <button className="chat-list-toggle-btn bttn d-lg-none">
                  <i className="ti ti-menu-2 tcn-1 fs-2xl"></i>
                </button>
                <div className="msg-receiver-user-thumb">
                  <Image
                    className="w-100 rounded-circle"
                    src={msgsender1}
                    alt="user thumb"
                  />
                </div>
              </div>
              <div className="msg-more-option">
                <button className="video-call bttn">
                  <i className="ti ti-video tcn-6 fs-2xl"></i>
                </button>
                <button className="audio-call bttn">
                  <i className="ti ti-phone tcn-6 fs-2xl"></i>
                </button>
              </div>
            </div>
            <div className="chat-body py-6" data-lenis-prevent>
              <div className="chat-msg-area d-grid gap-lg-6 gap-4 w-100">
                <div className="chat-msg sender">
                  <div className="msg-sender-thumb mb-4">
                    <Image
                      className="w-100 rounded-circle"
                      src={msgsender1}
                      alt="user thumb"
                    />
                  </div>
                  <div className="msg-content">
                    <div className="msg-text">
                      <span>Which game you play now?</span>
                    </div>
                  </div>
                </div>
                <div className="chat-msg receiver ms-auto">
                  <div className="msg-content mb-4">
                    <div className="msg-text text-end">
                      <span>Good I will wait you in the game!</span>
                    </div>
                  </div>
                  <div className="msg-receiver-thumb mt-2 ms-auto">
                    <Image
                      className="w-100 rounded-circle"
                      src={msgsender2}
                      alt="user thumb"
                    />
                  </div>
                </div>
                <div className="chat-msg sender">
                  <div className="msg-sender-thumb mb-4">
                    <Image
                      className="w-100 rounded-circle"
                      src={msgsender1}
                      alt="user thumb"
                    />
                  </div>
                  <div className="msg-content">
                    <div className="msg-text">
                      <span>
                        What type of game is this? is it a strategy game?
                      </span>
                    </div>
                  </div>
                </div>
                <div className="chat-msg receiver ms-auto">
                  <div className="msg-content mb-4">
                    <div className="msg-text text-end">
                      <span>I play Stronghold Kingdoms</span>
                    </div>
                  </div>
                  <div className="msg-receiver-thumb mt-2 ms-auto">
                    <Image
                      className="w-100 rounded-circle"
                      src={msgsender2}
                      alt="user thumb"
                    />
                  </div>
                </div>
                <div className="chat-msg sender">
                  <div className="msg-sender-thumb mb-4">
                    <Image
                      className="w-100 rounded-circle"
                      src={msgsender1}
                      alt="user thumb"
                    />
                  </div>
                  <div className="msg-content">
                    <div className="msg-text">
                      <span>
                        What type of game is this? is it a strategy game?
                      </span>
                    </div>
                  </div>
                </div>
                <div className="chat-msg receiver ms-auto">
                  <div className="msg-content mb-4">
                    <div className="msg-text text-end">
                      <span>I play Stronghold Kingdoms</span>
                    </div>
                  </div>
                  <div className="msg-receiver-thumb mt-2 ms-auto">
                    <Image
                      className="w-100 rounded-circle"
                      src={msgsender2}
                      alt="user thumb"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="chat-footer bt pt-lg-10 pt-sm-8 pt-6">
              <form
                action="#"
                className="d-flex align-items-center gap-lg-10 gap-sm-8 gap-4">
                <div className="emoji-area d-flex align-items-center gap-lg-5 gap-3">
                  <button className="add-emoji bttn p-0">
                    <i className="ti ti-mood-wink-2 tcn-1 fs-2xl"></i>
                  </button>
                  <button className="add-file-btn bttn p-0">
                    <i className="ti ti-photo tcn-1 fs-2xl"></i>
                  </button>
                  <input type="file" id="add-file-input" hidden />
                </div>
                <div className="input-area d-flex align-items-center gap-3 py-2 pe-2">
                  <input
                    type="text"
                    className="w-100"
                    placeholder="Type your message..."
                  />
                  <button className="send-msg bttn">
                    <i className="ti ti-send tcn-0 fs-2xl"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
