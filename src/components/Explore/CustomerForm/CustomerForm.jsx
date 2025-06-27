import "./CustomerForm.css";

const CustomerForm = ({
  customerName,
  mobileNumber,
  setMobileNumber,
  setCustomerName,
}) => {
  return (
    <div className="p-1">
      <div className="mb-2">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="customerName" className="col-4 text-sm">
            Customer Name
          </label>
          <input
            type="text"
            name=""
            id="customerName"
            className="form-control form-control-sm"
            onChange={(e) => setCustomerName(e.target.value)}
            value={customerName}
          />
        </div>
      </div>
      <div className="mb-1">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="customerPhone" className="col-4 text-sm">
            Mobile Number
          </label>
          <input
            type="phone"
            name=""
            id="customerPhone"
            className="form-control form-control-sm"
            onChange={(e) => setMobileNumber(e.target.value)}
            value={mobileNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
