import React, { useState } from "react";

const DropdownSelector = ({
  options,
  setRequirepass,
  requirepass,
  food,
  setSelectedFood,
}) => {
  //   const [selectedValue, setSelectedValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [passwordPrompt, setPasswordPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [collectedValue, setCollectedValue] = useState("");
  //   const [placeHolder, setPlaceHolder] = useState("Search foods...");

  const handleSelectChange = (event) => {
    const selectedOption = options.find(
      (option) => option.value === event.target.value
    );
    const requiresPassword = selectedOption.requiresPassword;

    console.log("requiresPassword", requiresPassword);
    setRequirepass(requiresPassword);
    setSelectedFood(event.target.value);
    setShowDropdown(false);
    setSearchTerm(requiresPassword ? "" : event.target.value);
    // Check if the selected option requires a password
    if (selectedOption && selectedOption.requiresPassword) {
      setPasswordPrompt(true);
    } else {
      setCollectedValue(event.target.value);
    }
  };

  const handlePasswordInputChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordSubmit = () => {
    // Check if the password is correct for the selected option
    const selectedOption = options.find((option) => option.value === food);
    if (selectedOption && selectedOption.password === password) {
      setPasswordPrompt(false);
      setCollectedValue(food);
      setSearchTerm(food);
      setRequirepass(false);
      // setSearchTerm(food);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const handleSearchInputChange = (event) => {
    const input = event.target.value;
    setSelectedFood("");
    setSearchTerm(input);
    setFilteredOptions(
      input
        ? options.filter((option) =>
            option.label.toLowerCase().includes(input.toLowerCase())
          )
        : []
    );
    setShowDropdown(input !== ""); // Show dropdown when the user starts typing
    setPasswordPrompt(false); // Hide password prompt when the search changes
  };

  return (
    <div className="dropdown-main">
      <div className="dropdown-selector">
        <p>Select a Food Type:</p>
        <input
          className={`form__input `}
          style={{ width: "100%" }}
          type="text"
          value={searchTerm}
          onChange={handleSearchInputChange}
          placeholder={
            requirepass ? "Enter Pass To Continue" : "Search foods..."
          }
        />
        {showDropdown && (
          <div className="options-dropdown">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
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
      <div className="dropdown-selector">
        {passwordPrompt && (
          <div>
            <p>Enter password:</p>
            <input
              type="password"
              className={`form__input`}
              value={password}
              onChange={handlePasswordInputChange}
              placeholder="Password"
            />
            <button
              onClick={handlePasswordSubmit}
              className="button_food"
            >
              OK
            </button>
          </div>
        )}
        {collectedValue && (
          <p style={{ margin: "10px 50px 0 10px" }}>
            You Selected: {collectedValue}
          </p>
        )}
      </div>
    </div>
  );
};

export default DropdownSelector;
