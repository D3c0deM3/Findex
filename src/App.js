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
    window.__findexSetHeaderSearch = setHeaderSearch;
    return () => {
      window.__findexSetHeaderSearch = null;
    };
  }, []);

  useEffect(() => {
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

// Complete filter configuration with ALL filters from Finviz
const filterConfig = {
  Descriptive: [
    {
      key: "exchange",
      label: "Exchange",
      type: "select",
      options: ["Any", "NYSE", "NASDAQ", "AMEX", "TSX", "ETF"],
    },
    {
      key: "index",
      label: "Index",
      type: "select",
      options: ["Any", "S&P 500", "NASDAQ 100", "Dow Jones", "Russell 2000"],
    },
    { key: "sector", label: "Sector", type: "select", options: ["Any"] },
    { key: "industry", label: "Industry", type: "select", options: ["Any"] },
    { key: "country", label: "Country", type: "select", options: ["Any"] },
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
    {
      key: "optionShort",
      label: "Option/Short",
      type: "select",
      options: ["Any", "Optionable", "Shortable"],
    },
    {
      key: "earningsDate",
      label: "Earnings Date",
      type: "select",
      options: ["Any", "Today", "This Week", "Next Week", "This Month"],
    },
    {
      key: "ipoDate",
      label: "IPO Date",
      type: "select",
      options: ["Any", "This Year", "Last 5 Years", "Over 5 Years"],
    },
    {
      key: "sharesOutstanding",
      label: "Shares Outstanding",
      type: "range",
      options: ["Any", "Over 100M", "Under 100M"],
    },
    {
      key: "float",
      label: "Float",
      type: "range",
      options: ["Any", "High", "Low"],
    },
    {
      key: "price",
      label: "Price",
      type: "range",
      options: ["Any", "Over $10", "Under $10", "Over $50", "Under $50"],
    },
    {
      key: "targetPrice",
      label: "Target Price",
      type: "range",
      options: ["Any", "Above Current", "Below Current"],
    },
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
        "Positive",
        "Negative",
      ],
    },
    {
      key: "forwardPE",
      label: "Forward P/E",
      type: "range",
      options: [
        "Any",
        "Over 10",
        "Under 10",
        "Over 20",
        "Under 20",
        "Positive",
        "Negative",
      ],
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
      key: "dividendYield",
      label: "Dividend Yield",
      type: "range",
      options: ["Any", "Over 2%", "Under 2%", "Over 5%", "Under 5%"],
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
      key: "epsGrowthThisYear",
      label: "EPS Growth This Year",
      type: "range",
      options: [
        "Any",
        "Positive",
        "Negative",
        "Over 10%",
        "Under 10%",
        "Over 20%",
        "Under 20%",
      ],
    },
    {
      key: "epsGrowthNextYear",
      label: "EPS Growth Next Year",
      type: "range",
      options: ["Any", "Positive", "Negative", "Over 10%", "Under 10%"],
    },
    {
      key: "epsGrowthQtrOverQtr",
      label: "EPS Growth Qtr Over Qtr",
      type: "range",
      options: ["Any", "Positive", "Negative", "Improving", "Declining"],
    },
    {
      key: "epsGrowthTTM",
      label: "EPS Growth TTM",
      type: "range",
      options: ["Any", "Positive", "Negative"],
    },
    {
      key: "epsGrowthPast3Years",
      label: "EPS Growth Past 3 Years",
      type: "range",
      options: ["Any", "Positive", "Negative"],
    },
    {
      key: "epsGrowthPast5Years",
      label: "EPS Growth Past 5 Years",
      type: "range",
      options: ["Any", "Positive", "Negative"],
    },
    {
      key: "epsGrowthNext5Years",
      label: "EPS Growth Next 5 Years",
      type: "range",
      options: ["Any", "Positive", "Negative"],
    },
    {
      key: "salesGrowthQtrOverQtr",
      label: "Sales Growth Qtr Over Qtr",
      type: "range",
      options: ["Any", "Positive", "Negative", "Improving", "Declining"],
    },
    {
      key: "salesGrowthTTM",
      label: "Sales Growth TTM",
      type: "range",
      options: ["Any", "Positive", "Negative"],
    },
    {
      key: "salesGrowthPast3Years",
      label: "Sales Growth Past 3 Years",
      type: "range",
      options: ["Any", "Positive", "Negative"],
    },
    {
      key: "salesGrowthPast5Years",
      label: "Sales Growth Past 5 Years",
      type: "range",
      options: ["Any", "Positive", "Negative"],
    },
    {
      key: "earningsRevenueSurprise",
      label: "Earnings & Revenue Surprise",
      type: "select",
      options: ["Any", "Positive Surprise", "Negative Surprise"],
    },
  ],
  Financial: [
    {
      key: "returnOnAssets",
      label: "Return on Assets",
      type: "range",
      options: ["Any", "Positive", "Negative", "Over 5%", "Under 5%"],
    },
    {
      key: "returnOnEquity",
      label: "Return on Equity",
      type: "range",
      options: ["Any", "Positive", "Negative", "Over 10%", "Under 10%"],
    },
    {
      key: "returnOnInvestedCapital",
      label: "Return on Invested Capital",
      type: "range",
      options: ["Any", "Positive", "Negative"],
    },
    {
      key: "currentRatio",
      label: "Current Ratio",
      type: "range",
      options: ["Any", "Over 1", "Under 1", "Over 2", "Under 0.5"],
    },
    {
      key: "quickRatio",
      label: "Quick Ratio",
      type: "range",
      options: ["Any", "Over 1", "Under 1"],
    },
    {
      key: "ltDebtToEquity",
      label: "LT Debt/Equity",
      type: "range",
      options: ["Any", "High", "Low"],
    },
    {
      key: "debtToEquity",
      label: "Debt/Equity",
      type: "range",
      options: ["Any", "Over 1", "Under 1", "Over 2", "Under 0.5"],
    },
    {
      key: "grossMargin",
      label: "Gross Margin",
      type: "range",
      options: ["Any", "Positive", "Negative", "Over 20%", "Under 20%"],
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
    {
      key: "payoutRatio",
      label: "Payout Ratio",
      type: "range",
      options: ["Any", "Over 50%", "Under 50%", "Over 80%", "Under 20%"],
    },
  ],
  Ownership: [
    {
      key: "insiderOwnership",
      label: "Insider Ownership",
      type: "range",
      options: ["Any", "Over 10%", "Under 10%", "Over 20%", "Under 5%"],
    },
    {
      key: "insiderTransactions",
      label: "Insider Transactions",
      type: "select",
      options: ["Any", "Buying", "Selling"],
    },
    {
      key: "institutionalOwnership",
      label: "Institutional Ownership",
      type: "range",
      options: ["Any", "Over 50%", "Under 50%", "Over 70%", "Under 30%"],
    },
    {
      key: "institutionalTransactions",
      label: "Institutional Transactions",
      type: "select",
      options: ["Any", "Buying", "Selling"],
    },
    {
      key: "shortFloat",
      label: "Short Float",
      type: "range",
      options: ["Any", "High", "Low"],
    },
    {
      key: "analystRecommendation",
      label: "Analyst Recom.",
      type: "select",
      options: ["Any", "Strong Buy", "Buy", "Hold", "Sell", "Strong Sell"],
    },
  ],
  Performance: [
    {
      key: "performance",
      label: "Performance",
      type: "range",
      options: [
        "Any",
        "Up",
        "Down",
        "Over 5%",
        "Under -5%",
        "Over 10%",
        "Under -10%",
      ],
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
      options: ["Any", "Overbought (>70)", "Oversold (<30)", "Neutral (30-70)"],
    },
    { key: "gap", label: "Gap", type: "range", options: ["Any", "Up", "Down"] },
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
      key: "change",
      label: "Change",
      type: "range",
      options: ["Any", "Up", "Down"],
    },
    {
      key: "changeFromOpen",
      label: "Change from Open",
      type: "range",
      options: ["Any", "Up", "Down"],
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
      key: "allTimeHighLow",
      label: "All-Time High/Low",
      type: "range",
      options: ["Any", "Near High", "Near Low"],
    },
    {
      key: "averageVolume",
      label: "Average Volume",
      type: "range",
      options: ["Any", "High", "Low"],
    },
    {
      key: "relativeVolume",
      label: "Relative Volume",
      type: "range",
      options: ["Any", "High", "Low"],
    },
    {
      key: "currentVolume",
      label: "Current Volume",
      type: "range",
      options: ["Any", "High", "Low"],
    },
    {
      key: "trades",
      label: "Trades",
      type: "range",
      options: ["Any", "High", "Low"],
    },
    {
      key: "afterHoursClose",
      label: "After-Hours Close",
      type: "range",
      options: ["Any", "Up", "Down"],
    },
    {
      key: "afterHoursChange",
      label: "After-Hours Change",
      type: "range",
      options: ["Any", "Up", "Down"],
    },
  ],
  Technical: [
    {
      key: "pattern",
      label: "Pattern",
      type: "select",
      options: ["Any", "Bullish", "Bearish"],
    },
    {
      key: "candlestick",
      label: "Candlestick",
      type: "select",
      options: ["Any", "Bullish", "Bearish"],
    },
    {
      key: "beta",
      label: "Beta",
      type: "range",
      options: ["Any", "High (>1.5)", "Low (<0.5)", "Neutral (0.5-1.5)"],
    },
    {
      key: "averageTrueRange",
      label: "Average True Range",
      type: "range",
      options: ["Any", "High", "Low"],
    },
  ],
  News: [
    {
      key: "latestNews",
      label: "Latest News",
      type: "select",
      options: ["Any", "Today", "This Week", "This Month"],
    },
    {
      key: "newsKeywords",
      label: "News Keywords",
      type: "select",
      options: ["Any", "Earnings", "Dividend", "Merger"],
    },
  ],
  ETF: [
    {
      key: "singleCategory",
      label: "Single Category",
      type: "select",
      options: ["Any", "Stocks", "Bonds", "Commodities", "Sector"],
    },
    {
      key: "assetType",
      label: "Asset Type",
      type: "select",
      options: ["Any", "Equity", "Fixed Income", "Commodity", "Mixed"],
    },
    {
      key: "sponsor",
      label: "Sponsor",
      type: "select",
      options: ["Any", "BlackRock", "Vanguard", "State Street", "Invesco"],
    },
    {
      key: "netExpenseRatio",
      label: "Net Expense Ratio",
      type: "range",
      options: ["Any", "Low (<0.2%)", "High (>0.5%)"],
    },
    {
      key: "netFundFlows",
      label: "Net Fund Flows",
      type: "range",
      options: ["Any", "Inflow", "Outflow"],
    },
    {
      key: "annualizedReturn",
      label: "Annualized Return",
      type: "range",
      options: ["Any", "Positive", "Negative", "Over 5%", "Under 5%"],
    },
  ],
};

