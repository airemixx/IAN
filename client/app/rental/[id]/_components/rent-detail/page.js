// rent-detail

'use client';

import RentTabs from "../rent-tabs/page";

export default function RentDetail() {
  return (
    <div>
      <h2>Leica Q3</h2>
      <p className="fee-text h4 ms-2">NT$ 2,500 / 天</p>
      <p className="fee2-text ms-2">借出及歸還均免運費</p>
      
      {/* Tabs */}
      <RentTabs />
    </div>
  );
}