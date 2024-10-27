"use client";
import { ApexOptions } from "apexcharts";
import Link from "next/link";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const UserEarning = () => {
  const options: ApexOptions = {
    colors: ["#F62F1A", "#F6471C"],
    tooltip: {
      theme: "dark",
      y: {
        formatter: function (val) {
          return "$" + val;
        },
      },
      x: {
        show: false,
      },
    },
    series: [
      {
        name: "Earnings",
        data: [0, 0, 150, 0, 0, 0, 0, 50, 0, 0, 0, 0],
      },
    ],
    chart: {
      height: 150,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      // show: false,
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    markers: {
      colors: ["#F76D1F"],
    },
  };
  return (
    <section className="user-earning-section pb-120">
      <div className="container">
        <div className="row g-6">
          <div className="col-lg-4">
            <div className="user-earning-area py-8 px-4 bgn-4 rounded">
              <div className="d-between  mb-8">
                <h5 className="tcn-1">Your Earnings</h5>
                <Link href="#" className="claim-btn tcn-1">
                  Claim
                </Link>
              </div>
              <span className="tcn-1 d-block mb-2">Your Balance</span>
              <span className="tcn-1 fs-three">$ 150.00</span>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="user-earning-chart py-8 px-4 bgn-4 rounded">
              <ReactApexChart
                height={150}
                series={options.series}
                options={options}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserEarning;
