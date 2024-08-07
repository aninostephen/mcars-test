import TableWarper from "@/Utils/HOC/TableWarper";
import ShowTable from "../Table/ShowTable";
import usePermissionCheck from "@/Utils/Hooks/usePermissionCheck";

const RemitList = ({ data, ...props }) => {
  const [edit, destroy] = usePermissionCheck(["edit", "destroy"]);
  const headerObj = {
    checkBox: false,
    isOption: edit == false && destroy == false ? false : true,
    optionHead: { title: "Action" },
    column: [
      { title: "Transaction", apiKey: "module", sorting: true, sortBy: "desc" },
      { title: "Payment Type", apiKey: "payment_type", sorting: true, sortBy: "desc" },
      { title: "Amount", apiKey: "amount", sorting: true, sortBy: "desc", type: "money" },
      { title: "Remitted", apiKey: "is_remitted", sorting: true, sortBy: "desc", },
      { title: "CreateAt", apiKey: "created_at", sorting: true, sortBy: "desc", type: "date" },
    ],
    data: data || []
  };
  if (!data) return null;
  return <>
    <ShowTable {...props} headerData={headerObj} />
  </>
};

export default TableWarper(RemitList);
