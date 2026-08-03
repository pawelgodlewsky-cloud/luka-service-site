import ServicePage, { createServiceMetadata } from "../service-page";
import { servicePageBySlug } from "../service-pages";

const page = servicePageBySlug["zawieszenie-warszawa-wlochy"];
export const metadata = createServiceMetadata(page);
export default function Page() { return <ServicePage page={page} />; }
