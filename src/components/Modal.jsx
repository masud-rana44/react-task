import React, { useState, useEffect } from "react";

const Modal = ({ show, onHide }) => {
  const [modalType, setModalType] = useState("A");
  const [showModalC, setShowModalC] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [onlyEven, setOnlyEven] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (modalType === "A") {
      fetchContacts();
    } else if (modalType === "B") {
      fetchUSContacts();
    }
  }, [modalType]);

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

  const handleModalButtonClick = (type) => {
    setModalType(type);
    setShowModalC(false);
    setSelectedContact(null);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowModalC(true);
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

  const filteredContacts = onlyEven
    ? contacts.filter((contact) => contact.id % 2 === 0)
    : contacts;

  console.log(filteredContacts);

  return (
    <div
      className={`modal fade ${show ? "show" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: show ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal Title</h5>
            <button type="button" className="close" onClick={onHide}>
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
                <div
                  key={contact.id}
                  onClick={() => handleContactClick(contact.id)}
                >
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
              onClick={() => handleModalButtonClick("A")}
            >
              All Contacts
            </button>
            <button
              type="button"
              style={{ backgroundColor: "#ff7f50", color: "#fff" }}
              className="btn btn-primary"
              onClick={() => handleModalButtonClick("B")}
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
              className="btn btn-secondary"
              onClick={onHide}
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

export default Modal;
