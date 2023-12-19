import React, { useState, useEffect } from "react";
import qs from "query-string";
import { useNavigate, useSearchParams } from "react-router-dom";
import Modal from "./Modal";
import { useDebounce } from "../hooks/use-debounce";

const ModalB = () => {
  const [onlyEven, setOnlyEven] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [showModalC, setShowModalC] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState({});
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const modal = searchParams?.get("modal");
  const show = modal === "b";

  const text = searchParams.get("search");

  const [value, setValue] = useState(text || "");
  const debouncedValue = useDebounce(value, 500);

  const handleClose = () => {
    navigate("/problem-2");
  };

  useEffect(() => {
    fetchUSContacts();
  }, [text, page]);

  const fetchUSContacts = async () => {
    try {
      const response = await fetch(
        `https://contact.mediusware.com/api/country-contacts/United%20States/?search=${
          text || ""
        }&page=${page}`
      );
      const data = await response.json();
      setContacts(data?.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = () => {
    setOnlyEven(!onlyEven);
  };

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    if (scrollTop + clientHeight === scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

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

  const onChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    let currentQuery = {};

    if (searchParams.size > 0) currentQuery = qs.parse(searchParams.toString());

    const updatedQuery = {
      ...currentQuery,
      search: debouncedValue,
    };

    const url = qs.stringifyUrl(
      {
        url: "/problem-2",
        query: updatedQuery,
      },
      { skipEmptyString: true, skipNull: true }
    );

    navigate(url);
  }, [debouncedValue, text]);

  const handleShowModalC = (contact) => {
    setData(contact);
    setShowModalC(true);
  };

  const handleHideModalC = () => {
    setShowModalC(false);
  };

  const filteredContacts = onlyEven
    ? contacts.filter((contact) => contact.id % 2 === 0)
    : contacts;

  return (
    <div
      className={`modal fade ${show ? "show" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: show ? "block" : "none" }}
    >
      <Modal show={showModalC} onHide={handleHideModalC} data={data} />
      <div className="modal-dialog" role="document">
        <div className="modal-content" onScroll={handleScroll}>
          <div className="modal-header">
            <h5 className="modal-title">Modal B</h5>
            <button onClick={handleClose} type="button" className="close">
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div>
              <h6>All Contacts</h6>
              <input
                type="text"
                placeholder="Search..."
                value={value}
                onChange={onChange}
              />
              {filteredContacts.map((contact) => (
                <div
                  className="text"
                  key={contact.id}
                  onClick={() => handleShowModalC(contact)}
                >
                  {contact.id}: {contact.phone} - {contact.country.name}
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              style={{ backgroundColor: "#46139f", color: "#fff" }}
              className="btn"
              onClick={() => handleModalClick("a")}
            >
              All Contacts
            </button>
            <button
              type="button"
              style={{ backgroundColor: "#ff7f50", color: "#fff" }}
              className="btn btn-primary"
              onClick={() => handleModalClick("b")}
            >
              US Contacts
            </button>
            <button
              type="button"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #46139f",
                color: "#000",
              }}
              onClick={handleClose}
              className="btn btn-secondary"
            >
              Close
            </button>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={onlyEven}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">Only even</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalB;
