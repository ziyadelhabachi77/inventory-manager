import React from 'react'

function SupplierStatus({status}) {
    const statusStyle = status === 'active' ? 'bg-green-100 text-green-800' : status === 'pending' ? 'bg-orange-100 text-orange-800' : "bg-gray-100 text-gray-800"
  return <span className={`p-1 capitalize rounded text-xs ${statusStyle}`}>{status}</span>
}

export default SupplierStatus