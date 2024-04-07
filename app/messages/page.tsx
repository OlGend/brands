import Image from "next/image";
// import Notification from "@/components/Messages/Messages";

export default function Messages() {
  return (
    <main className="main">
      <div className="bg-secondary flex-1 p-4 border border-dashed text-gray-800">
        <div className="flex">
          <div className="basis-6/12">
            <h2>Notifications</h2>
            {/* <Notification /> */}
          </div>
          <div className="basis-6/12 brand-content"></div>
        </div>
      </div>
    </main>
  );
}
