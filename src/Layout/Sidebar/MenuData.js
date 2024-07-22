import {
  RiContactsLine,
  RiHomeLine,
  RiImageLine,
  RiPagesLine,
  RiSettings3Line,
  RiTruckLine,
  RiGitRepositoryFill,
  RiWindowLine,
  RiFolder3Line,
} from "react-icons/ri";

const MENUITEMS = [
  {
    title: "Dashboard",
    displayTitle: "Dashboard",
    icon: <RiHomeLine />,
    path: "/dashboard",
    type: "link"
  },
  {
    title: "Clients",
    displayTitle: "Clients",
    icon: <RiContactsLine />,
    path: "/client",
    permission: ["client.index", "client.create"],
    type: "link"
  },
  {
    title: "Master",
    displayTitle: "Master",
    icon: <RiTruckLine />,
    type: "sub",
    children: [
      { title: "MasterList", path: "/master_list", displayTitle: "Master List", permission: ["master_list.index"] },
      { title: "Car Unit", path: "/car_unit", displayTitle: "Car Unit", permission: ["car_unit.index", "car_unit.create"] },
      { title: "BodyType", path: "/body_type", displayTitle: "Body Type", permission: ["body_type.index", "body_type.create"] },
      { title: "Brand", path: "/car_make", displayTitle: "Brand", permission: ["car_make.index", "car_make.create"] },
    ],
  },
  {
    title: "Amortization Ledger",
    displayTitle: "Amortization Ledger",
    icon: <RiFolder3Line />,
    path: "/amortization_ledger",
    permission: ["amortization_ledger.index", "amortization_ledger.create"],
    type: "link"
  },
  {
    title: "Transactions",
    displayTitle: "Transactions",
    icon: <RiPagesLine />,
    type: "sub",
    children: [
      { title: "Reservation", path: "/reservation", displayTitle: "Reservation", permission: ["reservation.index"] },
      { title: "Release Station", path: "/transaction", displayTitle: "Release Station", permission: ["transaction.index"] },
      { title: "Remit", path: "/remit", displayTitle: "Remit", permission: ["remit.index", "remit.create"] },
    ],
  },
  {
    title: "Reports",
    displayTitle: "Reports",
    icon: <RiGitRepositoryFill />,
    type: "sub",
    children: [],
  },
  {
    title: "Users",
    displayTitle: "Users",
    icon: <RiContactsLine />,
    type: "sub",
    children: [
      { title: "AddUser", path: "/user/create", displayTitle: "AddUser", permission: ["user.create"] },
      { title: "AllUsers", path: "/user", displayTitle: "AllUsers", permission: ["user.index"] },
      { title: "Role", path: "/role", displayTitle: "Role", permission: ["role.index"] },
    ],
  },
  // {
  //   title: "Products",
  //   displayTitle: "Products",
  //   icon: <RiStore3Line />,
  //   type: "sub",
  //   children: [
  //     { title: "AddProduct", path: "/product/create", displayTitle: "Add Product", permission: ["product.create"] },
  //     { title: "AllProducts", path: "/product", displayTitle: "All Product", badgeType: 'badge bg-warning text-dark ml-3', badgeValue: 0, permission: ["product.create"] },
  //     { title: "Attributes", path: "/attribute", displayTitle: "All Attributes", permission: ["attribute.index", "attribute.create"] },
  //     { title: "Categories", path: "/category", displayTitle: "Categories", permission: ["category.index"] },
  //   ],
  // },
  {
    title: "Media",
    displayTitle: "Media",
    icon: <RiImageLine />,
    path: "/attachment",
    permission: ["attachment.index", "attachment.create"],
    type: "link"
  },
  // {
  //   title: "Transaction",
  //   displayTitle: "Transaction",
  //   icon: <RiPercentLine />,
  //   path: "/transaction",
  //   permission: ["transaction.index"],
  //   type: "link"
  // },
  {
    title: "StoreFront",
    displayTitle: "Store Front",
    icon: <RiWindowLine />,
    type: "sub",
    children: [
      // { title: "Themes", path: "/theme", displayTitle: "Theme", permission: ["theme.index"], },
      { title: "ThemeOptions", path: "/theme_option", displayTitle: "Theme Option", permission: ["theme_option.index"], }
    ],
  },
  {
    title: "Settings",
    displayTitle: "Settings",
    icon: <RiSettings3Line />,
    path: "/setting",
    permission: ["setting.index"],
    type: "link"
  }
];

export default MENUITEMS;
