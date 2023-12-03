import { Home, Users } from "./pages";
import { detailLoader, saveOrEditUserDeatail, usersLoader } from "./actions";
import { Error, PageLayout } from "./components";

export default [
  {
    path: "",
    element: <PageLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: detailLoader,
        action: saveOrEditUserDeatail,
      },
      {
        path: "users",
        element: <Users />,
        loader: usersLoader,
      },
    ],
  },
];
