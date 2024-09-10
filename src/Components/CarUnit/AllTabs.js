import { Col, TabContent, TabPane } from 'reactstrap'
import GeneralTab from './tabs/GeneralTab'
// import OnHandTab from './tabs/OnHandTab'
// import CarRefTab from './tabs/CarRefTab'
import Amortization from './tabs/Amortization'
import InsuranceInformation from './tabs/InsuranceInformation'
import OwnerTab from './tabs/OwnerTab'
// import Loader from '../CommonComponent/Loader';
import StatusInformation from './tabs/StatusInformation';
import ImagesTab from './tabs/ImagesTab';


const AllTabs = ({ values, setFieldValue, errors, updateId, activeTab, touched, bodyType, carMake, users }) => {
    return (
        <Col xl="7" lg="8">
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1" className="some">
                    <GeneralTab values={values} setFieldValue={setFieldValue} bodyType={bodyType} carMake={carMake} />
                </TabPane>
                {/* <TabPane tabId="2">
                    <OnHandTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} users={users} touched={touched} />
                </TabPane> */}
                {/* <TabPane tabId="2">
                    <CarRefTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane> */}
                <TabPane tabId="2">
                    <InsuranceInformation values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} touched={touched} />
                </TabPane>
                <TabPane tabId="3">
                    <OwnerTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} touched={touched} users={users} />
                </TabPane>
                <TabPane tabId="4">
                    <Amortization values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} touched={touched} />
                </TabPane>
                <TabPane tabId="5">
                    <ImagesTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                <TabPane tabId="6">
                    <StatusInformation values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
            </TabContent>
        </Col>
    )
}

export default AllTabs;
