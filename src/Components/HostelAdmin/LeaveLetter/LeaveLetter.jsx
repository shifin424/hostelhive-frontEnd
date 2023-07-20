import React, { useEffect, useState } from 'react'
import { LeaveDataApi } from '../../../Services/hostelAdmin';
import { useSelector } from 'react-redux';

function LeaveLetter() {
    const [details, setDetails] = useState([])
    const hostelId = useSelector(state => state?.adminHostelData?.hostelId)

    useEffect(() => {
        const headers = {
            Authorization: JSON?.parse(localStorage.getItem("HostelAdminToken"))?.token
        };

        const fetchleaveData = async () => {
            try {
                console.log(headers, hostelId);
                const response = await LeaveDataApi(headers, hostelId);

                if (response) {
                    console.log(response.data);
                    setDetails(response?.data.LeaveDatas);
                } else {
                    console.log(response?.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchleaveData();
    }, [hostelId]);

    return (
        <>
            <div className="flex justify-between p-3 mt-5">
                <h1 className="flex text-2xl text-[#002D74] font-bold text-center">Leave Letters</h1>
            </div>

            <div className="overflow-auto rounded-lg shadow">
                <table role="table" className="w-full table-auto">
                    {details?.length > 0 && (
                        <thead className="bg-[#4874BF] text-white">
                            <tr role="row">
                                <th
                                    colSpan="1"
                                    role="columnheader"
                                    className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
                                >
                                    No
                                </th>
                                <th
                                    colSpan="1"
                                    role="columnheader"
                                    className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
                                >
                                    Leave Start Date
                                </th>
                                <th
                                    colSpan="1"
                                    role="columnheader"
                                    className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
                                >
                                    Leave End Date
                                </th>
                                <th
                                    colSpan="1"
                                    role="columnheader"
                                    className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
                                >
                                    Description
                                </th>
                            </tr>
                        </thead>
                    )}
                    <tbody className="bg-white">
                        {details?.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-3 text-gray-500 text-2xl font-bold text-center">
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            details.map((LeaveDatas, index) => (
                                <tr
                                    role="row"
                                    className="odd:bg-white even:bg-gray-100"
                                    key={LeaveDatas._id}
                                >
                                    <td
                                        role="cell"
                                        className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
                                    >
                                        {index + 1}
                                    </td>
                                    <td
                                        role="cell"
                                        className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
                                    >
                                        {LeaveDatas?.startDate}
                                    </td>
                                    <td
                                        role="cell"
                                        className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
                                    >
                                        {LeaveDatas?.endDate}
                                    </td>
                                    <td
                                        role="cell"
                                        className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
                                    >
                                        {LeaveDatas?.description}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default LeaveLetter;