function AdvancedFilters({ filters, onFilterChange, companyData }) {
  const [activeFilterGroup, setActiveFilterGroup] = useState("Descriptive");

  // Extract unique values for dropdowns from actual data
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
    const clearedFilters = {};
    Object.keys(filters).forEach((key) => {
      clearedFilters[key] = "Any";
    });
    // Update all filters at once
    Object.keys(clearedFilters).forEach((key) => {
      onFilterChange(key, "Any");
    });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(
      (value) => value !== "Any" && value !== ""
    ).length;
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
              {group}{" "}
              {getActiveFiltersCount() > 0 && group === activeFilterGroup
                ? `(${getActiveFiltersCount()})`
                : ""}
            </button>
          ))}
          <span className="filter-spacer"></span>
          <button onClick={clearAllFilters} className="clear-all">
            Clear All Filters
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
          <select defaultValue="My Presets">
            <option>My Presets</option>
            <option>Growth Stocks</option>
            <option>Value Stocks</option>
            <option>Dividend Stocks</option>
            <option>Technical Breakouts</option>
          </select>
          <select defaultValue="Ticker">
            <option>Order by | Ticker</option>
            <option>Market Cap</option>
            <option>Price</option>
            <option>Change %</option>
            <option>P/E</option>
            <option>Volume</option>
            <option>RSI</option>
            <option>Beta</option>
          </select>
          <select defaultValue="None">
            <option>Signal | None (all stocks)</option>
            <option>Strong Buy</option>
            <option>Buy</option>
            <option>Neutral</option>
            <option>Sell</option>
            <option>Strong Sell</option>
          </select>
          <select defaultValue="Asc">
            <option>Asc</option>
            <option>Desc</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// Enhanced data processing function with all new fields
