import TableWarper from "../../Utils/HOC/TableWarper";
import ShowTable from "../Table/ShowTable";
import usePermissionCheck from "../../Utils/Hooks/usePermissionCheck";
import placeHolderImage from "../../../public/assets/images/placeholder.png";

const Reservation = ({ data, ...props }) => {
  const [edit, destroy] = usePermissionCheck(["edit"]);
  const headerObj = {
    checkBox: true,
    isSerialNo: false,
    isOption: edit == false && destroy == false ? false : true,
    optionHead: { title: "Action" },
    column: [
      // { title: "Image", apiKey: "car_make_thumbnail", type: 'image', placeHolderImage: placeHolderImage },
      { title: "Name", apiKey: "car_unit", subKey: ["car_name"], sorting: true, sortBy: "desc" },
      { title: "Client", apiKey: "new_owner", subKey: ["name"], sorting: false, sortBy: "desc" },
      { title: "Amount", apiKey: "amount", sorting: true, sortBy: "desc", type: "money"},
      { title: "Target Date", apiKey: "target_date", sorting: false, sortBy: "desc", type: "datev1"},
    ],
    data: data || []
  };
  if (!data) return null;
  return <>
    <ShowTable {...props} headerData={headerObj} />
  </>
};

export default TableWarper(Reservation);
