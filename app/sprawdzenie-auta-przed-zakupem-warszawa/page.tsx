import ServicePage, { createServiceMetadata } from "../service-page";
import { servicePageBySlug } from "../service-pages";

const page = servicePageBySlug["sprawdzenie-auta-przed-zakupem-warszawa"];
export const metadata = createServiceMetadata(page);
export default function Page() { return <ServicePage page={page} />; }
