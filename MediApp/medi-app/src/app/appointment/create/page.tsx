"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function AppointmentCreate() {

    const router = useRouter();

    const [date, setDate] = useState<string>('');
    const [doctorId, setDoctorId] = useState<string>('');
    const [pacientId, setPacientId] = useState<string>('');
    const [doctors, setDoctors] = useState(new Array());
    const [pacients, setPacients] = useState(new Array());

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/doctors', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        }).then(response => response.json())
        .then(data => {
            setDoctors(data);
        });
    }, [doctors]);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/pacients', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        }).then(response => response.json())
        .then(data => {
            setPacients(data);
        });
    }, [pacients]);

    const addAppointment = async (e: any) => {
        e.preventDefault();
        setError(null);

        if (date != "" && doctorId != ""
            && pacientId != "") {

            const formData = {
                date: date,
                doctorId: doctorId,
                pacientId: pacientId
            }

            const add = await fetch('http://127.0.0.1:3001/postAppointment', {
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
            <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/home">Voltar</Link>
            <form className='w-full' onSubmit={addAppointment}>
                <span className='font-bold text-yellow-500 py-2 block underline text-2xl'>Formulário Criação de Consultas</span>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Data</label>
                    <input type='datetime-local' name='date' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setDate(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Médico</label>
                    <select id="doctorId" onChange={(e: any) => setDoctorId(e.target.value)}>
                        {doctors.map((doctor, i) =><option key={i} value={doctor._id}>{doctor.name}</option> )}
                    </select>
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Paciente</label>
                    <select id="pacientId" onChange={(e: any) => setPacientId(e.target.value)}>
                        {pacients.map((pacient, i) =><option key={i} value={pacient._id}>{pacient.name}</option> )}
                    </select>
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