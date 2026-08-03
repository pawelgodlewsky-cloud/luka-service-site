import ServicePage, { createServiceMetadata } from "../service-page";
import { servicePageBySlug } from "../service-pages";

const page = servicePageBySlug["wymiana-rozrzadu-warszawa"];
export const metadata = createServiceMetadata(page);
export default function Page() { return <ServicePage page={page} />; }
