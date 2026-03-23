// import { discoverValidationDepths } from "next/dist/server/app-render/instant-validation/instant-validation";
// import Image from "next/image";

// export default function Home() {
//   const services = [
//   { id: 1, name: "Baby Care", price: 100 },
//   { id: 2, name: "Elderly Care", price: 120 },
//   { id: 3, name: "Sick Care", price: 150 }
// ];
//   return (
//     <div>Hello next</div>
//   );
// }
import Link from "next/link";
import { services } from "@/data/services";

export default function Home() {
  return (
    <div>
      <h1>Care.xyz</h1>
      <p>Trusted caregiving platform</p>

      <h2>Services</h2>
      {services.map((s) => (
        <div key={s.id}>
          <h3>{s.name}</h3>
          <p>{s.description}</p>
          <Link href={`/service/${s.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}