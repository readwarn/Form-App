const OptionItem = ({
  option,
  selected,
  padding,
  hasCategories,
  updateOptions,
}) => {
  return (
    <label htmlFor={option._id}>
      <div
        className={`flex gap-x-2 items-center w-full relative cursor-pointer select-none py-2 pr-9 hover:bg-indigo-500 transition-colors text-black hover:text-white`}
        style={{ paddingLeft: `${padding}px` }}
      >
        <input
          type="checkbox"
          id={option._id}
          checked={selected}
          onChange={(e) => updateOptions(option, e.target.checked)}
        />

        <div>
          <span
            className={`block truncate ${selected && "font-semibold"} ${
              hasCategories ? "italic opacity-75" : "font-normal"
            }`}
          >
            {option.name}
          </span>

          {selected ? (
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

export default OptionItem;
