import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";
import { Skeleton } from "primereact/skeleton";

function SummaryCard({
  title,
  endpoint,
  iconClass,
  colorClass,
  backgroundColorClass,
  additionalInfoLabel,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = Cookies.get("token");
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  if (loading)
    return (
      <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
        <div className="flex justify-content-between mb-3">
          <div>
            <span className="block text-500 font-medium mb-3">
              <Skeleton width="4rem" className="mb-2"></Skeleton>
            </span>
            <div className="text-900 font-medium text-xl">
              <Skeleton width="3rem" className="mb-2"></Skeleton>
            </div>
          </div>
          <div
            className={`flex align-items-center justify-content-center p-skeleton border-round`}
            style={{ width: "2.5rem", height: "2.5rem" }}
          >
          </div>
        </div>
        <span className="text-500">
          <Skeleton height=".5rem" width="12rem"></Skeleton>
        </span>
      </div>
    );

  if (error) return <div>Error loading data</div>;

  return (
    <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
      <div className="flex justify-content-between mb-3">
        <div>
          <span className="block text-500 font-medium mb-3">{title}</span>
          <div className="text-900 font-medium text-xl">{data.total}</div>
        </div>
        <div
          className={`flex align-items-center justify-content-center ${backgroundColorClass} border-round`}
          style={{ width: "2.5rem", height: "2.5rem" }}
        >
          <i className={`pi ${iconClass} ${colorClass} text-xl`} />
        </div>
      </div>
      <span className="text-green-500 font-medium">{data.additionalInfo} </span>
      <span className="text-500">{additionalInfoLabel}</span>
    </div>
  );
}

SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  colorClass: PropTypes.string.isRequired,
  backgroundColorClass: PropTypes.string.isRequired,
  additionalInfoLabel: PropTypes.string.isRequired,
};

export default SummaryCard;
