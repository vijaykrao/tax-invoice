function App() {
  const e = React.createElement;
  const useState = React.useState;

  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Navigation state
  const [currentPage, setCurrentPage] = useState("home"); // "home" or "settings"

  // Company data (hardcoded defaults, can be changed in settings)
  const [companyData, setCompanyData] = useState({
    companyName: "CREATIVE PACKAGING",
    companyAddress: "#70, \"O\" (Opp. Lunar's Exports) Hootagalli Industrial Area\n Mysore - 570018",
    companyPhone: "990 090 0100, 948 353 4500",
    companyEmail: "cp.mysore@gmail.com",
    companyGST: "29AAFFC957P1ZQ",
    bankName: "CANARA BANK - SME Branch, Mysore",
    bankAccount: "2510261-1-158",
    bankIFSC: "CANB0002510",
  });

  const [billData, setBillData] = useState({
    billNumber: "",
    billDate: "",
    poNumber: "",
    poDate: "",
    refNumber: "",
    refName: "",
    dispatchThrough: "",
    ewayBill: "",
    customerName: "",
    customerAddress: "",
    customerPhone: "",
    customerGST: "",
    cgst: "9",
    sgst: "9",
    igst: "0",
    notes: "",
  });

  const [items, setItems] = useState([
    { description: "", hsn: "", quantity: "", price: "", total: "0.00" },
  ]);

  // If not logged in, show login page
  if (!isLoggedIn) {
    return e(LoginPage, {
      onLogin: setIsLoggedIn,
    });
  }

  // If on settings page, show settings
  if (currentPage === "settings") {
    return e(SettingsPage, {
      companyData: companyData,
      onUpdate: setCompanyData,
      onBack: () => setCurrentPage("home"),
    });
  }

  // Merge company data with bill data for preview
  const fullBillData = { ...companyData, ...billData };

  // If logged in, show bill generator
  return e(
    "div",
    { className: "container" },
    e(
      "div",
      { className: "header-bar" },
      e("h2", { style: { margin: 0 } }, "Bill Generator"),
      e(
        "div",
        { style: { display: "flex", gap: "10px" } },
        e(
          "button",
          {
            className: "btn btn-secondary",
            onClick: () => setCurrentPage("settings"),
            style: { padding: "8px 16px" },
            title: "Settings",
          },
          "⚙️ Settings"
        ),
        e(
          "button",
          {
            className: "btn btn-secondary",
            onClick: () => setIsLoggedIn(false),
            style: { padding: "8px 16px" },
          },
          "Logout"
        )
      )
    ),
    e(BillForm, {
      billData: billData,
      onUpdate: setBillData,
      items: items,
      onItemsUpdate: setItems,
    }),
    e(BillPreview, {
      billData: fullBillData,
      items: items,
    })
  );
}
