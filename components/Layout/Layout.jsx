import React from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
const Layout = () => {
    return (
        <div className='h-screen flex flex-row justify-start'>
            <Sidebar />
            <div  className='bg-primary h-screen flex-1 p-4 text-white border border-dashed'>Dashboard</div>
        </div>
    );
};

export default Layout;