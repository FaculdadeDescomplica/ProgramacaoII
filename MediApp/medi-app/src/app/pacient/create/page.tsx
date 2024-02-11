"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function PacientCreate() {

    const router = useRouter();

    const [name, setName] = useState<string>('');
    const [birthDate, setBirthDate] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addPacient = async (e: any) => {
        e.preventDefault();
        setError(null);

        if (name != "" && birthDate != ""
            && email != "" && phone != "") {

            const formData = {
                name: name,
                birthDate: birthDate,
                email: email,
                phone: phone
            }

            const add = await fetch('http://127.0.0.1:3001/postPacient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("token") || ''
                },
                body: JSON.stringify(formData)
            });

            const content = await add.json();

            if (content.name) {
                router.push('/home');
            } else {
                setError(content.error);
            }

        }

    };

    return (
        <>
            <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/home">Voltar</Link>
            <form className='w-full' onSubmit={addPacient}>
                <span className='font-bold text-yellow-500 py-2 block underline text-2xl'>Formulário Criação de Paciente</span>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Nome</label>
                    <input type='text' name='name' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setName(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Nascimento</label>
                    <input type="date" name='birthDate' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setBirthDate(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Email</label>
                    <textarea name='email' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setEmail(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Telefone</label>
                    <textarea name='phone' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setPhone(e.target.value)} />
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