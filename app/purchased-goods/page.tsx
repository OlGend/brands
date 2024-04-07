import Image from "next/image";
import PurchasedGoods from "@/components/PurchasedGoods/PurchasedGoods";

export default function Messages() {
  return (
    <main className="main">
      <div className="bg-secondary flex-1 p-4 border border-dashed text-gray-800">
        <div className="flex">
          <div className="basis-6/12">
            <h2>PurchasedGoods</h2>
            <PurchasedGoods />
          </div>
          <div className="basis-6/12 brand-content"></div>
        </div>
      </div>
    </main>
  );
}
