import React from 'react'

interface ListWrapperProps {
    children: React.ReactNode
}

const ListWrapper = ({ children }: ListWrapperProps) => {
    return (
        <div>
            <div className="bg-base-100 w-72 rounded-xl py-2 px-4">
                {children}
            </div>
        </div>
    )
}

export default ListWrapper