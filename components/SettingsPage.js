function SettingsPage({ companyData, onUpdate, onBack }) {
  const e = React.createElement;

  const handleChange = (field, value) => {
    onUpdate({ ...companyData, [field]: value });
  };

  return e(
    "div",
    { className: "settings-container" },
    e(
      "div",
      { className: "settings-header" },
      e(
        "button",
        {
          className: "btn btn-secondary",
          onClick: onBack,
          style: { marginRight: "auto" },
        },
        "← Back"
      ),
      e(
        "h1",
        { style: { margin: "0", flex: 1, textAlign: "center" } },
        "Company Settings"
      )
    ),
    e(
      "div",
      { className: "settings-form" },
      e("h3", null, "Company Information"),
      e(
        "div",
        { className: "form-group" },
        e("label", null, "Company Name *"),
        e("input", {
          type: "text",
          className: "form-control",
          value: companyData.companyName,
          onChange: (event) => handleChange("companyName", event.target.value),
          placeholder: "Enter company name",
        })
      ),
      e(
        "div",
        { className: "form-group" },
        e("label", null, "Company Address *"),
        e("textarea", {
          className: "form-control",
          value: companyData.companyAddress,
          onChange: (event) =>
            handleChange("companyAddress", event.target.value),
          placeholder: "Enter company address",
          rows: 3,
        })
      ),
      e(
        "div",
        { className: "form-group" },
        e("label", null, "Company Phone *"),
        e("input", {
          type: "tel",
          className: "form-control",
          value: companyData.companyPhone,
          onChange: (event) => handleChange("companyPhone", event.target.value),
          placeholder: "Enter phone number",
        })
      ),
      e(
        "div",
        { className: "form-group" },
        e("label", null, "Company Email *"),
        e("input", {
          type: "email",
          className: "form-control",
          value: companyData.companyEmail,
          onChange: (event) => handleChange("companyEmail", event.target.value),
          placeholder: "Enter email address",
        })
      ),
      e(
        "div",
        { className: "form-group" },
        e("label", null, "Company GST Number *"),
        e("input", {
          type: "text",
          className: "form-control",
          value: companyData.companyGST,
          onChange: (event) => handleChange("companyGST", event.target.value),
          placeholder: "Enter GST number (e.g., 29ABCDE1234F1Z5)",
        })
      ),
      e("h3", { style: { marginTop: "30px" } }, "Bank Details"),
      e(
        "div",
        { className: "form-group" },
        e("label", null, "Bank Name"),
        e("input", {
          type: "text",
          className: "form-control",
          value: companyData.bankName || "",
          onChange: (event) => handleChange("bankName", event.target.value),
          placeholder: "Enter bank name",
        })
      ),
      e(
        "div",
        { className: "form-group" },
        e("label", null, "Account Number"),
        e("input", {
          type: "text",
          className: "form-control",
          value: companyData.bankAccount || "",
          onChange: (event) => handleChange("bankAccount", event.target.value),
          placeholder: "Enter account number",
        })
      ),
      e(
        "div",
        { className: "form-group" },
        e("label", null, "IFSC Code"),
        e("input", {
          type: "text",
          className: "form-control",
          value: companyData.bankIFSC || "",
          onChange: (event) => handleChange("bankIFSC", event.target.value),
          placeholder: "Enter IFSC code",
        })
      ),
      e(
        "button",
        {
          className: "btn btn-primary",
          onClick: onBack,
          style: { marginTop: "20px", width: "100%" },
        },
        "Save & Go Back"
      )
    )
  );
}
