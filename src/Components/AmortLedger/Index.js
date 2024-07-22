import { useRouter } from "next/navigation";
import TableWarper from "../../Utils/HOC/TableWarper";
import ShowTable from "../Table/ShowTable";
import usePermissionCheck from "../../Utils/Hooks/usePermissionCheck";
import placeHolderImage from "../../../public/assets/images/placeholder.png";

const Ledgers = ({ data, ...props }) => {
  const [edit, destroy] = usePermissionCheck(["index", "create", "edit", "destroy"]);
  const router = useRouter();
  const headerObj = {
    checkBox: true,
    isOption: edit == false && destroy == false ? false : true,
    optionHead: { title: "Action", type: "View", showModalData: data },
    column: [
      { title: "Image", apiKey: "car_thumbnail", type: 'image', placeHolderImage: placeHolderImage },
      { title: "Unit Name", apiKey: "car_name", sorting: true, sortBy: "desc" },
      { title: "Montly Amortization", apiKey: "amort_amount", type: 'money', sorting: false, sortBy: "desc" },
      { title: "Month Contract", apiKey: "month_contract", sorting: false, sortBy: "desc" },
      { title: "Month Paid", apiKey: "amort_month_paid", sorting: false, sortBy: "desc" },
      { title: "Remaining Month", apiKey: "amort_month_remaining", sorting: false, sortBy: "desc" },
      { title: "CreateAt", apiKey: "created_at", sorting: false, sortBy: "desc", type: "date" },
      { title: "Status", apiKey: "status", sorting: false, sortBy: "desc", type: "switch" },
    ],
    data: data || []
  };
  if (!data) return null;

  const redirectLink = (e) => {
    router.push((`amortization_ledger/view/${e.id}`));
  }

  return <>
    <ShowTable {...props} headerData={headerObj} redirectLink={redirectLink} />
  </>
};

export default TableWarper(Ledgers);
