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
    "Variables",
    "Financial",
    "Ownership",
    "Performance",
    "Technical",
    "ETF",
    "ETF Part",
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

  return (
    <div className="filter-tabs">
      {tabs.map((tab) => (
        <button key={tab} className={tab === "Overview" ? "active" : ""}>
          {tab}
        </button>
      ))}
    </div>
  );
}

function AdvancedFilters() {
  const filterGroups = [
    {
      title: "Description",
      filters: [
        { label: "P/E", options: ["Any", "Over 10", "Under 10"] },
        { label: "Forward P/E", options: ["Any", "Over 10", "Under 10"] },
        { label: "PEG", options: ["Any", "Over 1", "Under 1"] },
        { label: "P/S", options: ["Any", "Over 1", "Under 1"] },
        { label: "P/B", options: ["Any", "Over 1", "Under 1"] },
      ],
    },
    {
      title: "Fundamental",
      filters: [
        { label: "Price/Gain", options: ["Any", "Positive", "Negative"] },
        {
          label: "Price/Free Cash Flow",
          options: ["Any", "Positive", "Negative"],
        },
        { label: "EV/EBITDA", options: ["Any", "Over 5", "Under 5"] },
        { label: "EV/Sales", options: ["Any", "Over 1", "Under 1"] },
        { label: "Dividend Growth", options: ["Any", "Yes", "No"] },
      ],
    },
    {
      title: "Technical",
      filters: [
        { label: "EPS Growth", options: ["Any", "Positive", "Negative"] },
        {
          label: "EPS Growth Next Year",
          options: ["Any", "Positive", "Negative"],
        },
        { label: "Sales Growth", options: ["Any", "Positive", "Negative"] },
        {
          label: "Sales Growth Next Year",
          options: ["Any", "Positive", "Negative"],
        },
      ],
    },
    {
      title: "News",
      filters: [
        { label: "P/B Year", options: ["Any", "Over 1", "Under 1"] },
        { label: "Net Year", options: ["Any", "Positive", "Negative"] },
        { label: "QR Over QR", options: ["Any", "Improving", "Declining"] },
      ],
    },
  ];

  return (
    <div className="advanced-filters">
      <div className="filters-header">
        <span>Description</span>
        <span>Fundamental</span>
        <span>Technical</span>
        <span>News</span>
        <span>ETF</span>
        <span>All</span>
        <span>~</span>
        <span>~</span>
        <span>~</span>
        <span>~</span>
        <span>~</span>
        <span>~</span>
        <span>~</span>
        <span>~</span>
      </div>

      <div className="filters-grid">
        {filterGroups.map((group, index) => (
          <div key={index} className="filter-group">
            {group.filters.map((filter, idx) => (
              <div key={idx} className="filter-item">
                <label>{filter.label}</label>
                <select>
                  {filter.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <span>~</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="additional-filters">
        <div className="filter-item">
          <label>Operating Margin</label>
          <select>
            <option>Any</option>
            <option>Positive</option>
            <option>Negative</option>
          </select>
        </div>
        <div className="filter-item">
          <label>Net Profit Margin</label>
          <select>
            <option>Any</option>
            <option>Positive</option>
            <option>Negative</option>
          </select>
        </div>
        <div className="filter-item">
          <label>Institutional Ownership</label>
          <select>
            <option>Any</option>
            <option>High</option>
            <option>Low</option>
          </select>
        </div>
        <div className="filter-item">
          <label>Institutional Transactions</label>
          <select>
            <option>Any</option>
            <option>Buying</option>
            <option>Selling</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// Function to combine and process data from all files
const processCompanyData = () => {
  // Use the complete table data as primary source
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
    // Additional financial data for filtering
    netLatest: company["Net Latest"],
    netPrev: company["Net Prev"],
    totalAssets: company["Total Assets"],
    source: "complete_table",
  }));

  // Extract additional financial data from data_2.json for enhanced filtering
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

  // Extract additional data from data_1.json for filtering
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

  // Enhance main data with financial metrics for filtering
  const enhancedData = mainData.map((company) => {
    const financialData = financialDataMap.get(company.company) || {};
    return {
      ...company,
      ...financialData,
    };
  });

  return enhancedData;
};

// Format market cap with B/M/K suffixes
const formatMarketCap = (value) => {
  if (value === "N/A" || value === null || value === undefined) return "N/A";

  const num = typeof value === "number" ? value : parseFloat(value);
  if (isNaN(num)) return "N/A";

  if (num >= 1000000000) {
    return `$${(num / 1000000000).toFixed(2)}B`;
  } else if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(2)}M`;
  } else if (num >= 1000) {
    return `$${(num / 1000).toFixed(2)}K`;
  } else {
    return `$${num.toFixed(2)}`;
  }
};

// Format volume with commas
const formatVolume = (value) => {
  if (value === "N/A" || value === null || value === undefined) return "N/A";

  const num = typeof value === "number" ? value : parseFloat(value);
  if (isNaN(num)) return "N/A";

  return num.toLocaleString();
};

// Format price
const formatPrice = (value) => {
  if (value === "N/A" || value === null || value === undefined) return "N/A";

  const num = typeof value === "number" ? value : parseFloat(value);
  if (isNaN(num)) return "N/A";

  return `$${num.toFixed(2)}`;
};

function StockTable({ currentPage, onPageChange }) {
  const [itemsPerPage] = useState(10); // Show 10 companies per page
  const [companyData, setCompanyData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(window.__findexSearchTerm || "");

  useEffect(() => {
    // Sync StockTable searchTerm with header search bar
    window.__findexSetSearchTerm = setSearchTerm;
    return () => {
      window.__findexSetSearchTerm = null;
    };
  }, []);

  useEffect(() => {
    // If header search bar changes, update StockTable searchTerm
    if (window.__findexSetHeaderSearch) {
      window.__findexSetHeaderSearch(searchTerm);
    }
  }, [searchTerm]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [sectorFilter] = useState("All");
  const [industryFilter] = useState("All");
  const [countryFilter] = useState("All");

  useEffect(() => {
    // Process data when component mounts
    const processedData = processCompanyData();
    setCompanyData(processedData);
    window.__findexSetSearchTerm = setSearchTerm;
    return () => {
      window.__findexSetSearchTerm = null;
    };
  }, []);

  // // Get unique values for filters
  // const sectors = [
  //   ...new Set(companyData.map((company) => company.sector)),
  // ].filter(Boolean);
  // const industries = [
  //   ...new Set(companyData.map((company) => company.industry)),
  // ].filter(Boolean);
  // const countries = [
  //   ...new Set(companyData.map((company) => company.country)),
  // ].filter(Boolean);

  // Filter data based on search term and filters
  const filteredData = companyData.filter((company) => {
    const matchesSearch =
      company.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.ticker?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSector =
      sectorFilter === "All" || company.sector === sectorFilter;
    const matchesIndustry =
      industryFilter === "All" || company.industry === industryFilter;
    const matchesCountry =
      countryFilter === "All" || company.country === countryFilter;

    return matchesSearch && matchesSector && matchesIndustry && matchesCountry;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue === undefined || bValue === undefined) return 0;

    // Handle numeric values vs string "N/A"
    if (aValue === "N/A") return 1;
    if (bValue === "N/A") return -1;

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const totalItems = sortedData.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Format change percentage with color coding
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

  // Handle sort
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    onPageChange(1);
  };

  // Get sort indicator
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
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, currentPage - 2);
      let endPage = Math.min(totalPages - 1, currentPage + 2);

      if (currentPage <= 4) {
        endPage = 5;
      }

      if (currentPage >= totalPages - 3) {
        startPage = totalPages - 4;
      }

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return <span key={`ellipsis-${index}`}>...</span>;
      }

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

  useEffect(() => {
    const processedData = processCompanyData();
    setCompanyData(processedData);
    setCurrentPage(1);
  }, []);

  const totalPages = Math.ceil(companyData.length / 10);

  return (
    <main>
      <Header />
      <FilterTabs />
      <AdvancedFilters />
      <StockTable currentPage={currentPage} onPageChange={setCurrentPage} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}

export default App;
