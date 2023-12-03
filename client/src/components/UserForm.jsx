import { useMemo, useState } from "react";
import { CustomSelect } from "../components";
import { Form, useNavigation } from "react-router-dom";

const UserForm = ({ detail, sectors }) => {
  const [options, setOptions] = useState(detail?.sectors || []);
  const [showSectorsError, setShowSectorsError] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const selectedSectors = useMemo(() => {
    const sectors = options.map((option) => option._id);
    return sectors.length ? JSON.stringify(sectors) : "";
  }, [options]);

  const updateOptions = (option, state) => {
    setShowSectorsError(false);
    switch (state) {
      case true:
        setOptions((options) => [...options, option]);
        break;
      case false:
        setOptions((options) =>
          options.filter((item) => item.id !== option.id)
        );
        break;
    }
  };

  return (
    <Form
      action={`/?id=${detail?._id || ""}`}
      method="POST"
      onSubmit={(e) => {
        if (!selectedSectors?.length) {
          setShowSectorsError(true);
          e.preventDefault();
        }
      }}
    >
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900 mb-2"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="name"
          className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Rilwan"
          required
          defaultValue={detail?.name || ""}
        />
      </div>

      <div className="relative">
        <CustomSelect
          placeholder="Select your sectors"
          label={"Sectors"}
          selectOption={updateOptions}
          defaultOptions={options}
          options={sectors}
        />

        <p
          className={`${
            showSectorsError ? "opacity-100 -bottom-5" : "opacity-0 bottom-0"
          } text-sm text-red-500 absolute transition-all`}
        >
          Select at least one sector
        </p>
      </div>

      <input type="hidden" name="sectors" value={selectedSectors} required />

      <div className="relative flex gap-x-3 cursor-pointer mt-10">
        <div className="flex h-6 items-center">
          <input
            id="agreed"
            name="agreed"
            type="checkbox"
            required
            defaultChecked={detail?.agreed || false}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
          />
        </div>
        <label
          htmlFor="agreed"
          className=" text-gray-900 text-sm leading-6 cursor-pointer"
        >
          Agree to terms
        </label>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          disabled={isSubmitting}
          type="submit"
          className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-60"
        >
          {detail?._id
            ? isSubmitting
              ? "Updating"
              : "Update"
            : isSubmitting
            ? "Saving"
            : "Save"}
        </button>
      </div>
    </Form>
  );
};

export default UserForm;
