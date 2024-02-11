"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AppointmentEdit(params: any) {

    const router = useRouter();

    const [date, setDate] = useState<string>('');
    const [doctorId, setDoctorId] = useState<string>();
    const [pacientId, setPacientId] = useState<string>('');
    const [appointment, setAppointment] = useState({date, doctorId, pacientId});
    const [doctors, setDoctors] = useState(new Array());
    const [pacients, setPacients] = useState(new Array());
    const [error, setError] = useState<string | null>(null);

    const id = params.params.id;

    
    useEffect(() => {
        fetch('http://127.0.0.1:3001/getAppointment/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        }).then(response => response.json())
        .then(data => {
            setAppointment(data);
        })
    }, [appointment]);

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

    const edit = async (e: any) => {
        e.preventDefault();
        setError(null);


        //Caso a variavel esteja vazia, vamos usar o valor que foi carregado pela página, caso ela esteja preenchida, vamos colocar o novo valor
        const formData = {
            date: date || appointment.date,
            doctorId: doctorId ||appointment.doctorId,
            pacientId: pacientId || appointment.pacientId,
        }       

        const add = await fetch('http://127.0.0.1:3001/appointments/' + id, {
            method: 'PUT',
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

    };

    return (
        <>
            <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/appointment/list">Voltar</Link>
            <form className='w-full' onSubmit={edit}>
                <span className='font-bold text-yellow-500 py-2 block underline text-2xl'>Formulário Criação de Consulta</span>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Data</label>
                    <input type='text' defaultValue={appointment.date} name='date' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setDate(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Doctor</label>
                    <select id="doctorId" onChange={(e: any) => setDoctorId(e.target.value)}>
                        {doctors.map((doctor, i) =><option key={i} selected={appointment.doctorId === doctor._id ? true : false} value={doctor._id}>{doctor.name}</option> )}
                    </select>
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Pacient</label>
                    <select id="pacientId" onChange={(e: any) => setPacientId(e.target.value)}>
                        {pacients.map((pacient, i) =><option key={i} selected={appointment.pacientId === pacient._id ? true : false} value={pacient._id}>{pacient.name}</option> )}
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