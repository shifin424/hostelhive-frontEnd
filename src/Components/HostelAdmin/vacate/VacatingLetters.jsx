import React, { useEffect } from 'react'

function VacatingLetters() {

    useEffect(() => {

    }, [])


    return (
        <>
            <div>
                <h1 className="text-[#002D74] text-2xl font-bold pb-5">Vacating Letters</h1>
            </div>
            <div class="overflow-auto rounded-lg shadow">
                <table role="table" class="w-full table-auto">
                    <thead class="bg-[#4874BF] text-white">
                        <tr role="row">
                            <th colspan="1" role="columnheader" class="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300">#</th>
                            <th colspan="1" role="columnheader" class="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300">Day</th>
                            <th colspan="1" role="columnheader" class="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300">Breakfast</th>
                            <th colspan="1" role="columnheader" class="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300">Lunch</th>
                            <th colspan="1" role="columnheader" class="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300">Snacks</th>
                            <th colspan="1" role="columnheader" class="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300">Dinner</th>
                        </tr>
                    </thead>
                    <tbody role="rowgroup" class="bg-white"><tr role="row" class="odd:bg-white even:bg-gray-50 hover:bg-gray-200">
                        <td role="cell" class="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words">1</td>
                        <td role="cell" class="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words">Monday</td>
                        <td role="cell" class="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words">Idli, Sambhar, Tea</td>
                        <td role="cell" class="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words">Rice, Sambhar,  Kumbalanga Pachadi, Achar, Pappadam</td>
                        <td role="cell" class="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words">Black Tea and Biscuit</td><td role="cell" class="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words">Chicken Majboos, Chicken Fry</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default VacatingLetters
