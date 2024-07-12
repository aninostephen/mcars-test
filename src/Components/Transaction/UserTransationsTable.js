import usePermissionCheck from '@/Utils/Hooks/usePermissionCheck';
import TableWarper from '../../Utils/HOC/TableWarper'
import ShowTable from '../Table/ShowTable';

const UserTransationsTable = ({ data, ...props }) => {
    const [edit, destroy] = usePermissionCheck(["edit"]);
    const headerObj = {
        checkBox: false,
        isSerialNo: false,
        isOption: edit == false && destroy == false ? false : true,
        optionHead: { title: "Action" },
        column: [
            { title: "Unit", apiKey: "car_name" },
            { title: "Model", apiKey: "model_variant" },
            { title: "Transmission", apiKey: "transmission" },
            { title: "Unit Status", apiKey: "unit_status" },
        ],
        data: data?.data || []
    };
    
    if (!data) return null;
    return <>
        <ShowTable {...props} headerData={headerObj} />
    </>
};

export default TableWarper(UserTransationsTable)