import { Outlet, useNavigation, NavLink } from "react-router-dom";

const PageLayout = () => {
  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  return (
    <section>
      <header className="sticky inset-x-0 top-0 z-50">
        <nav className="flex justify-between px-4 mobile:px-10 py-4 bg-indigo-500 text-white text-md">
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? "font-bold" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to={"/users"}
            className={({ isActive }) => (isActive ? "font-bold" : "")}
          >
            Users
          </NavLink>
        </nav>
      </header>
      <section className="px-4 mobile:px-10 pt-5 pb-20 min-h-screen">
        <Outlet />
        <div
          className={`${
            loading ? "z-10 bg-[rgba(0,0,0,0.3)]" : " -z-10 bg-transparent"
          } fixed inset-0 transition-colors`}
        ></div>
      </section>
    </section>
  );
};

export default PageLayout;
