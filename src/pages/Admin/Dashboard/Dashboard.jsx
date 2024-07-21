import { useEffect, useState } from "react";

import { Chart } from "primereact/chart";
import { Card } from "primereact/card";

import axios from "axios";
import Cookies from "js-cookie";
import SummaryCard from "../../../components/Chart/SummaryCard";

function Dashboard() {
  const [orderChartData, setOrderChartData] = useState({});
  const [salesChartData, setSalesChartData] = useState({});
  const [orderChartOptions, setOrderChartOptions] = useState({});
  const [salesChartOptions, setSalesChartOptions] = useState({});

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const jwt = Cookies.get("token");
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}/chart/orders`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const data = response.data;

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue("--text-color");
        const textColorSecondary = documentStyle.getPropertyValue(
          "--text-color-secondary"
        );
        const surfaceBorder =
          documentStyle.getPropertyValue("--surface-border");

        const chartData = {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Total Orders",
              data: data.orders,
              fill: false,
              borderColor: documentStyle.getPropertyValue("--pink-500"),
              tension: 0.4,
            },
          ],
        };

        const chartOptions = {
          maintainAspectRatio: false,
          aspectRatio: 1,
          plugins: {
            legend: {
              labels: {
                color: textColor,
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: textColorSecondary,
              },
              grid: {
                color: surfaceBorder,
              },
            },
            y: {
              ticks: {
                color: textColorSecondary,
              },
              grid: {
                color: surfaceBorder,
              },
            },
          },
        };

        setOrderChartData(chartData);
        setOrderChartOptions(chartOptions);
      } catch (error) {
        console.error("Error fetching order data", error);
      }
    };

    const fetchSalesData = async () => {
      try {
        const jwt = Cookies.get("token");
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}/chart/sales`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const data = response.data;

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue("--text-color");
        const textColorSecondary = documentStyle.getPropertyValue(
          "--text-color-secondary"
        );
        const surfaceBorder =
          documentStyle.getPropertyValue("--surface-border");

        const chartData = {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Total Sales",
              data: data.sales,
              fill: false,
              tension: 0.4,
            },
          ],
        };

        const chartOptions = {
          maintainAspectRatio: false,
          aspectRatio: 1,
          plugins: {
            legend: {
              labels: {
                color: textColor,
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += ": ";
                  }
                  label += `$${context.raw.toLocaleString()}`;
                  return label;
                },
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: textColorSecondary,
              },
              grid: {
                color: surfaceBorder,
              },
            },
            y: {
              ticks: {
                color: textColorSecondary,
                callback: function (value) {
                  return `$${value.toLocaleString()}`;
                },
              },
              grid: {
                color: surfaceBorder,
              },
            },
          },
        };

        setSalesChartData(chartData);
        setSalesChartOptions(chartOptions);
      } catch (error) {
        console.error("Error fetching sales data", error);
      }
    };

    fetchSalesData();
    fetchOrderData();
  }, []);

  return (
    <div className="grid w-full">
      <div className="grid justify-content-between w-full">
        <div className="col-12 md:col-6 lg:col-4">
          <SummaryCard
            title="Orders"
            endpoint={`${
              import.meta.env.VITE_REACT_API_URL
            }/chart/overview/orders`}
            iconClass="pi-shopping-cart"
            colorClass="text-blue-500"
            backgroundColorClass="bg-blue-100"
            additionalInfoLabel="since last week"
          />
        </div>
        <div className="col-12 md:col-6 lg:col-4">
          <SummaryCard
            title="Total Revenue"
            endpoint={`${
              import.meta.env.VITE_REACT_API_URL
            }/chart/overview/sales`}
            iconClass="pi-dollar"
            colorClass="text-orange-500"
            backgroundColorClass="bg-orange-100"
            additionalInfoLabel="since last month"
          />
        </div>
        <div className="col-12 md:col-6 lg:col-4">
          <SummaryCard
            title="Customers"
            endpoint={`${
              import.meta.env.VITE_REACT_API_URL
            }/chart/overview/users`}
            iconClass="pi-user-plus"
            colorClass="text-cyan-500"
            backgroundColorClass="bg-cyan-100"
            additionalInfoLabel="registered past 7 days"
          />
        </div>
      </div>
      <Card className="card mt-3 col-12" title="Sales This Year">
        <Chart type="line" data={salesChartData} options={salesChartOptions} />
      </Card>
      <Card className="card mt-3 col-12" title="Order This Year">
        <Chart type="line" data={orderChartData} options={orderChartOptions} />
      </Card>
    </div>
  );
}

export default Dashboard;
