import TableWarper from "../../Utils/HOC/TableWarper";
import ShowTable from "../Table/ShowTable";
import usePermissionCheck from "../../Utils/Hooks/usePermissionCheck";
import placeHolderImage from "../../../public/assets/images/placeholder.png";
import { TransactionsStatus } from "@/Utils/Enums";
import TableFilter from "./components/tableFilter";
import ShowCard from "../Table/ShowCard";

let filter = {
  stock_status: {},
  unit_status: {},
  transmission: {},
  brand: {},
  body_type: {},
};

const CarUnit = ({ data, onHandleFilter, ...props }) => {
  const [edit, destroy] = usePermissionCheck(["edit", "destroy"]);
  const headerObj = {
    checkBox: true,
    isOption: edit == false && destroy == false ? false : true,
    optionHead: { title: "Action" },
    column: [
      { title: "Image", apiKey: "car_thumbnail", type: 'image', placeHolderImage: placeHolderImage },
      { title: "Unit Name", apiKey: "car_name", sorting: true, sortBy: "desc" },
      { title: "Brand", apiKey: "car_make", subKey: ["car_make_name"], sorting: false, sortBy: "desc" },
      { title: "Transactions", type: 'badge', hasEnum: TransactionsStatus, apiKey: "transactions", sorting: false, sortBy: "desc" },
      { title: "CreateAt", apiKey: "created_at", sorting: false, sortBy: "desc", type: "date" },
      { title: "Status", apiKey: "status", sorting: false, sortBy: "desc", type: "switch" },
    ],
    data: data || []
  };

  if (!data) return null;
  return <>
    <TableFilter filter={filter} onHandleFilter={onHandleFilter} />
    <ShowCard {...props} headerData={headerObj} moduleName="car_unit"/>
  </>
};

export default TableWarper(CarUnit);
