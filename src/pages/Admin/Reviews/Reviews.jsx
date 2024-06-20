import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import Button from "../../../components/Button/Button";
import { Button as PrimeButton } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import axios from "axios";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [input, setInput] = useState("");

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const submit = async () => {
    console.log(input);
    setReviews([]);
    // axios.get(`${import.meta.env.VITE_REACT_API_URL}/product/${input}/reviews`).then(async (res) => {
    //   console.log(res.data);
    //   const reviews = res.data.reviews;
    //   const userIds = reviews.map((review) => review.user);
    //   const userRes = await axios.post(
    //     `${import.meta.env.VITE_REACT_API_URL}/users/username`,
    //     { userIds }
    //   );
    //   const users = userRes.data;

    //   const userMapping = users.reduce((acc, user) => {
    //     acc[user._id] = user.name;
    //     return acc;
    //   }, {});
    //   const reviewsWithUsernames = reviews.map((review) => ({
    //     ...review,
    //     userName: userMapping[review.user] || review.user,
    //   }));

    //   setProduct((prevProduct) => ({
    //     ...prevProduct,
    //     reviews: reviewsWithUsernames,
    //   })); 
    // });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/product/${input}/reviews`
      );
      const reviews = res.data.reviews;
      console.log(reviews);
      const userIds = reviews.map((review) => review.user);
      const userRes = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/users/username`,
        { userIds }
      );
      const users = userRes.data;

      const userMapping = users.reduce((acc, user) => {
        acc[user._id] = user.name;
        return acc;
      }, {});
      const reviewsWithUsernames = reviews.map((review) => ({
        ...review,
        userName: userMapping[review.user] || review.user,
      }));
      console.log(reviewsWithUsernames);

      setReviews(reviewsWithUsernames);
    } catch (err) {
      console.log(err);
    }
  }

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              className="p-inputtext-sm"
              placeholder="Keyword Search"
            />
          </IconField>
        </span>
      </div>
    );
  };

  const header = renderHeader();
  return (
    <div className="flex w-full flex-column">
      <div className="mx-auto w-5">
        <p className=" mb-2">Enter Product ID</p>
        <InputText
          style={{ boxSizing: "border-box" }}
          className="mb-3 p-inputtext-sm w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button className="w-full" onClick={submit}>Search</Button>
      </div>
      <div className="mx-auto">
        {reviews.length === 0 ? (
          <p className="text-sm text-center">No Reviews</p>
        ) : (
          <DataTable
            value={reviews}
            size="small"
            paginator
            showGridlines
            stripedRows
            rows={10}
            rowsPerPageOptions={[10, 25, 50]}
            filters={filters}
            header={header}
          >
            <Column field="_id" header="Review ID" className="w-1" sortable />
            <Column field="rating" header="Rating" sortable className="w-1" />
            <Column field="review" header="Review" sortable className="w-7" />
            <Column field="userName" header="User" sortable className="w-1" />
            <Column
              className="w-2"
              field="actions"
              header="Actions"
              body={(rowData) => (
                <>
                  <PrimeButton
                    // onClick={() => confirmDelete(rowData)}
                    className="products__action-button px-1 py-0"
                    style={{ backgroundColor: "#ef4444", marginRight: "0" }}
                    icon={
                      <FontAwesomeIcon icon="fa-solid fa-trash-can" size="sm" />
                    }
                  />
                </>
              )}
            />
          </DataTable>
        )}
      </div>
    </div>
  );
}

export default Reviews;
