import Link from "next/link";

const Error = () => {
  return (
    <section className="error-page pb-120 pt-120 mt-lg-0 mt-sm-15 mt-10">
      <div className="container pt-120">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h1 className="hero-title display-one text-center tcn-1 cursor-scale growUp mb-lg-10 mb-6">
              <span className="d-block">404</span>
              <span className="d-block tcp-1">ERROR</span>
            </h1>
            <p className="hero-text text-center tcn-1 mb-lg-10 mb-6">
              The page you are looking for does not exist.
            </p>
            <div className="text-center">
              <Link href="/" className="claim-btn">
                Go Back Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
