import React from 'react';
import RegisterManager from '../components/management/RegisterManager';
import MemoryManager from '../components/management/MemoryManager';

const ManagementPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Administración del Sistema</h2>
      
      <div className="space-y-8">
        <RegisterManager />
        <MemoryManager />
      </div>
    </div>
  );
};

export default ManagementPage;