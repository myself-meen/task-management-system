import React, { Component } from 'react';

function PageContainer({ children }) {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      {children}
    </div>
  );
}

export default PageContainer;