"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function PrescriptionCreate(params: any) {

    const router = useRouter();

    const [date, setDate] = useState<string>('');
    const [medicine, setMedicine] = useState<string>('');
    const [dosage, setDosage] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const appointmentId = params.params.id;

    const addPrescription = async (e: any) => {
        e.preventDefault();
        setError(null);

        if (date != "" && medicine != "" && dosage != "") {

            const formData = {
                date: date,
                appointmentId: appointmentId,
                medicine: medicine,
                dosage: dosage,
                instructions: instructions
            }

            const add = await fetch('http://127.0.0.1:3001/postPrescription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("token") || ''
                },
                body: JSON.stringify(formData)
            });

            const content = await add.json();

            if (content.date) {
                router.push('/home');
            } else {
                setError(content.error);
            }

        }


    };

    return (
        <>
            <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/appointment/list">Voltar</Link>
            <form className='w-full' onSubmit={addPrescription}>
                <span className='font-bold text-yellow-500 py-2 block underline text-2xl'>Formulário de prescrição</span>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Data da prescrição</label>
                    <input type='date' name='date' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setDate(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Medicamento</label>
                    <textarea name='medicine' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setMedicine(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Dosagem</label>
                    <textarea name='dosage' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setDosage(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Instruções de uso</label>
                    <textarea name='instructions' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setInstructions(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">Submit</button>
                </div>
                <div>
                    {error && <div className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-red-400" style={{ color: 'red' }}>{error}</div>}
                </div>
            </form></>
    )
}