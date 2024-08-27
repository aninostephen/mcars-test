import TableWarper from "../../Utils/HOC/TableWarper";
import ShowTable from "../Table/ShowTable";
import usePermissionCheck from "../../Utils/Hooks/usePermissionCheck";

const CarMake = ({ data, ...props }) => {
  const [edit, destroy] = usePermissionCheck(["edit", "destroy"]);
  const headerObj = {
    checkBox: false,
    // isOption: edit == false && destroy == false ? false : true,
    isOption: false,
    optionHead: { title: "Action" },
    noCustomClass: true,
    column: [
      { title: "Unit", apiKey: "car_unit", subKey: ['car_name'], sorting: true, sortBy: "desc" },
      { title: "Avail Date", apiKey: "avail_date", sortBy: "desc", type: 'date' },
      { title: "Firstname", apiKey: "firstname", sorting: true, sortBy: "desc" },
      { title: "Lastname", apiKey: "lastname", sorting: true, sortBy: "desc" },
      { title: "Phone", apiKey: "contact", sortBy: "desc" },
      { title: "Email", apiKey: "email", sortBy: "desc" },
      { title: "Review By", apiKey: "review_by", subKey: ['name'], sortBy: "desc"},
      { title: "Reviewed", apiKey: "is_review", sorting: false, sortBy: "desc", type: "switch1" },
    ],
    data: data || []
  };
  if (!data) return null;
  return <>
    <ShowTable {...props} headerData={headerObj} moduleName="inquiriy_unit" />
  </>
};

export default TableWarper(CarMake);
