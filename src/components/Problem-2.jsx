import React, { useState } from "react";
import qs from "query-string";
import { useNavigate, useSearchParams } from "react-router-dom";
import ModalA from "./ModalA";
import ModalB from "./ModalB";

const Problem2 = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleModalClick = (modal) => {
    let currentQuery = {};

    if (searchParams.size > 0) currentQuery = qs.parse(searchParams.toString());

    const updatedQuery = {
      ...currentQuery,
      modal,
    };

    if (searchParams?.get("modal") === modal) delete updatedQuery.modal;

    const url = qs.stringifyUrl(
      {
        url: "/problem-2",
        query: updatedQuery,
      },
      { skipEmptyString: true, skipNull: true }
    );

    navigate(url);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={() => handleModalClick("a")}
            className="btn btn-lg btn-outline-primary"
            type="button"
          >
            All Contacts
          </button>
          <ModalA />
          <ModalB />
          <button
            onClick={() => handleModalClick("b")}
            className="btn btn-lg btn-outline-warning"
            type="button"
          >
            US Contacts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Problem2;
