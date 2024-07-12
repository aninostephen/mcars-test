import { Col, TabContent, TabPane } from 'reactstrap'
import { useQuery } from "@tanstack/react-query";
import { user } from "@/Utils/AxiosUtils/API";
import request from "@/Utils/AxiosUtils";
import GeneralTab from './tabs/GeneralTab'
import OnHandTab from './tabs/OnHandTab'
import CarRefTab from './tabs/CarRefTab'
import Amortization from './tabs/Amortization'
import InsuranceInformation from './tabs/InsuranceInformation'
import OwnerTab from './tabs/OwnerTab'
import Loader from '../CommonComponent/Loader';
import StatusInformation from './tabs/StatusInformation';
import ImagesTab from './tabs/ImagesTab';


const AllTabs = ({ values, setFieldValue, errors, updateId, activeTab, touched }) => {

    const { data: users, isFetching } = useQuery([user], () => request({ 
      url: user,
    }), {
      refetchOnWindowFocus: false,
      select: (data) => data.data.data.map((item) => ({ id: item.id, name: item.name, ...item })) 
    });

    if (isFetching) return <Loader />;

    return (
        <Col xl="7" lg="8">
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1" className="some">
                    <GeneralTab values={values} setFieldValue={setFieldValue} />
                </TabPane>
                <TabPane tabId="2">
                    <OnHandTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} users={users} />
                </TabPane>
                <TabPane tabId="3">
                    <CarRefTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                <TabPane tabId="4">
                    <InsuranceInformation values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                <TabPane tabId="5">
                    <OwnerTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} touched={touched} users={users} />
                </TabPane>
                <TabPane tabId="6">
                    <Amortization values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} touched={touched} />
                </TabPane>
                <TabPane tabId="7">
                    <ImagesTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                <TabPane tabId="8">
                    <StatusInformation values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                {/* <TabPane tabId="4">
                    <ImagesTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                <TabPane tabId="5">
                    <SeoTab values={values} setFieldValue={setFieldValue} updateId={updateId} />
                </TabPane>
                <TabPane tabId="6">
                    <ShippingTaxTab />
                </TabPane>
                <TabPane tabId="7">
                    <OptionsTab />
                </TabPane> */}
            </TabContent>
        </Col>
    )
}

export default AllTabs