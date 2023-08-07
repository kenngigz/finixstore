import React, { useState } from "react";

const DropdownSelector = ({
  options,
  requirepass,
  setSelectedCustomer,
  customer,
}) => {
  // const [selectedValue, setSelectedValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleSelectChange = (event) => {
    setSelectedCustomer(event.target.value);
    setShowDropdown(false); // Hide dropdown after selection
    setSearchTerm(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    const input = event.target.value;
    setSearchTerm(input);
    setFilteredOptions(
      input
        ? options.filter((option) =>
            option.label.toLowerCase().includes(input.toLowerCase())
          )
        : []
    );
    setShowDropdown(input !== ""); // Show dropdown when the user starts typing
    // setSearchTerm("");
  };
  return (
    <div className="dropdown-main">
      <div className="dropdown-selector">
        <p>Select a Customer:</p>
        <input
          className={`form__input  ${
            requirepass === true ? `inputStatus` : ""
          }`}
          type="text"
          value={searchTerm}
          onChange={handleSearchInputChange}
          placeholder="Search customer..."
        />
        {showDropdown && (
          <div className="options-dropdown">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="dropdown-option"
                  onClick={() =>
                    handleSelectChange({ target: { value: option.value } })
                  }
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="dropdown-option no-matches">
                No matching options
              </div>
            )}
          </div>
        )}
      </div>
      {customer && <p>You selected: {customer}</p>}
    </div>
  );
};

export default DropdownSelector;
