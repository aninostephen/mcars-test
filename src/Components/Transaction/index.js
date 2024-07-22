import TableWarper from "../../Utils/HOC/TableWarper";
import ShowTable from "../Table/ShowTable";
import usePermissionCheck from "../../Utils/Hooks/usePermissionCheck";

const ReleaseStation = ({ data, ...props }) => {
  const [edit, destroy] = usePermissionCheck(["edit"]);
  const headerObj = {
    checkBox: true,
    isSerialNo: false,
    isOption: edit == false && destroy == false ? false : true,
    optionHead: { title: "Action" },
    column: [
      { title: "Name", apiKey: "car_unit", subKey: ["car_name"], sorting: true, sortBy: "desc" },
      { title: "New Owner", apiKey: "new_owner", subKey: ["name"], sorting: false, sortBy: "desc" },
      { title: "Payment type", apiKey: "payment_type", sorting: true, sortBy: "desc", type: 'payment_type'},
    ],
    data: data || []
  };
  if (!data) return null;
  return <>
    <ShowTable {...props} headerData={headerObj} />
  </>
};

export default TableWarper(ReleaseStation);
