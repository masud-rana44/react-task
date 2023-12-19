import React, { useState, useEffect } from "react";
import qs from "query-string";
import { useNavigate, useSearchParams } from "react-router-dom";
import Modal from "./Modal";

const ModalB = () => {
  const [modalAType, setModalAType] = useState("A");
  const [showModalAC, setShowModalAC] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [onlyEven, setOnlyEven] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [showModalA, setShowModalA] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const modal = searchParams?.get("modal");
  const show = modal === "b";

  const handleClose = () => {
    navigate("/problem-2");
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (modalAType === "A") {
      fetchContacts();
    } else if (modalAType === "B") {
      fetchUSContacts();
    }
  }, [modalAType]);

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        `https://contact.mediusware.com/api/contacts/?page=${page}`
      );
      const data = await response.json();
      setContacts(data?.results);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUSContacts = async () => {
    try {
      const response = await fetch(
        `https://contact.mediusware.com/api/contacts?page=${page}&search=${searchTerm}&country=US`
      );
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalAButtonClick = (type) => {
    setModalAType(type);
    setShowModalAC(false);
    setSelectedContact(null);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowModalAC(true);
  };

  const handleCheckboxChange = () => {
    setOnlyEven(!onlyEven);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    if (scrollTop + clientHeight === scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleShowModalA = () => {
    setShowModalA(true);
  };

  const handleHideModalA = () => {
    setShowModalA(false);
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
      <Modal show={showModalA} onHide={handleHideModalA} />
      <div className="modal-dialog" role="document">
        <div className="modal-content">
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
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {filteredContacts.map((contact) => (
                <div key={contact.id} onClick={handleShowModalA}>
                  {contact.phone} - {contact.country.name}
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              style={{ backgroundColor: "#46139f", color: "#fff" }}
              className="btn"
              onClick={() => handleModalAButtonClick("A")}
            >
              All Contacts
            </button>
            <button
              type="button"
              style={{ backgroundColor: "#ff7f50", color: "#fff" }}
              className="btn btn-primary"
              onClick={() => handleModalAButtonClick("B")}
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
