function ItemRow({ item, index, onUpdate, onRemove }) {
  const e = React.createElement;
  const handleChange = (field, value) => {
    const updatedItem = { ...item, [field]: value };

    // Auto-calculate total
    if (field === "quantity" || field === "price") {
      const qty =
        field === "quantity"
          ? parseFloat(value) || 0
          : parseFloat(item.quantity) || 0;
      const price =
        field === "price"
          ? parseFloat(value) || 0
          : parseFloat(item.price) || 0;
      updatedItem.total = (qty * price).toFixed(2);
    }

    onUpdate(index, updatedItem);
  };

  return e(
    "div",
    {
      className: "item-row",
      style: {
        marginBottom: "15px",
      },
    },
    // Row 1: Description (full width)
    e(
      "div",
      { style: { marginBottom: "8px" } },
      e(
        "label",
        {
          style: {
            display: "block",
            marginBottom: "2px",
            fontWeight: "500",
            fontSize: "12px",
            color: "#333",
          },
        },
        "Description"
      ),
      e("textarea", {
        placeholder: "Enter item description",
        value: item.description,
        onChange: (ev) => handleChange("description", ev.target.value),
        style: {
          width: "100%",
          minHeight: "50px",
          resize: "vertical",
          fontFamily: "Arial, sans-serif",
          padding: "5px 6px",
          border: "1px solid #bbb",
          borderRadius: "0",
          fontSize: "13px",
          boxSizing: "border-box",
        },
      })
    ),
    // Row 2: Qty, Price, Total, Delete button
    e(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr 1.5fr 50px",
          gap: "8px",
          alignItems: "end",
        },
      },
      e(
        "div",
        null,
        e(
          "label",
          {
            style: {
              display: "block",
              marginBottom: "2px",
              fontWeight: "500",
              fontSize: "12px",
              color: "#333",
            },
          },
          "Qty"
        ),
        e("input", {
          type: "number",
          placeholder: "Qty",
          value: item.quantity,
          onChange: (ev) => handleChange("quantity", ev.target.value),
          min: "0",
          step: "1",
          style: {
            width: "100%",
            padding: "5px 6px",
            border: "1px solid #bbb",
            borderRadius: "0",
            fontSize: "13px",
            boxSizing: "border-box",
          },
        })
      ),
      e(
        "div",
        null,
        e(
          "label",
          {
            style: {
              display: "block",
              marginBottom: "2px",
              fontWeight: "500",
              fontSize: "12px",
              color: "#333",
            },
          },
          "Price/Unit"
        ),
        e("input", {
          type: "number",
          placeholder: "Price/Unit",
          value: item.price,
          onChange: (ev) => handleChange("price", ev.target.value),
          min: "0",
          step: "0.01",
          style: {
            width: "100%",
            padding: "5px 6px",
            border: "1px solid #bbb",
            borderRadius: "0",
            fontSize: "13px",
            boxSizing: "border-box",
          },
        })
      ),
      e(
        "div",
        null,
        e(
          "label",
          {
            style: {
              display: "block",
              marginBottom: "2px",
              fontWeight: "500",
              fontSize: "12px",
              color: "#333",
            },
          },
          "Total"
        ),
        e("input", {
          type: "number",
          placeholder: "Total",
          value: item.total,
          readOnly: true,
          style: {
            width: "100%",
            padding: "5px 6px",
            border: "1px solid #bbb",
            borderRadius: "0",
            background: "#f5f5f5",
            fontSize: "13px",
            boxSizing: "border-box",
          },
        })
      ),
      e(
        "button",
        {
          className: "btn btn-danger",
          onClick: () => onRemove(index),
          style: {
            height: "28px",
            padding: "0",
            width: "32px",
            fontSize: "14px",
            marginTop: "auto",
          },
        },
        "✕"
      )
    )
  );
}
