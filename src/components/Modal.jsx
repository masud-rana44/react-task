const Modal = ({ show, onHide, data }) => {
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
            <h5 className="modal-title">Modal C</h5>
            <button type="button" className="close" onClick={onHide}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div>
              <h6>All Contacts</h6>
              <div> Modal C</div>
              <p>Id: {data?.id}</p>
              <p>Phone: {data?.phone}</p>
              <p>Country: {data?.country?.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
