import Dashboard from "views/Dashboard/Dashboard.jsx";
import Notifications from "views/Notifications/Notifications.jsx";
import Icons from "views/Icons/Icons.jsx";
import Typography from "views/Typography/Typography.jsx";
import TableList from "views/TableList/TableList.jsx";
import Maps from "views/Maps/Maps.jsx";
import Upgrade from "views/Upgrade/Upgrade.jsx";
import UserPage from "views/UserPage/UserPage.jsx";
import ProductCreate from "../components/Products/ProductCreate";
import ProductList from "../components/Products/ProductList";
import Information from "../components/Information/Information";
import CompanyCreate from "../components/Company/CompanyCreate";
import AccountPage from "../components/Account/AccountPage";
import Aliexpress from "../components/Information/Aliexpress";

var dashRoutes = [
  {
    navigaton: true,
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard
  },
  {
    navigaton: true,
    path: "/company/new",
    name: "Create Company",
    icon: "now-ui-icons business_bank",
    component: CompanyCreate
  },
  {
    navigaton: true,
    path: "/product/new",
    name: "Product",
    icon: "shopping_bag-16",
    component: ProductCreate
  },
  {
    navigaton: true,
    path: "/product/list",
    name: "Product List",
    icon: "shopping_bag-16",
    component: ProductList
  },
  {
    navigaton: true,
    path: "/icons",
    name: "Icons",
    icon: "design_image",
    component: Icons
  },
  {
    navigaton: false,
    path: "/maps",
    name: "Maps",
    icon: "location_map-big",
    component: Maps
  },
  {
    navigaton: true,
    path: "/notifications",
    name: "Notifications",
    icon: "ui-1_bell-53",
    component: Notifications
  },
  // {
  //   navigaton: true,
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "users_single-02",
  //   component: UserPage
  // },
  {
    navigaton: true,
    path: "/extended-tables",
    name: "Table List",
    icon: "files_paper",
    component: TableList
  },
  {
    navigaton: true,
    path: "/typography",
    name: "Typography",
    icon: "design-2_ruler-pencil",
    component: Typography
  },
  {
    navigaton: true,
    path: "/information",
    name: "Information",
    icon: "now-ui-icons files_single-copy-04",
    component: Information
  },
  {
    navigaton: true,
    pro: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "objects_spaceship",
    component: Upgrade
  },
  {
    navigation: false,
    path: "/account",
    name: "Account",
    icon: "objects_spaceship",
    component: AccountPage
  },
  {
    navigaton: true,
    path: "/aliexpress",
    name: "Aliexpress",
    icon: "objects_spaceship",
    component: Aliexpress
  }

  // ,
  // {
  //   navigaton: false,
  //   path: "/product/:uid/edit",
  //   name: "Product",
  //   icon: "shopping_bag-16",
  //   component: ProductCreate
  // }

  // { redirect: false, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];

export default dashRoutes;
