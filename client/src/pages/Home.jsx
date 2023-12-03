import { UserForm } from "../components";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const [sectorCategory, detail] = useLoaderData();
  const sectors = sectorCategory?.categories || [];

  return (
    <div className="max-w-2xl mx-auto mt-6 px-2 lg:px-4">
      <p className="mt-1 text-md leading-6 text-gray-900 mb-6">
        Please enter your <b>name</b> and pick the <b>sectors</b> you are
        currently involved in.
      </p>

      <UserForm detail={detail} sectors={sectors} />
    </div>
  );
};

export default Home;
