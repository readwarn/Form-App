import { useState, useRef } from "react";
import { useClickOutside } from "../hooks";
import { optionHasCategories, optionPadding } from "../helpers";

const CustomSelect = ({
  selectOption,
  placeholder,
  label,
  defaultOptions,
  options,
}) => {
  const optionsContainerRef = useRef(null);

  const [showOptions, setShowOptions] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState([...defaultOptions]);

  const [search, setSearch] = useState("");

  const updateOptions = (option, state) => {
    switch (state) {
      case true:
        setSelectedOptions((options) => [...options, option]);
        break;
      case false:
        setSelectedOptions((options) =>
          options.filter((item) => item._id !== option._id)
        );
        break;
    }
    selectOption(option, state);
    // setShowOptions(false);
  };

  const closeOptions = (option) => {
    switch (option) {
      case "close":
        setShowOptions(false);
        break;
      case "toggle":
        setShowOptions((show) => !show);
        break;
      default:
        setShowOptions(false);
        break;
    }
  };

  useClickOutside(optionsContainerRef, () => closeOptions("close"));

  const isSelected = (option) =>
    !!selectedOptions.find((item) => item._id === option._id);

  const OptionItem = ({ option }) => {
    const padding = optionPadding(options, option);

    return (
      <label htmlFor={option._id}>
        <div
          className={`flex gap-x-2 items-center w-full relative cursor-pointer select-none py-2 pr-9 hover:bg-indigo-500 transition-colors text-black hover:text-white`}
          style={{ paddingLeft: `${padding}px` }}
        >
          <input
            type="checkbox"
            id={option._id}
            checked={isSelected(option)}
            onChange={(e) => updateOptions(option, e.target.checked)}
          />

          <div>
            <span
              className={`block truncate ${isSelected(option) && "font-bold"} ${
                optionHasCategories(option)
                  ? "italic font-semibold"
                  : "font-normal"
              }`}
            >
              {option.name}
            </span>

            {isSelected(option) ? (
              <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                *
              </span>
            ) : null}
          </div>
        </div>

        {option?.categories?.length
          ? option.categories.map((_option) => (
              <OptionItem key={_option._id} option={_option} />
            ))
          : null}
      </label>
    );
  };

  return (
    <div>
      <div className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </div>

      <div className="relative mt-2" ref={optionsContainerRef}>
        <div
          onClick={() => closeOptions("toggle")}
          className="relative w-full flex gap-3 flex-wrap rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-pointer"
        >
          {selectedOptions.length ? (
            selectedOptions.map((option) => (
              <div
                className="inline-flex items-center gap-x-4 truncate px-3 py-2 bg-indigo-500 rounded-lg"
                key={option._id}
              >
                <span className="text-sm text-white">{option.name}</span>
                <span
                  className="text-white hover:text-red-400 cursor-pointer text-xs font-bold"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateOptions(option, false);
                  }}
                >
                  X
                </span>
              </div>
            ))
          ) : (
            <span>{placeholder}</span>
          )}
        </div>

        {showOptions && (
          <div
            className={`absolute mt-1 max-h-60 w-full overflow-auto z-10 rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm transition-all`}
          >
            {options.map((option) => (
              <OptionItem key={option._id} option={option} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
