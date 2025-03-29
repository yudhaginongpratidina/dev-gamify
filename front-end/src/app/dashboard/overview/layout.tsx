import { Metadata } from "next"
import FeatureMaintenance from "@/components/FeatureMaintenance";

export const metadata: Metadata = {
    title: 'Overview',
}

export default function Layout({ children }: { children: React.ReactNode }) {

    const isMaintenanceMode = process.env.NEXT_PUBLIC_FEATURE_DASHBOARD_OVERVIEW_MAINTENANCE_MODE === "true";
    const maintenanceDate = process.env.NEXT_PUBLIC_FEATURE_DASHBOARD_OVERVIEW_MAINTENANCE_TIME;

    return (
        <>
            {isMaintenanceMode ? <FeatureMaintenance date={`${maintenanceDate}`} feature={`Overview`} /> : children}
        </>
    )
}