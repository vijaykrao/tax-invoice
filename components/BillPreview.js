function BillPreview({ billData, items }) {
  const e = React.createElement;
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);
  };

  const calculateCGST = () => {
    const subtotal = calculateSubtotal();
    return (subtotal * 9) / 100;
  };

  const calculateSGST = () => {
    const subtotal = calculateSubtotal();
    return (subtotal * 9) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateCGST() + calculateSGST();
  };

  const numberToWords = (num) => {
    if (num === 0) return "Zero";

    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    const convertLessThanThousand = (n) => {
      if (n === 0) return "";

      if (n < 10) return ones[n];

      if (n < 20) return teens[n - 10];

      if (n < 100) {
        return (
          tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + ones[n % 10] : "")
        );
      }

      return (
        ones[Math.floor(n / 100)] +
        " Hundred" +
        (n % 100 !== 0 ? " " + convertLessThanThousand(n % 100) : "")
      );
    };

    const convertNumber = (n) => {
      if (n === 0) return "Zero";

      let crore = Math.floor(n / 10000000);
      let lakh = Math.floor((n % 10000000) / 100000);
      let thousand = Math.floor((n % 100000) / 1000);
      let remainder = n % 1000;

      let result = "";

      if (crore > 0) {
        result += convertLessThanThousand(crore) + " Crore ";
      }

      if (lakh > 0) {
        result += convertLessThanThousand(lakh) + " Lakh ";
      }

      if (thousand > 0) {
        result += convertLessThanThousand(thousand) + " Thousand ";
      }

      if (remainder > 0) {
        result += convertLessThanThousand(remainder);
      }

      return result.trim();
    };

    const rupees = Math.floor(num);
    const paise = Math.round((num - rupees) * 100);

    let words = convertNumber(rupees) + " Rupees";

    if (paise > 0) {
      words += " and " + convertNumber(paise) + " Paise";
    }

    return words + " Only";
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById("bill-preview");
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jspdf.jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Bill_${billData.billNumber || "Invoice"}.pdf`);
    });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN");
  };

  const cellStyle = {
    border: "1px solid #333",
    padding: "8px",
    fontSize: "12px",
  };
  const headerCellStyle = {
    ...cellStyle,
    fontWeight: "bold",
    background: "#f5f5f5",
  };

  return e(
    "div",
    { className: "preview-section" },
    e("h2", null, "📄 Bill Preview"),

    e(
      "div",
      {
        className: "bill-preview",
        id: "bill-preview",
        style: { fontSize: "12px" },
      },

      // Main table structure for the entire invoice
      e(
        "table",
        {
          style: {
            width: "100%",
            borderCollapse: "collapse",
            border: "2px solid #333",
          },
        },
        e(
          "tbody",
          null,
          // Row 1: Header with TAX INVOICE and invoice details
          e(
            "tr",
            null,
            e(
              "td",
              {
                colSpan: 5,
                style: {
                  ...cellStyle,
                  textAlign: "center",
                  borderBottom: "2px solid #333",
                },
              },
              e(
                "div",
                {
                  style: {
                    fontWeight: "bold",
                    fontSize: "18px",
                    marginBottom: "10px",
                  },
                },
                "TAX INVOICE"
              ),
              e(
                "div",
                {
                  style: {
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#000",
                    marginBottom: "5px",
                  },
                },
                billData.companyName || "Company Name"
              ),
              e(
                "div",
                { style: { whiteSpace: "pre-line", fontSize: "12px" } },
                billData.companyAddress || ""
              ),
              e(
                "div",
                { style: { marginTop: "5px", fontSize: "12px" } },
                `Email: ${billData.companyEmail || ""}`
              ),
              e(
                "div",
                { style: { fontSize: "11px", marginTop: "5px" } },
                `📞 ${billData.companyPhone || ""}`
              )
            ),
            e(
              "td",
              {
                colSpan: 2,
                style: {
                  ...cellStyle,
                  borderBottom: "2px solid #333",
                  verticalAlign: "top",
                  padding: "15px 8px",
                },
              },
              e(
                "div",
                { style: { marginBottom: "12px" } },
                e("strong", null, "No: "),
                billData.billNumber || ""
              ),
              e(
                "div",
                { style: { marginBottom: "12px" } },
                e("strong", null, "Date: "),
                formatDate(billData.billDate)
              ),
              e(
                "div",
                null,
                e("strong", null, "GSTN: "),
                billData.companyGST || ""
              )
            )
          ),
          // Row 3: Customer (To) section and Invoice details
          e(
            "tr",
            null,
            e(
              "td",
              {
                colSpan: 4,
                rowSpan: 4,
                style: { ...cellStyle, verticalAlign: "top", width: "50%" },
              },
              e(
                "div",
                {
                  style: {
                    fontWeight: "bold",
                    textDecoration: "underline",
                    marginBottom: "8px",
                  },
                },
                "To"
              ),
              e(
                "div",
                {
                  style: {
                    fontWeight: "bold",
                    fontSize: "14px",
                    marginBottom: "5px",
                  },
                },
                billData.customerName || ""
              ),
              e(
                "div",
                { style: { whiteSpace: "pre-line", marginBottom: "5px" } },
                billData.customerAddress || ""
              ),
              billData.customerPhone &&
                e("div", null, `Contact: ${billData.customerPhone}`)
            ),
            e(
              "td",
              { colSpan: 3, style: cellStyle },
              e(
                "div",
                { style: { display: "flex", justifyContent: "space-between" } },
                e(
                  "span",
                  null,
                  e("strong", null, "PO No: "),
                  billData.poNumber || ""
                ),
                e(
                  "span",
                  {
                    style: {
                      textAlign: "right",
                      display: "inline-block",
                    },
                  },
                  e("strong", null, "Date: "),
                  e(
                    "span",
                    {
                      style: {
                        borderBottom: "1px solid transparent",
                        display: "inline-block",
                        minWidth: "80px",
                        textAlign: "center",
                      },
                    },
                    formatDate(billData.poDate) || "\u00A0"
                  )
                )
              )
            )
          ),
          e(
            "tr",
            null,
            e(
              "td",
              { colSpan: 3, style: cellStyle },
              e(
                "div",
                { style: { display: "flex", justifyContent: "space-between" } },
                e(
                  "span",
                  null,
                  e("strong", null, "Ref No: "),
                  billData.refNumber || ""
                ),
                e(
                  "span",
                  {
                    style: {
                      textAlign: "right",
                      display: "inline-block",
                    },
                  },
                  e("strong", null, "Date: "),
                  e(
                    "span",
                    {
                      style: {
                        borderBottom: "1px solid transparent",
                        display: "inline-block",
                        minWidth: "80px",
                        textAlign: "center",
                      },
                    },
                    formatDate(billData.refName) || "\u00A0"
                  )
                )
              )
            )
          ),
          e(
            "tr",
            null,
            e(
              "td",
              { colSpan: 3, style: cellStyle },
              e("strong", null, "Party's GST No: "),
              e(
                "span",
                { style: { color: "#0066cc" } },
                billData.customerGST || ""
              )
            )
          ),
          e(
            "tr",
            null,
            e(
              "td",
              {
                colSpan: 3,
                style: { ...cellStyle, borderBottom: "2px solid #333" },
              },
              e("strong", null, "Dispatching Through: "),
              billData.dispatchThrough || ""
            )
          ),
          // Items table header
          e(
            "tr",
            null,
            e(
              "td",
              {
                style: { ...headerCellStyle, width: "8%", textAlign: "center" },
              },
              "No"
            ),
            e(
              "td",
              { colSpan: 3, style: { ...headerCellStyle, width: "42%" } },
              "Particulars"
            ),
            e(
              "td",
              {
                style: {
                  ...headerCellStyle,
                  width: "12%",
                  textAlign: "center",
                },
              },
              "No's"
            ),
            e(
              "td",
              {
                style: { ...headerCellStyle, width: "18%", textAlign: "right" },
              },
              "Price/Unit"
            ),
            e(
              "td",
              {
                style: { ...headerCellStyle, width: "20%", textAlign: "right" },
              },
              "Total"
            )
          ),
          // Items rows
          ...items.map((item, index) =>
            e(
              "tr",
              { key: index },
              e(
                "td",
                { style: { ...cellStyle, textAlign: "center" } },
                index + 1
              ),
              e(
                "td",
                { colSpan: 3, style: { ...cellStyle, whiteSpace: "pre-line" } },
                item.description || "-"
              ),
              e(
                "td",
                { style: { ...cellStyle, textAlign: "center" } },
                item.quantity || "0"
              ),
              e(
                "td",
                { style: { ...cellStyle, textAlign: "right" } },
                formatCurrency(parseFloat(item.price || 0))
              ),
              e(
                "td",
                { style: { ...cellStyle, textAlign: "right" } },
                formatCurrency(parseFloat(item.total || 0))
              )
            )
          ),
          // Spacer row to fill remaining space with column lines
          e(
            "tr",
            null,
            e(
              "td",
              {
                style: {
                  ...cellStyle,
                  borderTop: "none",
                  padding: "0",
                  height: "300px",
                  width: "8%",
                },
              },
              ""
            ),
            e(
              "td",
              {
                colSpan: 3,
                style: {
                  ...cellStyle,
                  borderTop: "none",
                  padding: "8px",
                  height: "300px",
                  width: "42%",
                  verticalAlign: "bottom",
                },
              },
              e(
                "div",
                { style: { fontWeight: "bold", fontSize: "11px" } },
                "HSN CODE: 123456"
              )
            ),
            e(
              "td",
              {
                style: {
                  ...cellStyle,
                  borderTop: "none",
                  padding: "0",
                  height: "300px",
                  width: "12%",
                },
              },
              ""
            ),
            e(
              "td",
              {
                style: {
                  ...cellStyle,
                  borderTop: "none",
                  padding: "0",
                  height: "300px",
                  width: "18%",
                },
              },
              ""
            ),
            e(
              "td",
              {
                style: {
                  ...cellStyle,
                  borderTop: "none",
                  padding: "0",
                  height: "300px",
                  width: "20%",
                },
              },
              ""
            )
          ),
          // Bottom section: E-Way Bill, Amount in Words, Bank details on left; GST and Total on right
          e(
            "tr",
            null,
            e(
              "td",
              {
                colSpan: 4,
                style: {
                  ...cellStyle,
                  verticalAlign: "top",
                  borderTop: "2px solid #333",
                  borderBottom: "1px solid #333",
                },
              },
              e(
                "div",
                {
                  style: {
                    marginBottom: "10px",
                    fontWeight: "bold",
                  },
                },
                "E-Way Bill No: ",
                billData.ewayBill
                  ? billData.ewayBill.replace(/(.{4})/g, "$1 ").trim()
                  : ""
              )
            ),
            e(
              "td",
              {
                style: {
                  ...cellStyle,
                  borderTop: "2px solid #333",
                  borderBottom: "1px solid #333",
                },
              },
              `CGST`
            ),
            e(
              "td",
              {
                style: {
                  ...cellStyle,
                  textAlign: "center",
                  borderTop: "2px solid #333",
                  borderBottom: "1px solid #333",
                },
              },
              `9%`
            ),
            e(
              "td",
              {
                style: {
                  ...cellStyle,
                  textAlign: "right",
                  borderTop: "2px solid #333",
                  borderBottom: "1px solid #333",
                },
              },
              calculateCGST() > 0 ? formatCurrency(calculateCGST()) : ""
            )
          ),
          e(
            "tr",
            null,
            e(
              "td",
              {
                colSpan: 4,
                style: {
                  ...cellStyle,
                  verticalAlign: "top",
                  borderBottom: "1px solid #333",
                },
              },
              e(
                "div",
                {
                  style: {
                    marginBottom: "10px",
                    fontWeight: "bold",
                  },
                },
                "Amount in Words: ",
                calculateTotal() > 0 ? numberToWords(calculateTotal()) : ""
              )
            ),
            e(
              "td",
              { style: { ...cellStyle, borderBottom: "1px solid #333" } },
              `SGST`
            ),
            e(
              "td",
              {
                style: {
                  ...cellStyle,
                  textAlign: "center",
                  borderBottom: "1px solid #333",
                },
              },
              `9%`
            ),
            e(
              "td",
              {
                style: {
                  ...cellStyle,
                  textAlign: "right",
                  borderBottom: "1px solid #333",
                },
              },
              calculateSGST() > 0 ? formatCurrency(calculateSGST()) : ""
            )
          ),
          e(
            "tr",
            null,
            e(
              "td",
              {
                colSpan: 4,
                rowSpan: 2,
                style: {
                  ...cellStyle,
                  verticalAlign: "top",
                },
              },
              e(
                "div",
                {
                  style: {
                    fontWeight: "bold",
                    marginTop: "auto",
                    marginBottom: "8px",
                  },
                }
                // "Bank Details"
              ),
              e(
                "div",
                {
                  style: {
                    display: "flex",
                    fontWeight: "bold",
                    marginBottom: "3px",
                  },
                },
                e("span", { style: { minWidth: "90px" } }, "Bank:"),
                e("span", null, billData.bankName || "")
              ),
              e(
                "div",
                {
                  style: {
                    display: "flex",
                    fontWeight: "bold",
                    marginBottom: "2px",
                  },
                },
                e("span", { style: { minWidth: "90px" } }, "Account No:"),
                e("span", null, billData.bankAccount || "")
              ),
              e(
                "div",
                { style: { display: "flex", fontWeight: "bold" } },
                e("span", { style: { minWidth: "90px" } }, "IFSC Code:"),
                e("span", null, billData.bankIFSC || "")
              )
            ),
            e(
              "td",
              {
                style: { ...cellStyle, fontWeight: "bold" },
              },
              "Round off"
            ),
            e("td", { style: cellStyle }, ""),
            e("td", { style: { ...cellStyle, textAlign: "right" } }, "")
          ),
          e(
            "tr",
            null,
            e(
              "td",
              {
                style: {
                  ...cellStyle,
                  fontWeight: "bold",
                  borderTop: "2px solid #333",
                },
              },
              "Total"
            ),
            e(
              "td",
              { style: { ...cellStyle, borderTop: "2px solid #333" } },
              ""
            ),
            e(
              "td",
              {
                style: {
                  ...cellStyle,
                  textAlign: "right",
                  fontWeight: "bold",
                  borderTop: "2px solid #333",
                },
              },
              calculateTotal() > 0 ? formatCurrency(calculateTotal()) : ""
            )
          ),
          // Footer section
          e(
            "tr",
            null,
            e(
              "td",
              {
                colSpan: 7,
                style: {
                  ...cellStyle,
                  borderTop: "2px solid #333",
                  padding: "0",
                },
              },
              e(
                "div",
                { style: { display: "flex" } },
                e(
                  "div",
                  {
                    style: {
                      flex: 1,
                      padding: "10px",
                      borderRight: "1px solid transparent",
                    },
                  },
                  e(
                    "div",
                    {
                      style: {
                        fontWeight: "bold",
                        textDecoration: "underline",
                        // marginBottom: "8px",
                      },
                    },
                    "Terms & Conditions:"
                  ),
                  e(
                    "div",
                    { style: { fontSize: "11px" } },
                    "1. Goods once sold will not be taken back."
                  ),
                  e(
                    "div",
                    { style: { fontSize: "11px" } },
                    "2. This bill is due for payment on ____________ failing which"
                  ),
                  e(
                    "div",
                    { style: { fontSize: "11px" } },
                    "3. Interest at 24% will be charged from the date of the bill."
                  ),
                  e(
                    "div",
                    { style: { fontSize: "11px" } },
                    "4. All disputes are subject to Bangalore Jurisdiction."
                  ),
                  billData.notes &&
                    e(
                      "div",
                      {
                        style: {
                          fontSize: "11px",
                          marginTop: "5px",
                          whiteSpace: "pre-line",
                        },
                      },
                      billData.notes
                    )
                ),
                // e("div", { style: { flex: 1, padding: "10px" } })
              )
            )
          ),
          e(
            "tr",
            null,
            e(
              "td",
              { colSpan: 7, style: { ...cellStyle, padding: "0" } },
              e(
                "div",
                { style: { display: "flex" } },
                e(
                  "div",
                  {
                    style: {
                      flex: 1,
                      padding: "10px",
                      borderRight: "1px solid transparent",
                    },
                  },
                  e(
                    "div",
                    { style: { marginTop: "60px" } },
                    "Party's Signature"
                  )
                ),
                e(
                  "div",
                  {
                    style: {
                      flex: 1,
                      padding: "10px",
                      textAlign: "right",
                    },
                  },
                  e(
                    "div",
                    { style: { fontWeight: "bold" } },
                    `For ${billData.companyName || "Company"}`
                  ),
                  e("div", { style: { marginTop: "40px" } }, "Partner/Manager")
                )
              )
            )
          )
          // e(
          //   "tr",
          //   null,
          //   e(
          //     "td",
          //     {
          //       colSpan: 7,
          //       style: {
          //         ...cellStyle,
          //         textAlign: "center",
          //         fontSize: "10px",
          //         color: "#666",
          //         padding: "5px",
          //       },
          //     },
          //     "This is a computer generated invoice"
          //   )
          // )
        )
      )
    ),

    // Action Buttons
    e(
      "button",
      { className: "btn btn-success", onClick: handlePrint },
      "🖨️ Print Bill"
    ),
    e(
      "button",
      {
        className: "btn btn-success",
        onClick: handleDownloadPDF,
        style: { marginTop: "10px" },
      },
      "📥 Download PDF"
    )
  );
}
