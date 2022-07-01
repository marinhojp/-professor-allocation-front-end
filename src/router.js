import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./components/Layout/";
import Courses from "./pages/Courses";
import Allocation from "./pages/Allocation";
import Professor from "./pages/Professor";
import Department from "./pages/Department";

const routes = [
  {
    path: "/",
    name: "Home",
    visible: false,
    component: Home,
  },
  {
    path: "/courses",
    name: "Courses",
    component: Courses,
  },
  {
    path: "/professors",
    name: "Professor",
    component: Professor,
  },
  {
    path: "/departments",
    name: "Department",
    component: Department,
  },
  {
    path: "/allocations",
    name: "Allocation",
    component: Allocation,
  },
];

const Router = () => (
  <BrowserRouter>
    <Layout routes={routes}>
      <Switch>
        {routes.map((route, index) => (
          <Route
            component={route.component}
            exact
            key={index}
            path={route.path}
          />
        ))}
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Router;
