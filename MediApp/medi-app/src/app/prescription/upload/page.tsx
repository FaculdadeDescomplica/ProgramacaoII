"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link";

export default function PrescriptionCreate() {

    const router = useRouter();

    useEffect(() => {

        fetch('http://127.0.0.1:3001/prescriptions', {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            }
        }).then(response => response.json())
            .then(
                data => {
                    setPrescriptions(data);
                }
            );
    }, []);

    const [file, setFile] = useState<Blob>();
    const [error, setError] = useState<string | unknown>('');

    const [prescriptions, setPrescriptions] = useState(null);

    const uploadPrescription = async (id: any) => {
        try {

            const res = await fetch('http://127.0.0.1:3001/uploadPrescription/' + id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': sessionStorage.getItem("token") || ''
                },
                body: file
            });

            router.push('/prescription/upload');
            // handle the error
            if (!res.ok)
                throw new Error(await res.text());
        } catch (error) {
            setError(error);
        }
    };

    const showFile = async (id: any) => {
        try {

            const res = await fetch('http://127.0.0.1:3001/readPrescription/' + id, {
                method: 'GET',
                headers: {
                    'Authorization': sessionStorage.getItem("token") || ''
                },
            });

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = id + ".pdf";
            link.click();

            // handle the error
            if (!res.ok)
                throw new Error(await res.text());
        } catch (error) {
            setError(error);
        }
    };

    return (
        <>
            <Link href="/home">Voltar</Link>
            <table>
                <thead>
                    <tr>
                        <td className='border border-slate-300'>Data</td>
                        <td className='border border-slate-300 text-center'>Medicine</td>
                        <td className='border border-slate-300 text-center'>Dosage</td>
                        <td className='border border-slate-300 text-center'>Instructions</td>
                    </tr>
                </thead>

                <tbody className="doctors" id="doctors">
                    {!!prescriptions && prescriptions.map((prescription: any) => (
                        <tr>
                            <td className='border border-slate-300'>{prescription.date}</td>
                            <td className='border border-slate-300 text-center'>{prescription.medicine}</td>
                            <td className='border border-slate-300 text-center'>{prescription.dosage}</td>
                            <td className='border border-slate-300 text-center'>{prescription.instructions}</td>

                            {!prescription.file && <td className='border border-slate-300 text-center'> <input type="file" name="file" onChange={(e) => setFile(e.target.files?.[0])} /></td>}
                            {!prescription.file && <td className='border border-slate-300 text-center'><button onClick={(e) => uploadPrescription(prescription._id)} className='bg-orange-500 p-2 inline-block text-white text-sm'>Upload</button></td>}
                            {prescription.file && <td className='border border-slate-300 text-center'><button onClick={(e) => showFile(prescription._id)} className='bg-green-500 p-2 inline-block text-white text-sm'>Ver Arquivo</button></td>}
                        </tr>
                    ))}
                </tbody>
            </table>

        </>

    )
}