"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DoctorEdit(params: any) {

    const router = useRouter();

    const [name, setName] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [medicalSpecialty, setMedicalSpecialty] = useState<string>('');
    const [medicalRegistration, setMedicalRegistration] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [doctor, setDoctor] = useState({name, login, password, medicalSpecialty, medicalRegistration, email, phone});

    const id = params.params.id;

    
    useEffect(() => {
        fetch('http://127.0.0.1:3001/getDoctor/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        }).then(response => response.json())
        .then(data => {
            setDoctor(data);
        })
    }, [doctor]);

    const edit = async (e: any) => {
        e.preventDefault();
        setError(null);


        //Caso a variavel esteja vazia, vamos usar o valor que foi carregado pela página, caso ela esteja preenchida, vamos colocar o novo valor
        const formData = {
            name: name || doctor.name,
            login: login ||doctor.login,
            password: password || doctor.password,
            medicalSpecialty: medicalSpecialty || doctor.medicalSpecialty,
            medicalRegistration: medicalRegistration || doctor.medicalRegistration,
            email: email || doctor.email,
            phone: phone || doctor.phone
        }       
        
        const add = await fetch('http://127.0.0.1:3001/doctors/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
            body: JSON.stringify(formData)
        });

        const content = await add.json();

        if (content.login) {
            router.push('/home');
        } else {
            setError(content.error);
        }

    };

    return (
        <>
            <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/doctor/list">Voltar</Link>
            <form className='w-full' onSubmit={edit}>
                <span className='font-bold text-yellow-500 py-2 block underline text-2xl'>Formulário Criação de Médico</span>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Nome</label>
                    <input type='text' defaultValue={doctor.name} name='name' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setName(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Login</label>
                    <textarea name='login' defaultValue={doctor.login} className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setLogin(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Senha</label>
                    <input type="password" defaultValue='password' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setPassword(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Especialidade Médica</label>
                    <textarea name='medicalSpecialty' defaultValue={doctor.medicalSpecialty} className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setMedicalSpecialty(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Registro Médico</label>
                    <textarea name='medicalRegistration' defaultValue={doctor.medicalRegistration} className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setMedicalRegistration(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Email</label>
                    <textarea name='email' defaultValue={doctor.email} className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setEmail(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Telefone</label>
                    <textarea name='phone' defaultValue={doctor.phone} className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setPhone(e.target.value)} />
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