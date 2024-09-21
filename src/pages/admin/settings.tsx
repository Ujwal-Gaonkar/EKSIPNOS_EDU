// src/pages/admin/settings.tsx

import React from 'react';
import Sidebar from '@/components/admin/Sidebar';

const Settings: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar activePage="settings" />
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold">Admin Settings</h1>
        <p>Manage your settings here.</p>
      </div>
    </div>
  );
};

export default Settings;
