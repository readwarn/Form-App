import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  const err =
    typeof error === "string"
      ? error
      : error?.message || error?.data || JSON.stringify(error);
  return (
    <div className="grid gap-y-4 px-4 py-10">
      <h3 className="text-xl font-semibold text-center">
        Ooops, an error occured!!!
      </h3>

      <p className="text-md text-gray-600 text-center">{err}</p>
    </div>
  );
};

export default Error;
