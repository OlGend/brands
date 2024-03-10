import Image from "next/image";
import Map from "@/components/Map/Map";
import Brands from "@/components/Brands/Brands";
import Brand from "@/components/Brand/Brand";
import { BrandProvider } from "@/components/Brands/BrandContext";

export default function Home() {
  return (
    <main className="main">
      <div className="bg-secondary flex-1 p-4 border border-dashed text-white-800">
      Bonuses with prizes
        <div className="flex mt-3 items-start">
          <BrandProvider>
            {/* <Brands /> */}
            <Map />
            {/* <Brand /> */}
          </BrandProvider>
        </div>
      </div>
    </main>
  );
}