const processCompanyData = () => {
  const mainData = completeTableData.map((company, index) => {
    // Calculate additional metrics from available data
    const marketCap = company["Market Cap"];
    const price = company.Price;
    const pe = company["P/E"];
    const totalAssets = company["Total Assets"];
    const netLatest = company["Net Latest"];
    const volume = company.Volume;

    // Calculate derived metrics
    const priceToBook =
      totalAssets && marketCap ? (marketCap / totalAssets).toFixed(2) : "N/A";
    const priceToSales =
      pe && price ? (price / (price / Math.max(pe, 0.01))).toFixed(2) : "N/A";
    const returnOnEquity =
      netLatest && totalAssets
        ? ((netLatest / totalAssets) * 100).toFixed(2)
        : "N/A";
    const returnOnAssets =
      netLatest && totalAssets
        ? ((netLatest / totalAssets) * 100).toFixed(2)
        : "N/A";

    // Generate realistic mock data for all new fields
    const change = company["Change %"];
    const avgVolume = volume ? volume * (0.8 + Math.random() * 0.4) : "N/A"; // Average volume based on current volume

    return {
      no: index + 1,
      ticker: company.Ticker || "N/A",
      company: company.Company,
      sector: company.Sector,
      industry: company.Industry,
      country: company.Country,
      marketCap: marketCap,
      pe: pe,
      price: price,
      change: change,
      volume: volume,
      netLatest: netLatest,
      netPrev: company["Net Prev"],
      totalAssets: totalAssets,

      // Existing calculated fields
      priceToBook: priceToBook,
      priceToSales: priceToSales,
      returnOnEquity: returnOnEquity,
      returnOnAssets: returnOnAssets,

      // New fields for all filters
      // Fundamental/Valuation
      forwardPE: pe ? (pe * (0.8 + Math.random() * 0.4)).toFixed(2) : "N/A",
      peg:
        pe && returnOnEquity
          ? (pe / Math.max(returnOnEquity, 1)).toFixed(2)
          : "N/A",
      priceToCash: (Math.random() * 20).toFixed(2),
      priceToFreeCashFlow: (Math.random() * 25).toFixed(2),
      evToEbitda: (Math.random() * 15).toFixed(2),
      evToSales: (Math.random() * 10).toFixed(2),
      dividendYield: (Math.random() * 8).toFixed(2),

      // Growth metrics
      epsGrowthThisYear: (Math.random() * 100 - 30).toFixed(2),
      epsGrowthNextYear: (Math.random() * 80 - 20).toFixed(2),
      epsGrowthQtrOverQtr: (Math.random() * 50 - 15).toFixed(2),
      epsGrowthTTM: (Math.random() * 60 - 20).toFixed(2),
      epsGrowthPast3Years: (Math.random() * 120 - 30).toFixed(2),
      epsGrowthPast5Years: (Math.random() * 150 - 40).toFixed(2),
      epsGrowthNext5Years: (Math.random() * 100 - 20).toFixed(2),
      salesGrowthQtrOverQtr: (Math.random() * 40 - 10).toFixed(2),
      salesGrowthTTM: (Math.random() * 50 - 15).toFixed(2),
      salesGrowthPast3Years: (Math.random() * 100 - 25).toFixed(2),
      salesGrowthPast5Years: (Math.random() * 120 - 30).toFixed(2),

      // Financial ratios
      returnOnInvestedCapital: (Math.random() * 25 - 5).toFixed(2),
      currentRatio: (Math.random() * 3 + 0.5).toFixed(2),
      quickRatio: (Math.random() * 2.5 + 0.3).toFixed(2),
      ltDebtToEquity: (Math.random() * 2).toFixed(2),
      debtToEquity: (Math.random() * 2.5).toFixed(2),
      grossMargin: (Math.random() * 60 + 10).toFixed(2),
      operatingMargin: (Math.random() * 40 - 5).toFixed(2),
      netProfitMargin: (Math.random() * 35 - 5).toFixed(2),
      payoutRatio: (Math.random() * 100).toFixed(2),

      // Ownership
      insiderOwnership: (Math.random() * 50).toFixed(1),
      institutionalOwnership: (Math.random() * 100).toFixed(1),
      shortFloat: (Math.random() * 30).toFixed(1),

      // Technical indicators
      rsi: (Math.random() * 100).toFixed(1),
      beta: (Math.random() * 3).toFixed(2),
      volatility: (Math.random() * 80 + 10).toFixed(1),
      averageTrueRange: (Math.random() * 5).toFixed(2),
      averageVolume: avgVolume,
      relativeVolume: (Math.random() * 3 + 0.5).toFixed(2),

      // Performance metrics
      performance: change,
      performance2: (Math.random() * 40 - 20).toFixed(2),
      gap: (Math.random() * 10 - 5).toFixed(2),
      changeFromOpen: (Math.random() * 8 - 4).toFixed(2),

      // Moving averages
      sma20: price ? (price * (0.95 + Math.random() * 0.1)).toFixed(2) : "N/A",
      sma50: price ? (price * (0.9 + Math.random() * 0.2)).toFixed(2) : "N/A",
      sma200: price ? (price * (0.85 + Math.random() * 0.3)).toFixed(2) : "N/A",

      // High/Low levels
      highLow20: (Math.random() * 100).toFixed(1),
      highLow50: (Math.random() * 100).toFixed(1),
      highLow52Week: (Math.random() * 100).toFixed(1),
      allTimeHighLow: (Math.random() * 100).toFixed(1),

      // Volume metrics
      currentVolume: volume,
      trades: Math.floor(volume / 1000) * (0.5 + Math.random()),

      // After-hours
      afterHoursClose: price
        ? (price * (0.99 + Math.random() * 0.02)).toFixed(2)
        : "N/A",
      afterHoursChange: (Math.random() * 4 - 2).toFixed(2),

      // Analyst and news
      analystRecommendation: [
        "Strong Buy",
        "Buy",
        "Hold",
        "Sell",
        "Strong Sell",
      ][Math.floor(Math.random() * 5)],
      earningsRevenueSurprise: [
        "Positive Surprise",
        "Negative Surprise",
        "In Line",
      ][Math.floor(Math.random() * 3)],

      source: "complete_table",
    };
  });

  // Enhance with financial data from data_2
  const data2Companies = data2.sheets.Лист1.rows;
  const financialDataMap = new Map();

  data2Companies.forEach((company) => {
    const key = company.Name?.replace(/"/g, "")?.trim();
    if (key && !financialDataMap.has(key)) {
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

  // Enhance with data from data_1
  const data1Results = data1.sheets.Results?.rows || [];
  data1Results.forEach((company) => {
    const key = company.Name?.replace(/"/g, "")?.trim();
    if (key && !financialDataMap.has(key)) {
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

  // Merge financial data
  const enhancedData = mainData.map((company) => {
    const companyName = company.company?.replace(/"/g, "")?.trim();
    const financialData = financialDataMap.get(companyName) || {};

    return {
      ...company,
      ...financialData,
      // Ensure numeric values
      roe:
        typeof financialData.roe === "number"
          ? financialData.roe
          : parseFloat(financialData.roe) || 0,
      roa:
        typeof financialData.roa === "number"
          ? financialData.roa
          : parseFloat(financialData.roa) || 0,
      opm:
        typeof financialData.opm === "number"
          ? financialData.opm
          : parseFloat(financialData.opm) || 0,
    };
  });

  return enhancedData;
};

// Enhanced filter application logic for all new filters
const applyFilters = (data, filters) => {
  return data.filter((company) => {
    return Object.keys(filters).every((filterKey) => {
      const filterValue = filters[filterKey];
      if (filterValue === "Any" || !filterValue || filterValue === "")
        return true;

      const companyValue = company[filterKey];
      if (
        companyValue === "N/A" ||
        companyValue === undefined ||
        companyValue === null
      ) {
        return false;
      }

      // Convert to number for numeric comparisons
      const numValue =
        typeof companyValue === "number"
          ? companyValue
          : parseFloat(companyValue);

      switch (filterKey) {
        // Market Cap filters
        case "marketCap":
          if (isNaN(numValue)) return false;
          switch (filterValue) {
            case "Mega (>$200B)":
              return numValue > 200000000000;
            case "Large ($10B-$200B)":
              return numValue >= 10000000000 && numValue <= 200000000000;
            case "Mid ($2B-$10B)":
              return numValue >= 2000000000 && numValue < 10000000000;
            case "Small ($300M-$2B)":
              return numValue >= 300000000 && numValue < 2000000000;
            case "Micro ($50M-$300M)":
              return numValue >= 50000000 && numValue < 300000000;
            case "Nano (<$50M)":
              return numValue < 50000000;
            default:
              return true;
          }

        // P/E ratio filters
        case "pe":
        case "forwardPE":
          if (isNaN(numValue)) return false;
          switch (filterValue) {
            case "Over 10":
              return numValue > 10;
            case "Under 10":
              return numValue < 10;
            case "Over 20":
              return numValue > 20;
            case "Under 20":
              return numValue < 20;
            case "Over 30":
              return numValue > 30;
            case "Under 30":
              return numValue < 30;
            case "Positive":
              return numValue > 0;
            case "Negative":
              return numValue < 0;
            default:
              return true;
          }

        // Price filters
        case "price":
          if (isNaN(numValue)) return false;
          switch (filterValue) {
            case "Over $10":
              return numValue > 10;
            case "Under $10":
              return numValue < 10;
            case "Over $50":
              return numValue > 50;
            case "Under $50":
              return numValue < 50;
            default:
              return true;
          }

        // Ratio filters (P/B, P/S, etc.)
        case "priceToBook":
        case "priceToSales":
        case "evToEbitda":
        case "evToSales":
          if (isNaN(numValue)) return false;
          switch (filterValue) {
            case "Over 1":
              return numValue > 1;
            case "Under 1":
              return numValue < 1;
            case "Over 3":
              return numValue > 3;
            case "Under 3":
              return numValue < 3;
            case "Over 5":
              return numValue > 5;
            case "Under 5":
              return numValue < 5;
            case "Over 10":
              return numValue > 10;
            case "Under 10":
              return numValue < 10;
            default:
              return true;
          }

        // Growth filters
        case "epsGrowthThisYear":
        case "epsGrowthNextYear":
        case "epsGrowthQtrOverQtr":
        case "epsGrowthTTM":
        case "epsGrowthPast3Years":
        case "epsGrowthPast5Years":
        case "epsGrowthNext5Years":
        case "salesGrowthQtrOverQtr":
        case "salesGrowthTTM":
        case "salesGrowthPast3Years":
        case "salesGrowthPast5Years":
        case "dividendYield":
          if (isNaN(numValue)) return false;
          switch (filterValue) {
            case "Positive":
              return numValue > 0;
            case "Negative":
              return numValue < 0;
            case "Over 5%":
              return numValue > 5;
            case "Under 5%":
              return numValue < 5;
            case "Over 10%":
              return numValue > 10;
            case "Under 10%":
              return numValue < 10;
            case "Over 20%":
              return numValue > 20;
            case "Under 20%":
              return numValue < 20;
            case "Over 2%":
              return numValue > 2;
            case "Under 2%":
              return numValue < 2;
            case "Improving":
              return numValue > 0;
            case "Declining":
              return numValue < 0;
            default:
              return true;
          }

        // Margin and return filters
        case "operatingMargin":
        case "netProfitMargin":
        case "grossMargin":
        case "returnOnAssets":
        case "returnOnEquity":
        case "returnOnInvestedCapital":
        case "annualizedReturn":
          if (isNaN(numValue)) return false;
          switch (filterValue) {
            case "Positive":
              return numValue > 0;
            case "Negative":
              return numValue < 0;
            case "Over 5%":
              return numValue > 5;
            case "Under 5%":
              return numValue < 5;
            case "Over 10%":
              return numValue > 10;
            case "Under 10%":
              return numValue < 10;
            case "Over 20%":
              return numValue > 20;
            case "Under 20%":
              return numValue < 20;
            default:
              return true;
          }

        // Ownership percentage filters
        case "insiderOwnership":
        case "institutionalOwnership":
        case "shortFloat":
        case "payoutRatio":
          if (isNaN(numValue)) return false;
          switch (filterValue) {
            case "Over 10%":
              return numValue > 10;
            case "Under 10%":
              return numValue < 10;
            case "Over 20%":
              return numValue > 20;
            case "Under 5%":
              return numValue < 5;
            case "Over 50%":
              return numValue > 50;
            case "Under 50%":
              return numValue < 50;
            case "Over 70%":
              return numValue > 70;
            case "Under 30%":
              return numValue < 30;
            case "Over 80%":
              return numValue > 80;
            case "Under 20%":
              return numValue < 20;
            case "High":
              return numValue > 15;
            case "Low":
              return numValue < 5;
            default:
              return true;
          }

        // Technical indicators
        case "rsi":
          if (isNaN(numValue)) return false;
          switch (filterValue) {
            case "Overbought (>70)":
              return numValue > 70;
            case "Oversold (<30)":
              return numValue < 30;
            case "Neutral (30-70)":
              return numValue >= 30 && numValue <= 70;
            default:
              return true;
          }

        case "beta":
          if (isNaN(numValue)) return false;
          switch (filterValue) {
            case "High (>1.5)":
              return numValue > 1.5;
            case "Low (<0.5)":
              return numValue < 0.5;
            case "Neutral (0.5-1.5)":
              return numValue >= 0.5 && numValue <= 1.5;
            default:
              return true;
          }

        // Performance filters
        case "performance":
        case "performance2":
        case "change":
        case "changeFromOpen":
        case "gap":
        case "afterHoursChange":
          if (isNaN(numValue)) return false;
          switch (filterValue) {
            case "Up":
              return numValue > 0;
            case "Down":
              return numValue < 0;
            case "Over 5%":
              return numValue > 5;
            case "Under -5%":
              return numValue < -5;
            case "Over 10%":
              return numValue > 10;
            case "Under -10%":
              return numValue < -10;
            default:
              return true;
          }

        // Volume filters
        case "averageVolume":
        case "currentVolume":
        case "relativeVolume":
        case "volatility":
        case "averageTrueRange":
          if (isNaN(numValue)) return false;
          switch (filterValue) {
            case "High":
              return (
                numValue > (filterKey === "relativeVolume" ? 1.5 : 1000000)
              );
            case "Low":
              return numValue < (filterKey === "relativeVolume" ? 0.5 : 100000);
            default:
              return true;
          }

        // High/Low percentage filters
        case "highLow20":
        case "highLow50":
        case "highLow52Week":
        case "allTimeHighLow":
          if (isNaN(numValue)) return false;
          switch (filterValue) {
            case "Near High":
              return numValue > 80;
            case "Near Low":
              return numValue < 20;
            default:
              return true;
          }

        // Moving average position filters
        case "sma20":
        case "sma50":
        case "sma200":
          if (isNaN(numValue) || isNaN(company.price)) return false;
          switch (filterValue) {
            case "Above Price":
              return numValue > company.price;
            case "Below Price":
              return numValue < company.price;
            default:
              return true;
          }

        // Exact match filters
        case "sector":
        case "industry":
        case "country":
        case "exchange":
        case "index":
        case "analystRecommendation":
        case "earningsRevenueSurprise":
          return companyValue === filterValue;

        // Boolean/selection filters
        case "dividendGrowth":
        case "insiderTransactions":
        case "institutionalTransactions":
        case "pattern":
        case "candlestick":
          if (filterValue === "Yes") return companyValue > 0;
          if (filterValue === "No") return companyValue <= 0;
          if (filterValue === "Buying") return Math.random() > 0.5; // Mock logic
          if (filterValue === "Selling") return Math.random() <= 0.5; // Mock logic
          if (filterValue === "Bullish") return Math.random() > 0.5;
          if (filterValue === "Bearish") return Math.random() <= 0.5;
          return true;

        // ETF filters
        case "singleCategory":
        case "assetType":
        case "sponsor":
        case "netFundFlows":
          // Basic ETF filter logic
          return true;

        default:
          return true;
      }
    });
  });
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

  if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
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
    return "";
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

  const filteredData = applyFilters(companyData, filters);
  const totalPages = Math.ceil(filteredData.length / 10);

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
