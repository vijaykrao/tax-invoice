function BillForm({ billData, onUpdate, items, onItemsUpdate }) {
  const e = React.createElement;
  const handleInputChange = (field, value) => {
    onUpdate({ ...billData, [field]: value });
  };

  const addItem = () => {
    onItemsUpdate([
      ...items,
      { description: "", hsn: "", quantity: "", price: "", total: "0.00" },
    ]);
  };

  const updateItem = (index, updatedItem) => {
    const newItems = [...items];
    newItems[index] = updatedItem;
    onItemsUpdate(newItems);
  };

  const removeItem = (index) => {
    onItemsUpdate(items.filter((_, i) => i !== index));
  };

  return e(
    "div",
    { className: "form-section" },
    e("h2", null, "📝 Invoice Details"),

    // Bill Info
    e(
      "div",
      { className: "form-group" },
      e("label", null, "Bill Number"),
      e("input", {
        type: "text",
        value: billData.billNumber || "",
        onChange: (ev) => handleInputChange("billNumber", ev.target.value),
        placeholder: "INV-001",
      })
    ),

    e(
      "div",
      { className: "form-group" },
      e("label", null, "Bill Date"),
      e("input", {
        type: "date",
        value: billData.billDate || "",
        onChange: (ev) => handleInputChange("billDate", ev.target.value),
      })
    ),

    e("h3", { style: { marginTop: "20px" } }, "Order Reference"),

    e(
      "div",
      {
        style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" },
      },
      e(
        "div",
        { className: "form-group" },
        e("label", null, "PO Number"),
        e("input", {
          type: "text",
          value: billData.poNumber || "",
          onChange: (ev) => handleInputChange("poNumber", ev.target.value),
          placeholder: "PO Number",
        })
      ),
      e(
        "div",
        { className: "form-group" },
        e("label", null, "PO Date"),
        e("input", {
          type: "date",
          value: billData.poDate || "",
          onChange: (ev) => handleInputChange("poDate", ev.target.value),
        })
      )
    ),

    e(
      "div",
      {
        style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" },
      },
      e(
        "div",
        { className: "form-group" },
        e("label", null, "Ref Number"),
        e("input", {
          type: "text",
          value: billData.refNumber || "",
          onChange: (ev) => handleInputChange("refNumber", ev.target.value),
          placeholder: "Reference Number",
        })
      ),
      e(
        "div",
        { className: "form-group" },
        e("label", null, "Date"),
        e("input", {
          type: "date",
          value: billData.refName || "",
          onChange: (ev) => handleInputChange("refName", ev.target.value),
        })
      )
    ),

    e(
      "div",
      {
        style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" },
      },
      e(
        "div",
        { className: "form-group" },
        e("label", null, "Dispatch Through"),
        e("input", {
          type: "text",
          value: billData.dispatchThrough || "",
          onChange: (ev) =>
            handleInputChange("dispatchThrough", ev.target.value),
          placeholder: "e.g., KA 01-AA2345",
        })
      ),
      e(
        "div",
        { className: "form-group" },
        e("label", null, "E-Way Bill No."),
        e("input", {
          type: "text",
          value: billData.ewayBill || "",
          onChange: (ev) => handleInputChange("ewayBill", ev.target.value),
          placeholder: "E-Way Bill Number",
        })
      )
    ),

    // Customer Info
    e("h3", { style: { marginTop: "20px" } }, "Customer Details"),
    e(
      "div",
      { className: "form-group" },
      e("label", null, "Customer Name"),
      e("input", {
        type: "text",
        value: billData.customerName || "",
        onChange: (ev) => handleInputChange("customerName", ev.target.value),
        placeholder: "Enter customer name",
      })
    ),

    e(
      "div",
      { className: "form-group" },
      e("label", null, "Customer Address"),
      e("textarea", {
        value: billData.customerAddress || "",
        onChange: (ev) => handleInputChange("customerAddress", ev.target.value),
        placeholder: "Enter customer address",
      })
    ),

    e(
      "div",
      { className: "form-group" },
      e("label", null, "Customer Contact Number (Optional)"),
      e("input", {
        type: "text",
        value: billData.customerPhone || "",
        onChange: (ev) => handleInputChange("customerPhone", ev.target.value),
        placeholder: "Enter customer contact number",
      })
    ),

    e(
      "div",
      { className: "form-group" },
      e("label", null, "Customer GST Number (Optional)"),
      e("input", {
        type: "text",
        value: billData.customerGST || "",
        onChange: (ev) => handleInputChange("customerGST", ev.target.value),
        placeholder: "Enter customer GST number",
      })
    ),

    // Items Section
    e(
      "div",
      { className: "items-section" },
      e("h3", { style: { marginTop: "20px", marginBottom: "15px" } }, "Items"),
      ...items.map((item, index) =>
        e(ItemRow, {
          key: index,
          item: item,
          index: index,
          onUpdate: updateItem,
          onRemove: removeItem,
        })
      ),
      e(
        "button",
        {
          className: "btn btn-primary btn-add",
          onClick: addItem,
          style: { marginTop: "5px" },
        },
        "+ Add Item"
      )
    ),

    e(
      "div",
      { className: "form-group" },
      e("label", null, "Notes"),
      e("textarea", {
        value: billData.notes || "",
        onChange: (ev) => handleInputChange("notes", ev.target.value),
        placeholder: "Additional notes or terms",
      })
    )
  );
}
