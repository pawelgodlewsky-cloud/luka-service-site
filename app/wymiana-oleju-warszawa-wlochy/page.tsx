import ServicePage, { createServiceMetadata } from "../service-page";
import { servicePageBySlug } from "../service-pages";

const page = servicePageBySlug["wymiana-oleju-warszawa-wlochy"];
export const metadata = createServiceMetadata(page);
export default function Page() { return <ServicePage page={page} />; }
