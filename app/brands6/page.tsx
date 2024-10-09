import Image from "next/image";
import Brands from "@/components/Brands6/Brands";
import Brand from "@/components/Brand6/Brand";
import { BrandProvider } from "@/components/Brands6/BrandContext";

export default function AllBrands6() {
  return (
    <main className="main">
      <div className="bg-secondary flex-1 p-4 border border-dashed text-gray-800">
        <BrandProvider>
          <div className="flex">
            <div className="basis-6/12">
              <h2>Brands 1045</h2>
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


