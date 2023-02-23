import React, { useState } from 'react'
import { GoChevronDown, GoChevronLeft } from 'react-icons/go'

interface ExpandablePanel {
  header: React.ReactNode
  children?: React.ReactNode
}
function ExpandablePanel({ header, children }: ExpandablePanel) {
  const [isExpanded, setExpanded] = useState<boolean>(false)
  const handleClick = () => {
    setExpanded(!isExpanded)
  }
  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center">
        <div className="flex flex-row items-center justify-between">
          {header}
        </div>
        <button onClick={handleClick} className="cursor-pointer">
          {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
        </button>
      </div>
      {isExpanded && <div className="p-3 border-t">{children}</div>}
    </div>
  )
}

export default ExpandablePanel
