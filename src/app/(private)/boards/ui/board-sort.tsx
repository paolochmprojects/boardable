"use client"
import { Select } from '@headlessui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const BoardSort = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const [sortOrder, setSortOrder] = useState(searchParams.get('sort') || 'az');

    useEffect(() => {
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.set('sort', sortOrder);
        router.replace(`?${currentParams.toString()}`);
    }, [sortOrder, router]);

    return (
        <Select
            onChange={(e) => setSortOrder(e.target.value)}
            className="select select-bordered select-sm w-full max-w-xs"
            aria-label="Ordenar por">
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
            <option value="latest">Mas recientes</option>
            <option value="oldest">Mas antiguos</option>
        </Select>
    )
}

export default BoardSort