import Image from "next/image";
import Brands from "@/components/Brands5/Brands";
import Brand from "@/components/Brand5/Brand";
import { BrandProvider } from "@/components/Brands5/BrandContext";

export default function AllBrands4() {
  return (
    <main className="main">
      <div className="bg-secondary flex-1 p-4 border border-dashed text-gray-800">
        <BrandProvider>
          <div className="flex">
            <div className="basis-6/12">
              <h2>Brands CLD_VIP</h2>
              <Brands />
            </div>
            <div className="basis-6/12 brand-content">
              <Brand />
            </div>
          </div>
        </BrandProvider>
      </div>
    </main>
  );
}


