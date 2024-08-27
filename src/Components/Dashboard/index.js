import { Typography } from "@mui/material"
import ProductStockReportTable from "./ProductStockReport/ProductStockReportTable"
import RecentOrderTable from "./RecentOrders/RecentOrderTable"
import RevenueAndTopVendor from "./Revenue&TopVendor"
import TopDashSection from "./TopDashSection"

const MainDashboard = () => {
    return (
        <>
            <Typography variant="h5" gutterBottom>
                Welcome to MCARS dashboard
            </Typography>
            <TopDashSection />
            <section>
                {/* <RevenueAndTopVendor /> */}
                {/* <RecentOrderTable />
                <ProductStockReportTable /> */}
            </section >
        </>
    )
}

export default MainDashboard