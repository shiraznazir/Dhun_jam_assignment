import React, { useEffect, useRef, useState } from "react";
import Charts from "../Charts";
import { useUserData } from "../../context/UserContext";
import { editAdminDetails } from "../../apis/api";

const AdminDashboard = () => {
  const amountRef = useRef(null);
  const category_7_Ref = useRef(null);
  const category_8_Ref = useRef(null);
  const category_9_Ref = useRef(null);
  const category_10_Ref = useRef(null);
  const [userDetails] = useUserData();
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [disable, setDisable] = useState(true);
  const [amountData, setAmountData] = useState([]);

  useEffect(() => {
    setUser(userDetails);
    setAmountData([
      userDetails?.amount?.category_6,
      userDetails?.amount?.category_7,
      userDetails?.amount?.category_8,
      userDetails?.amount?.category_9,
      userDetails?.amount?.category_10,
    ]);
  }, [userDetails]);

  const handleAmount = () => {
    const amount = document.getElementById("amount");
    if (amountRef?.current.value < 99) {
      setError({ ...error, amount: "Minimum should be 99" });
      amount.style.borderColor = "red";
    } else {
      let newData = [...amountData];
      newData[0] = Number(amountRef?.current.value);
      setAmountData(newData);
      setError({ ...error, amount: "" });
      amount.style.borderColor = "#c2c2c2";
    }
  };

  const handleCategory7 = () => {
    const category7 = document.getElementById("category7");
    if (category_7_Ref?.current.value < 79) {
      setError({ ...error, category7: "Min 79" });
      category7.style.borderColor = "red";
    } else {
      let newData = [...amountData];
      newData[1] = Number(category_7_Ref?.current.value);
      setAmountData(newData);
      setError({ ...error, category7: "" });
      category7.style.borderColor = "#c2c2c2";
    }
  };

  const handleCategory8 = () => {
    const category8 = document.getElementById("category8");
    if (category_8_Ref?.current.value < 59) {
      setError({ ...error, category8: "Min 59" });
      category8.style.borderColor = "red";
    } else {
      let newData = [...amountData];
      newData[2] = Number(category_8_Ref?.current.value);
      setAmountData(newData);
      setError({ ...error, category8: "" });
      category8.style.borderColor = "#c2c2c2";
    }
  };

  const handleCategory9 = () => {
    const category9 = document.getElementById("category9");
    if (category_9_Ref?.current.value < 39) {
      setError({ ...error, category9: "Min 39" });
      category9.style.borderColor = "red";
    } else {
      let newData = [...amountData];
      newData[3] = Number(category_9_Ref?.current.value);
      setAmountData(newData);
      setError({ ...error, category9: "" });
      category9.style.borderColor = "#c2c2c2";
    }
  };

  const handleCategory10 = () => {
    const category10 = document.getElementById("category10");
    if (category_10_Ref?.current.value < 19) {
      setError({ ...error, category10: "Min 19" });
      category10.style.borderColor = "red";
    } else {
      let newData = [...amountData];
      newData[4] = Number(category_10_Ref?.current.value);
      setAmountData(newData);
      setError({ ...error, category10: "" });
      category10.style.borderColor = "#c2c2c2";
    }
  };

  useEffect(() => {
    if (
      amountRef?.current.value >= 99 &&
      category_7_Ref?.current.value >= 79 &&
      category_8_Ref?.current.value >= 59 &&
      category_9_Ref?.current.value >= 39 &&
      category_10_Ref?.current.value >= 19
    ) {
      setDisable(false);
    }
  }, [
    handleAmount,
    handleCategory7,
    handleCategory8,
    handleCategory9,
    handleCategory10,
  ]);

  const handleSave = (e) => {
    e.preventDefault();
    let data = {
      amount: {
        category_6: amountRef?.current.value,
        category_7: category_7_Ref?.current.value,
        category_8: category_8_Ref?.current.value,
        category_9: category_9_Ref?.current.value,
        category_10: category_10_Ref?.current.value,
      },
    };
    if (user?.id) {
      editAdminDetails(user?.id, data)
        .then((res) => {
          if (res.status === 200) {
            setSuccess(true);
            setDisable(true);
            amountRef?.current && (amountRef.current.value = "");
            category_7_Ref?.current && (category_7_Ref.current.value = "");
            category_8_Ref?.current && (category_8_Ref.current.value = "");
            category_9_Ref?.current && (category_9_Ref.current.value = "");
            category_10_Ref?.current && (category_10_Ref.current.value = "");
          }
        })
        .catch((err) => {
          console.log("Error ", err);
        });
    }
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };
  return (
    <>
      <div className="admin-container">
        <p className="heading">
          {user?.name}, {user?.location} on Dhun Jam
        </p>
        <div className="width charge-box">
          <p className="text">
            Do you want to charge your <br /> customers for requesting songs
          </p>
          <div className="radio-btn-box">
            <input
              type="radio"
              id="true"
              value="true"
              checked={user?.charge_customers}
            />
            <label className="text" htmlFor="true">
              Yes
            </label>
            <input
              type="radio"
              id="false"
              value="false"
              checked={!user?.charge_customers}
            />
            <label className="text" htmlFor="false">
              No
            </label>
          </div>
          <p className="text">Custom songs request amount-</p>
          <div className="radio-btn-box">
            <div className="flex-column w-100">
              <input
                id="amount"
                ref={amountRef}
                className="amount"
                type="number"
                onChange={handleAmount}
                disabled={!user?.charge_customers}
              />
              {error?.amount && <span className="error">{error?.amount}</span>}
            </div>
          </div>
          <p className="text ">
            Regular song request amounts, <br /> from low to high
          </p>
          <div className="high-low">
            <div className="sm-input">
              <input
                id="category7"
                ref={category_7_Ref}
                className="high-low-input"
                type="number"
                onChange={handleCategory7}
                disabled={!user?.charge_customers}
              />
              {error?.category7 && (
                <span className="error">{error?.category7}</span>
              )}
            </div>
            <div className="sm-input">
              <input
                id="category8"
                ref={category_8_Ref}
                className="high-low-input"
                type="number"
                onChange={handleCategory8}
                disabled={!user?.charge_customers}
              />
              {error?.category8 && (
                <span className="error">{error?.category8}</span>
              )}
            </div>
            <div className="sm-input">
              <input
                id="category9"
                ref={category_9_Ref}
                className="high-low-input"
                type="number"
                onChange={handleCategory9}
                disabled={!user?.charge_customers}
              />
              {error?.category9 && (
                <span className="error">{error?.category9}</span>
              )}
            </div>
            <div className="sm-input">
              <input
                id="category10"
                ref={category_10_Ref}
                className="high-low-input"
                type="number"
                onChange={handleCategory10}
                disabled={!user?.charge_customers}
              />
              {error?.category10 && (
                <span className="error">{error?.category10}</span>
              )}
            </div>
          </div>
        </div>
        {user?.charge_customers && <Charts amount={amountData} />}
        {success && <span className="success">Submitted Successfully</span>}
        <button
          onClick={handleSave}
          className={`btn ${disable ? "" : "cursor-pointer"}`}
          type="button"
          disabled={disable}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default AdminDashboard;
