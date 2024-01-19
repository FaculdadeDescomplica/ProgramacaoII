"use client"
import React, { useState } from "react";
import axios from 'axios';

export default function FakeApi() {

    const [fakeApiData, setFakeApiData] = useState(null);

    const requestFakeApi = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setFakeApiData(response.data);
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <>
            <h1>Dados Fake Api</h1>
            <button className="bg-green-500 p-2 inline-block text-white text-sm"
             onClick={(e) => requestFakeApi()}>Buscar dados Fake Api</button>
            <table>
                {!!fakeApiData && fakeApiData.map((data: any) => (
                    <tr>
                        <td className='border border-slate-300'>{data.name}</td>
                        <td className='border border-slate-300 text-center'>{data.username}</td>
                        <td className='border border-slate-300 text-center'>{data.email}</td>
                        <td className='border border-slate-300 text-center'>{data.phone}</td>
                    </tr>
                ))}
            </table>
        </>
    )
}