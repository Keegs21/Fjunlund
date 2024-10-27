import Link from "next/link";

const Signin = () => {
  return (
    <section className="sign-in-section pb-120 pt-120 mt-lg-0 mt-sm-15 mt-10">
      <div className="container pt-120">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="form-area">
              <h1 className="tcn-1 text-center cursor-scale growUp mb-10">
                SIGN IN
              </h1>
              <form action="#" className="sign-in-form">
                <div className="single-input mb-6">
                  <input type="email" placeholder="Enter your email" />
                </div>
                <div className="single-input mb-6">
                  <input type="password" placeholder="Enter your password" />
                </div>
                <div className="text-center">
                  <button className="bttn py-3 px-6 rounded bgp-1">
                    Sign In
                  </button>
                </div>
              </form>
              <p className="tcn-4 text-center mt-lg-10 mt-6">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-decoration-underline tcp-1">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
