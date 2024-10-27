import useDropdown from "@/hooks/useDropdown";
import avatar1 from "@/public/img/avatar1.png";
import avatar2 from "@/public/img/avatar2.png";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";

const Notification = () => {
  const { open, ref, toggleOpen } = useDropdown();
  return (
    <div ref={ref} className="position-relative flex-shrink-0">
      <Button onClick={toggleOpen} classes="ntf-btn fs-2xl">
        <i className="ti ti-bell-filled"></i>
      </Button>
      <div
        className={clsx("notification-area p-4", { open: open })}
        data-lenis-prevent>
        <div className="notification-card d-grid gap-4" data-tilt>
          <Link href="#">
            <div className="card-item d-flex align-items-center gap-4">
              <div className="card-img-area">
                <Image
                  className="w-100 rounded-circle"
                  src={avatar1}
                  alt="profile"
                />
              </div>
              <div className="card-info">
                <span className="card-title d-block tcn-1">
                  {" "}
                  Cristofer Dorwart
                </span>
                <span className="card-text d-block tcn-1 fs-sm">
                  Winners The Last Game
                </span>
              </div>
            </div>
          </Link>
          <Link href="#">
            <div className="card-item d-flex align-items-center gap-4">
              <div className="card-img-area">
                <Image
                  className="w-100 rounded-circle"
                  src={avatar2}
                  alt="profile"
                />
              </div>
              <div className="card-info">
                <span className="card-title d-block tcn-1"> Piter Maio </span>
                <span className="card-text d-block tcn-1 fs-sm">
                  Accept your challenge
                </span>
              </div>
            </div>
          </Link>
          <Link href="#">
            <div className="card-item d-flex align-items-center gap-4">
              <div className="card-info">
                <span className="card-title d-block tcn-1">
                  {" "}
                  Copa Punto Gamer{" "}
                </span>
                <span className="card-text d-block tcn-1 fs-sm">
                  Tournament start
                </span>
              </div>
            </div>
          </Link>
          <Link href="#">
            <div className="card-item d-flex align-items-center gap-4">
              <div className="card-info">
                <span className="card-title d-block tcn-1"> Daily Bonus </span>
                <span className="card-text d-block tcn-1 fs-sm">
                  Tournament start
                </span>
              </div>
            </div>
          </Link>
          <Link href="#">
            <div className="card-item d-flex align-items-center gap-4">
              <div className="card-img-area">
                <Image
                  className="w-100 rounded-circle"
                  src={avatar1}
                  alt="profile"
                />
              </div>
              <div className="card-info">
                <span className="card-title d-block tcn-1">
                  {" "}
                  Cristofer Dorwart
                </span>
                <span className="card-text d-block tcn-1 fs-sm">
                  Winners The Last Game
                </span>
              </div>
            </div>
          </Link>
          <Link href="#">
            <div className="card-item d-flex align-items-center gap-4">
              <div className="card-img-area">
                <Image
                  className="w-100 rounded-circle"
                  src={avatar2}
                  alt="profile"
                />
              </div>
              <div className="card-info">
                <span className="card-title d-block tcn-1"> Piter Maio </span>
                <span className="card-text d-block tcn-1 fs-sm">
                  Accept your challenge
                </span>
              </div>
            </div>
          </Link>
          <Link href="#">
            <div className="card-item d-flex align-items-center gap-4">
              <div className="card-info">
                <span className="card-title d-block tcn-1">
                  {" "}
                  Copa Punto Gamer{" "}
                </span>
                <span className="card-text d-block tcn-1 fs-sm">
                  Tournament start
                </span>
              </div>
            </div>
          </Link>
          <Link href="#">
            <div className="card-item d-flex align-items-center gap-4">
              <div className="card-info">
                <span className="card-title d-block tcn-1"> Daily Bonus </span>
                <span className="card-text d-block tcn-1 fs-sm">
                  Tournament start
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Notification;
