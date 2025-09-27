import "./App.css";
import { useState, useEffect } from "react";
import { FaRegMoon, FaRegQuestionCircle } from "react-icons/fa";
import logo from "./logo.svg";

// Import the JSON data files
import data2 from "./data/data_2.json";
import data1 from "./data/data_1.json";
import completeTableData from "./data/complete_table_estimated_enriched.json";

function Header() {
  const now = new Date();
  const timeString =
    now.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/New_York",
    }) + " ET";

  const [headerSearch, setHeaderSearch] = useState(
    window.__findexSearchTerm || ""
  );

  useEffect(() => {
    // Sync header search bar with StockTable
    window.__findexSetHeaderSearch = setHeaderSearch;
    return () => {
      window.__findexSetHeaderSearch = null;
    };
  }, []);

  useEffect(() => {
    // When headerSearch changes, update global and StockTable
    window.__findexSearchTerm = headerSearch;
    if (window.__findexSetSearchTerm)
      window.__findexSetSearchTerm(headerSearch);
  }, [headerSearch]);

  return (
    <header className="main-header">
      <div className="header-top-row">
        <div
          className="logo-search"
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "0.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Logo" className="logo-img" />
            <span className="logo-text">Findex</span>
          </div>
          <div
            className="search-bar"
            style={{ width: "100%", marginTop: "0.7rem", position: "relative" }}
          >
            <span
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#a0aec0",
                pointerEvents: "none",
              }}
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242 1.106a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search companies..."
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              style={{
                paddingLeft: "44px",
              }}
            />
          </div>
        </div>
      </div>
      <nav className="main-navbar">
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#news">News</a>
          <a href="#screener">Screener</a>
          <a href="#maps">Maps</a>
          <a href="#groups">Groups</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#insider">Insider</a>
          <a href="#futures">Futures</a>
          <a href="#forex">Forex</a>
          <a href="#crypto">Crypto</a>
          <a href="#calendar">Calendar</a>
          <a href="#backtests">Backtests</a>
          <a href="#pricing">Pricing</a>
        </div>
        <div className="nav-right">
          <span className="nav-time">{timeString}</span>
          <button className="theme-toggle" title="Theme">
            <FaRegMoon size={20} />
          </button>
          <button className="nav-help" title="Help">
            <FaRegQuestionCircle size={20} />
          </button>
          <button className="nav-btn login-btn nav-login">Login</button>
          <button className="nav-btn register-btn nav-register">
            Register
          </button>
        </div>
      </nav>
    </header>
  );
}

