import Link from "next/link";

const Signup = () => {
  return (
    <section className="sign-in-section pb-120 pt-120 mt-sm-15 mt-10">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="form-area">
              <h1 className="tcn-1 text-center cursor-scale growUp mb-10">
                SIGN UP
              </h1>
              <form action="#" className="sign-in-form">
                <div className="single-input mb-6">
                  <input type="text" placeholder="Enter your Name" />
                </div>
                <div className="single-input mb-6">
                  <input type="text" placeholder="Enter your Username" />
                </div>
                <div className="single-input mb-6">
                  <input type="tel" placeholder="Enter your phone" />
                </div>
                <div className="single-input mb-6">
                  <input type="email" placeholder="Enter your email" />
                </div>
                <div className="single-input mb-6">
                  <input type="password" placeholder="Enter your password" />
                </div>
                <div className="text-center">
                  <button className="bttn py-3 px-6 rounded bgp-1">
                    Sign Up
                  </button>
                </div>
              </form>
              <p className="tcn-4 text-center mt-lg-10 mt-6">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-decoration-underline tcp-1">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
