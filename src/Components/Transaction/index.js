import { useRouter } from "next/navigation";
import TableWarper from "../../Utils/HOC/TableWarper";
import ShowTable from "../Table/ShowTable";
import usePermissionCheck from "../../Utils/Hooks/usePermissionCheck";

const ReleaseStation = ({ data, ...props }) => {
  const router = useRouter();
  const headerObj = {
    checkBox: true,
    isSerialNo: false,
    isOption: false,
    optionHead: { type: "View" },
    column: [
      { title: "Name", apiKey: "car_unit", subKey: ["car_name"], sorting: true, sortBy: "desc" },
      { title: "New Owner", apiKey: "new_owner", subKey: ["name"], sorting: false, sortBy: "desc" },
      { title: "Payment type", apiKey: "payment_type", sorting: true, sortBy: "desc", type: 'payment_type'},
      { title: "Payment", apiKey: "downpayment", sorting: false, sortBy: "desc", type: "release_payment" },
    ],
    data: data || []
  };
  if (!data) return null;

  const redirectLink = (e) => {
    router.push((`transaction/view/${e.id}`));
  }

  return <>
    <ShowTable {...props} headerData={headerObj} redirectLink={redirectLink} />
  </>
};

export default TableWarper(ReleaseStation);
