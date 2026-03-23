import Link from "next/link";
import { services } from "@/data/services";

export const generateMetadata = ({ params }) => ({
  title: `Service ${params.id}`
});

export default function ServicePage({ params }) {
  const service = services.find((s) => s.id === params.id);

  if (!service) return <div>Service Not Found</div>;

  return (
    <div>
      <h1>{service.name}</h1>
      <p>{service.description}</p>
      <p>Price: {service.price} BDT/hour</p>

      <Link href={`/booking/${service.id}`}>
        Book Now
      </Link>
    </div>
  );
}