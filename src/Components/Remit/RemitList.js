import TableWarper from "@/Utils/HOC/TableWarper";
import ShowTable from "../Table/ShowTable";
import usePermissionCheck from "@/Utils/Hooks/usePermissionCheck";
import TableFilter from "./components/tableFilter";
import { REMIT_PAYMENT_TYPE, REMIT_TRANSACTION } from "@/Utils/Enums";
import ShowCard from "../Table/ShowCard";

let filter = {
  is_remitted: {},
};

const RemitList = ({ data, onHandleFilter, sortBy, ...props }) => {
  const [edit, destroy] = usePermissionCheck(["edit", "destroy"]);
  const headerObj = {
    checkBox: false,
    isOption: edit == false && destroy == false ? false : true,
    optionHead: { title: "Action" },
    column: [
      { title: "Transaction", apiKey: "module", sorting: true, sortBy: "desc", hasEnum: REMIT_TRANSACTION, type: 'badge'},
      { title: "Payment Type", apiKey: "payment_type", sorting: true, sortBy: "desc", hasEnum: REMIT_PAYMENT_TYPE, type: 'badge' },
      { title: "Amount", apiKey: "amount", sorting: true, sortBy: "desc", type: "money" },
      { title: "Remitted", apiKey: "is_remitted", sorting: true, sortBy: "desc", },
      { title: "CreateAt", apiKey: "created_at", sorting: true, sortBy: "desc", type: "date" },
    ],
    data: data || []
  };
  if (!data) return null;
  sortBy.field = 'ref';
  return <>
    <TableFilter filter={filter} onHandleFilter={onHandleFilter} />
    <ShowTable {...props} headerData={headerObj} />
  </>
};

export default TableWarper(RemitList);