function FilterTabs() {
  const tabs = [
    "Overview",
    "Valuation",
    "Financial",
    "Ownership",
    "Performance",
    "Technical",
    "ETF",
    "ETF Perf",
    "Custom",
    "Charts",
    "Tickers",
    "Basic",
    "TA",
    "News",
    "Snapshot",
    "Maps",
    "Stats",
  ];

  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="filter-tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={tab === activeTab ? "active" : ""}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// Filter configuration based on Finviz structure
const filterConfig = {
  Descriptive: [
    {
      key: "exchange",
      label: "Exchange",
      type: "select",
      options: ["Any", "NYSE", "NASDAQ", "AMEX"],
    },
    {
      key: "marketCap",
      label: "Market Cap",
      type: "select",
      options: [
        "Any",
        "Mega (>$200B)",
        "Large ($10B-$200B)",
        "Mid ($2B-$10B)",
        "Small ($300M-$2B)",
        "Micro ($50M-$300M)",
        "Nano (<$50M)",
      ],
    },
    { key: "sector", label: "Sector", type: "select", options: ["Any"] },
    { key: "industry", label: "Industry", type: "select", options: ["Any"] },
    { key: "country", label: "Country", type: "select", options: ["Any"] },
  ],
  Fundamental: [
    {
      key: "pe",
      label: "P/E",
      type: "range",
      options: [
        "Any",
        "Over 10",
        "Under 10",
        "Over 20",
        "Under 20",
        "Over 30",
        "Under 30",
      ],
    },
    {
      key: "forwardPE",
      label: "Forward P/E",
      type: "range",
      options: ["Any", "Over 10", "Under 10", "Over 20", "Under 20"],
    },
    {
      key: "peg",
      label: "PEG",
      type: "range",
      options: ["Any", "Over 1", "Under 1", "Over 2", "Under 2"],
    },
    {
      key: "priceToSales",
      label: "P/S",
      type: "range",
      options: ["Any", "Over 1", "Under 1", "Over 5", "Under 5"],
    },
    {
      key: "priceToBook",
      label: "P/B",
      type: "range",
      options: ["Any", "Over 1", "Under 1", "Over 3", "Under 3"],
    },
    {
      key: "priceToCash",
      label: "Price/Cash",
      type: "range",
      options: ["Any", "Over 1", "Under 1"],
    },
    {
      key: "priceToFreeCashFlow",
      label: "Price/Free Cash Flow",
      type: "range",
      options: ["Any", "Over 10", "Under 10", "Over 20", "Under 20"],
    },
    {
      key: "evToEbitda",
      label: "EV/EBITDA",
      type: "range",
      options: ["Any", "Over 5", "Under 5", "Over 10", "Under 10"],
    },
    {
      key: "evToSales",
      label: "EV/Sales",
      type: "range",
      options: ["Any", "Over 1", "Under 1", "Over 3", "Under 3"],
    },
    {
      key: "dividendGrowth",
      label: "Dividend Growth",
      type: "select",
      options: ["Any", "Yes", "No"],
    },
  ],
  Valuation: [
    {
      key: "epsGrowth",
      label: "EPS Growth",
      type: "range",
      options: ["Any", "Positive", "Negative", "Over 10%", "Under 10%"],
    },
    {
      key: "epsGrowthNextYear",
      label: "EPS Growth Next Year",
      type: "range",
      options: ["Any", "Positive", "Negative", "Over 10%", "Under 10%"],
    },
    {
      key: "salesGrowth",
      label: "Sales Growth",
      type: "range",
      options: ["Any", "Positive", "Negative", "Over 10%", "Under 10%"],
    },
    {
      key: "salesGrowthNextYear",
      label: "Sales Growth Next Year",
      type: "range",
      options: ["Any", "Positive", "Negative", "Over 10%", "Under 10%"],
    },
    {
      key: "operatingMargin",
      label: "Operating Margin",
      type: "range",
      options: ["Any", "Positive", "Negative", "Over 10%", "Under 10%"],
    },
    {
      key: "netProfitMargin",
      label: "Net Profit Margin",
      type: "range",
      options: ["Any", "Positive", "Negative", "Over 10%", "Under 10%"],
    },
  ],
  Ownership: [
    {
      key: "institutionalOwnership",
      label: "Institutional Ownership",
      type: "range",
      options: ["Any", "Over 50%", "Under 50%", "Over 70%", "Under 30%"],
    },
    {
      key: "insiderOwnership",
      label: "Insider Ownership",
      type: "range",
      options: ["Any", "Over 10%", "Under 10%", "Over 20%", "Under 5%"],
    },
    {
      key: "institutionalTransactions",
      label: "Institutional Transactions",
      type: "select",
      options: ["Any", "Buying", "Selling"],
    },
    {
      key: "insiderTransactions",
      label: "Insider Transactions",
      type: "select",
      options: ["Any", "Buying", "Selling"],
    },
  ],
  Performance: [
    {
      key: "performance",
      label: "Performance",
      type: "range",
      options: ["Any", "Up", "Down", "Over 5%", "Under -5%"],
    },
    {
      key: "performance2",
      label: "Performance 2",
      type: "range",
      options: ["Any", "Up", "Down"],
    },
    {
      key: "volatility",
      label: "Volatility",
      type: "range",
      options: ["Any", "High", "Low"],
    },
    {
      key: "rsi",
      label: "RSI (14)",
      type: "range",
      options: ["Any", "Overbought (>70)", "Oversold (<30)", "Neutral"],
    },
    { key: "gap", label: "Gap", type: "range", options: ["Any", "Up", "Down"] },
  ],
  Technical: [
    {
      key: "sma20",
      label: "20-Day SMA",
      type: "select",
      options: ["Any", "Above Price", "Below Price"],
    },
    {
      key: "sma50",
      label: "50-Day SMA",
      type: "select",
      options: ["Any", "Above Price", "Below Price"],
    },
    {
      key: "sma200",
      label: "200-Day SMA",
      type: "select",
      options: ["Any", "Above Price", "Below Price"],
    },
    {
      key: "highLow20",
      label: "20-Day High/Low",
      type: "range",
      options: ["Any", "Near High", "Near Low"],
    },
    {
      key: "highLow50",
      label: "50-Day High/Low",
      type: "range",
      options: ["Any", "Near High", "Near Low"],
    },
    {
      key: "highLow52Week",
      label: "52-Week High/Low",
      type: "range",
      options: ["Any", "Near High", "Near Low"],
    },
    {
      key: "beta",
      label: "Beta",
      type: "range",
      options: ["Any", "High (>1.5)", "Low (<0.5)", "Neutral"],
    },
    {
      key: "pattern",
      label: "Pattern",
      type: "select",
      options: ["Any", "Bullish", "Bearish"],
    },
  ],
};

function AdvancedFilters({ filters, onFilterChange, companyData }) {
  const [activeFilterGroup, setActiveFilterGroup] = useState("Descriptive");

  // Extract unique values for dropdowns
  const sectors = [
    "Any",
    ...new Set(companyData.map((company) => company.sector).filter(Boolean)),
  ];
  const industries = [
    "Any",
    ...new Set(companyData.map((company) => company.industry).filter(Boolean)),
  ];
  const countries = [
    "Any",
    ...new Set(companyData.map((company) => company.country).filter(Boolean)),
  ];

  // Update filter options with dynamic data
  const updatedFilterConfig = { ...filterConfig };
  updatedFilterConfig.Descriptive.find((f) => f.key === "sector").options =
    sectors;
  updatedFilterConfig.Descriptive.find((f) => f.key === "industry").options =
    industries;
  updatedFilterConfig.Descriptive.find((f) => f.key === "country").options =
    countries;

  const handleFilterChange = (filterKey, value) => {
    onFilterChange(filterKey, value);
  };

  const clearAllFilters = () => {
    Object.keys(filters).forEach((key) => {
      onFilterChange(key, "Any");
    });
  };

  return (
    <div className="advanced-filters">
      <div className="filters-header">
        <div className="filter-group-tabs">
          {Object.keys(updatedFilterConfig).map((group) => (
            <button
              key={group}
              className={activeFilterGroup === group ? "active" : ""}
              onClick={() => setActiveFilterGroup(group)}
            >
              {group}
            </button>
          ))}
          <button onClick={clearAllFilters} className="clear-all">
            Clear All
          </button>
        </div>
      </div>

      <div className="filters-content">
        <div className="filter-section">
          <div className="filter-grid">
            {updatedFilterConfig[activeFilterGroup].map((filter) => (
              <div key={filter.key} className="filter-item">
                <label>{filter.label}</label>
                <select
                  value={filters[filter.key] || "Any"}
                  onChange={(e) =>
                    handleFilterChange(filter.key, e.target.value)
                  }
                >
                  {filter.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="filter-presets">
        <div className="preset-controls">
          <select>
            <option>My Presets</option>
            <option>Preset 1</option>
            <option>Preset 2</option>
          </select>
          <select>
            <option>Order by | Ticker</option>
            <option>Market Cap</option>
            <option>Price</option>
            <option>Change %</option>
          </select>
          <select>
            <option>Signal | None (all stocks)</option>
            <option>Strong Buy</option>
            <option>Buy</option>
            <option>Neutral</option>
            <option>Sell</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// Function to combine and process data from all files
const processCompanyData = () => {
  const mainData = completeTableData.map((company, index) => ({
    no: index + 1,
    ticker: company.Ticker || "N/A",
    company: company.Company,
    sector: company.Sector,
    industry: company.Industry,
    country: company.Country,
    marketCap: company["Market Cap"],
    pe: company["P/E"],
    price: company.Price,
    change: company["Change %"],
    volume: company.Volume,
    netLatest: company["Net Latest"],
    netPrev: company["Net Prev"],
    totalAssets: company["Total Assets"],
    source: "complete_table",
  }));

  // Extract additional financial data
  const data2Companies = data2.sheets.Лист1.rows;
  const financialDataMap = new Map();

  data2Companies.forEach((company) => {
    const key = company.Name;
    if (!financialDataMap.has(key)) {
      financialDataMap.set(key, {
        roe: company.ROE,
        der: company.DER,
        liq: company.LIQ,
        opm: company.OPM,
        roa: company.ROA,
        costOfDebt: company["Cost of debt"],
        debtBurden: company["Debt burden "],
        dar: company.DAR,
        int: company.INT,
        fata: company.FATA,
      });
    }
  });

  const data1Results = data1.sheets.Results?.rows || [];
  data1Results.forEach((company) => {
    const key = company.Name;
    if (!financialDataMap.has(key)) {
      financialDataMap.set(key, {
        roe: company.ROE,
        der: company.DER,
        liq: company.LIQ,
        opm: company.OPM,
        roa: company.ROA,
        costOfDebt: company["Cost of debt"],
        debtBurden: company["Debt burden "],
      });
    }
  });

  // Enhance main data with financial metrics
  const enhancedData = mainData.map((company) => {
    const financialData = financialDataMap.get(company.company) || {};
    return {
      ...company,
      ...financialData,
      // Calculate additional fields for filtering
      forwardPE: company.pe ? (company.pe * 0.9).toFixed(2) : "N/A", // Mock forward P/E
      peg:
        company.pe && financialData.roe
          ? (company.pe / financialData.roe).toFixed(2)
          : "N/A",
      institutionalOwnership: (Math.random() * 100).toFixed(1), // Mock data
      insiderOwnership: (Math.random() * 50).toFixed(1), // Mock data
      rsi: (Math.random() * 100).toFixed(1), // Mock RSI
      beta: (Math.random() * 3).toFixed(2), // Mock beta
    };
  });

  return enhancedData;
};

// Filter application logic
const applyFilters = (data, filters) => {
  return data.filter((company) => {
    return Object.keys(filters).every((filterKey) => {
      const filterValue = filters[filterKey];
      if (filterValue === "Any" || !filterValue) return true;

      const companyValue = company[filterKey];
      if (companyValue === "N/A" || companyValue === undefined) return false;

      // Implement filter logic based on filter type
      switch (filterKey) {
        case "marketCap":
          return applyMarketCapFilter(companyValue, filterValue);
        case "pe":
        case "forwardPE":
        case "priceToSales":
        case "priceToBook":
          return applyRangeFilter(parseFloat(companyValue), filterValue);
        case "epsGrowth":
        case "salesGrowth":
          return applyGrowthFilter(parseFloat(companyValue), filterValue);
        case "institutionalOwnership":
        case "insiderOwnership":
          return applyPercentageFilter(parseFloat(companyValue), filterValue);
        case "rsi":
          return applyRSIFilter(parseFloat(companyValue), filterValue);
        case "beta":
          return applyBetaFilter(parseFloat(companyValue), filterValue);
        case "sector":
        case "industry":
        case "country":
          return companyValue === filterValue;
        default:
          return true;
      }
    });
  });
};

// Helper filter functions
const applyMarketCapFilter = (marketCap, filter) => {
  const num = typeof marketCap === "number" ? marketCap : parseFloat(marketCap);
  if (isNaN(num)) return false;

  switch (filter) {
    case "Mega (>$200B)":
      return num > 200000000000;
    case "Large ($10B-$200B)":
      return num >= 10000000000 && num <= 200000000000;
    case "Mid ($2B-$10B)":
      return num >= 2000000000 && num < 10000000000;
    case "Small ($300M-$2B)":
      return num >= 300000000 && num < 2000000000;
    case "Micro ($50M-$300M)":
      return num >= 50000000 && num < 300000000;
    case "Nano (<$50M)":
      return num < 50000000;
    default:
      return true;
  }
};

const applyRangeFilter = (value, filter) => {
  if (isNaN(value)) return false;

  switch (filter) {
    case "Over 10":
      return value > 10;
    case "Under 10":
      return value < 10;
    case "Over 20":
      return value > 20;
    case "Under 20":
      return value < 20;
    case "Over 30":
      return value > 30;
    case "Under 30":
      return value < 30;
    case "Over 1":
      return value > 1;
    case "Under 1":
      return value < 1;
    case "Over 5":
      return value > 5;
    case "Under 5":
      return value < 5;
    default:
      return true;
  }
};

const applyGrowthFilter = (value, filter) => {
  if (isNaN(value)) return false;

  switch (filter) {
    case "Positive":
      return value > 0;
    case "Negative":
      return value < 0;
    case "Over 10%":
      return value > 10;
    case "Under 10%":
      return value < 10;
    default:
      return true;
  }
};

const applyPercentageFilter = (value, filter) => {
  if (isNaN(value)) return false;

  switch (filter) {
    case "Over 50%":
      return value > 50;
    case "Under 50%":
      return value < 50;
    case "Over 70%":
      return value > 70;
    case "Under 30%":
      return value < 30;
    case "Over 10%":
      return value > 10;
    case "Under 10%":
      return value < 10;
    case "Over 20%":
      return value > 20;
    case "Under 5%":
      return value < 5;
    default:
      return true;
  }
};

const applyRSIFilter = (value, filter) => {
  if (isNaN(value)) return false;

  switch (filter) {
    case "Overbought (>70)":
      return value > 70;
    case "Oversold (<30)":
      return value < 30;
    case "Neutral":
      return value >= 30 && value <= 70;
    default:
      return true;
  }
};

const applyBetaFilter = (value, filter) => {
  if (isNaN(value)) return false;

  switch (filter) {
    case "High (>1.5)":
      return value > 1.5;
    case "Low (<0.5)":
      return value < 0.5;
    case "Neutral":
      return value >= 0.5 && value <= 1.5;
    default:
      return true;
  }
};

// Formatting functions
const formatMarketCap = (value) => {
  if (value === "N/A" || value === null || value === undefined) return "N/A";
  const num = typeof value === "number" ? value : parseFloat(value);
  if (isNaN(num)) return "N/A";

  if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`;
  if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
};

const formatVolume = (value) => {
  if (value === "N/A" || value === null || value === undefined) return "N/A";
  const num = typeof value === "number" ? value : parseFloat(value);
  if (isNaN(num)) return "N/A";
  return num.toLocaleString();
};

const formatPrice = (value) => {
  if (value === "N/A" || value === null || value === undefined) return "N/A";
  const num = typeof value === "number" ? value : parseFloat(value);
  if (isNaN(num)) return "N/A";
  return `$${num.toFixed(2)}`;
};

function StockTable({ currentPage, onPageChange, filters }) {
  const [itemsPerPage] = useState(10);
  const [companyData, setCompanyData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(window.__findexSearchTerm || "");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    window.__findexSetSearchTerm = setSearchTerm;
    return () => {
      window.__findexSetSearchTerm = null;
    };
  }, []);

  useEffect(() => {
    if (window.__findexSetHeaderSearch) {
      window.__findexSetHeaderSearch(searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    const processedData = processCompanyData();
    setCompanyData(processedData);
  }, []);

  // Apply filters and search
  const filteredData = applyFilters(companyData, filters).filter((company) => {
    const matchesSearch =
      company.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.ticker?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue === undefined || bValue === undefined) return 0;
    if (aValue === "N/A") return 1;
    if (bValue === "N/A") return -1;

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalItems = sortedData.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const formatChange = (change) => {
    if (change === "N/A" || change === null || change === undefined)
      return "N/A";
    const num = typeof change === "number" ? change : parseFloat(change);
    if (isNaN(num)) return "N/A";
    const className = num >= 0 ? "positive" : "negative";
    const sign = num >= 0 ? "+" : "";
    return (
      <span className={className}>
        {sign}
        {num.toFixed(2)}%
      </span>
    );
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    onPageChange(1);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? " ↑" : " ↓";
    }
    return " ~";
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <div className="table-title">
          <span>#1 ({totalItems} Total)</span>
        </div>
        <div className="table-controls">
          <button className="save-portfolio">Save as portfolio</button>
          <button className="grade-peer">Grade peer</button>
          <div className="refresh">
            <span>Refresh: 3mn</span>
            <button>off</button>
          </div>
          <div className="pagination-info">
            <span>
              Page {currentPage} / {totalPages}
            </span>
          </div>
        </div>
      </div>

      <table className="stock-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("no")}>
              No.{getSortIndicator("no")}
            </th>
            <th onClick={() => handleSort("ticker")}>
              Ticker{getSortIndicator("ticker")}
            </th>
            <th onClick={() => handleSort("company")}>
              Company{getSortIndicator("company")}
            </th>
            <th onClick={() => handleSort("sector")}>
              Sector{getSortIndicator("sector")}
            </th>
            <th onClick={() => handleSort("industry")}>
              Industry{getSortIndicator("industry")}
            </th>
            <th onClick={() => handleSort("country")}>
              Country{getSortIndicator("country")}
            </th>
            <th onClick={() => handleSort("marketCap")}>
              Market Cap{getSortIndicator("marketCap")}
            </th>
            <th onClick={() => handleSort("pe")}>
              P/E{getSortIndicator("pe")}
            </th>
            <th onClick={() => handleSort("price")}>
              Price{getSortIndicator("price")}
            </th>
            <th onClick={() => handleSort("change")}>
              Change{getSortIndicator("change")}
            </th>
            <th onClick={() => handleSort("volume")}>
              Volume{getSortIndicator("volume")}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((company) => (
            <tr key={`${company.ticker}-${company.no}`}>
              <td>{company.no}</td>
              <td className="ticker">{company.ticker}</td>
              <td className="company">{company.company}</td>
              <td>{company.sector}</td>
              <td>{company.industry}</td>
              <td>{company.country}</td>
              <td>{formatMarketCap(company.marketCap)}</td>
              <td>{company.pe}</td>
              <td className="price">{formatPrice(company.price)}</td>
              <td>{formatChange(company.change)}</td>
              <td>{formatVolume(company.volume)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {currentItems.length === 0 && (
        <div className="no-data-message">
          No companies found matching your search criteria.
        </div>
      )}
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    if (totalPages <= 1) return null;
    const pages = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let startPage = Math.max(2, currentPage - 2);
      let endPage = Math.min(totalPages - 1, currentPage + 2);

      if (currentPage <= 4) endPage = 5;
      if (currentPage >= totalPages - 3) startPage = totalPages - 4;
      if (startPage > 2) pages.push("...");
      for (let i = startPage; i <= endPage; i++) pages.push(i);
      if (endPage < totalPages - 1) pages.push("...");
      if (totalPages > 1) pages.push(totalPages);
    }

    return pages.map((page, index) => {
      if (page === "...") return <span key={`ellipsis-${index}`}>...</span>;
      return (
        <button
          key={page}
          className={page === currentPage ? "active" : ""}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        {">"}
      </button>
      <button className="export-btn">Export</button>
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [companyData, setCompanyData] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const processedData = processCompanyData();
    setCompanyData(processedData);
    setCurrentPage(1);
  }, []);

  const handleFilterChange = (filterKey, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(companyData.length / 10);

  return (
    <main>
      <Header />
      <FilterTabs />
      <AdvancedFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        companyData={companyData}
      />
      <StockTable
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        filters={filters}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}

export default App;
