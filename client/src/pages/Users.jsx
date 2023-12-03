import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserTable } from "../components";
import { useMemo } from "react";

const Users = () => {
  const users = useLoaderData();

  const usersData = useMemo(() => {
    return users?.length
      ? [...users].map((user) => {
          const sectors = user.sectors.map((sector) => sector.name)?.join(", ");
          return {
            ...user,
            sectors,
          };
        })
      : [];
  }, [users]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Users
          </h1>
          <p className="mt-2 text-md text-gray-700">
            A list of all user's name and sectors
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            to="/"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </Link>
        </div>
      </div>

      <UserTable users={usersData} />
    </div>
  );
};

export default Users;
