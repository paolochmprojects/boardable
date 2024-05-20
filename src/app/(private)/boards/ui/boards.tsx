import { Select } from '@headlessui/react'
import React from 'react'

const Boards = () => {
  return (
    <div>
        <Select className="select select-bordered select-sm w-full max-w-xs" aria-label="Ordenar por">
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
            <option value="date">Fecha</option>
        </Select>
    </div>
  )
}

export default Boards