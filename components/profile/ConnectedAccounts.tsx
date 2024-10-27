import google from "@/public/img/google.png";
import Image from "next/image";
const ConnectedAccounts = () => {
  return (
    <section className="connected-accounts pb-120">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <span className="display-four tcn-1 cursor-scale growUp mb-10 d-block title-anim">
              Connected Accounts
            </span>
            <div className="d-between p-lg-10 p-sm-6 p-3 bgn-4 rounded">
              <div className="d-flex align-items-center gap-6">
                <div className="connected-thumb">
                  <Image className="w-100 rounded" src={google} alt="google" />
                </div>
                <span className="fs-2xl tcn-1">Google</span>
              </div>
              <span className="tcn-1">Connected</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectedAccounts;
