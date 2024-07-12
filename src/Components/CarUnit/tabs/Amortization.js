import React, { useContext, useState } from "react";
import { TabContent, TabPane } from "reactstrap";
import { CarMakeAmortizationTab } from "@/Data/TabTitleListData";
import TabTitle from "@/Components/TabTitle";
import AmortizationAccount from "./tabs/AmortizationAccount";
import AmortizationPeriod from "./tabs/AmortizationPeriod";
import Ledger from "./tabs/Ledger";


const Amortization = ({ values, setFieldValue, errors, updateId, _, touched }) => {
  const [activeTab, setActiveTab] = useState("1");
  
  const amortizationTabs = !updateId ? CarMakeAmortizationTab.filter((item) => item.title !== 'Ledger') : CarMakeAmortizationTab;

  return (
    <>
      <div className="inside-horizontal-tabs">
        <TabTitle
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          titleList={amortizationTabs}
          errors={errors}
          touched={touched}
        />
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <AmortizationAccount
              values={values}
              setFieldValue={setFieldValue} 
              errors={errors}
              updateId={updateId}
            />
          </TabPane>
          <TabPane tabId="2">
            <AmortizationPeriod
              values={values}
              setFieldValue={setFieldValue} 
              errors={errors}
              updateId={updateId}
              touched={touched}
            />
          </TabPane>
          <TabPane tabId="3">
            <Ledger
              values={values}
              setFieldValue={setFieldValue} 
              errors={errors}
              updateId={updateId}
              touched={touched}
            />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default Amortization;
