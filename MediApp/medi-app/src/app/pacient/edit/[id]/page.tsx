"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function PacientEdit(params: any) {

    const router = useRouter();

    const [name, setName] = useState<string>('');
    const [birthDate, setBirthDate] = useState<string>();
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [pacient, setPacient] = useState({name, birthDate, email, phone});

    const [doctors, setDoctors] = useState(new Array());
    const [pacients, setPacients] = useState(new Array());

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

    const id = params.params.id;

    useEffect(() => {
        fetch('http://127.0.0.1:3001/getPacient/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        }).then(response => response.json())
        .then(data => {
            data.birthDate = data.birthDate.substring(8,10) + "/" + data.birthDate.substring(5,7) + "/" + data.birthDate.substring(0,4);
            setPacient(data);
        })
    }, [pacient]);

    const edit = async (e: any) => {
        e.preventDefault();
        setError(null);


        //Caso a variavel esteja vazia, vamos usar o valor que foi carregado pela página, caso ela esteja preenchida, vamos colocar o novo valor
        const formData = {
            name: name || pacient.name,
            birthDate: birthDate ||pacient.birthDate,
            email: email || pacient.email,
            phone: phone || pacient.phone
        }       

        const add = await fetch('http://127.0.0.1:3001/pacients/' + id, {
            method: 'PUT',
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

    };

    return (
        <>
            <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/pacient/list">Voltar</Link>
            <form className='w-full' onSubmit={edit}>
                <span className='font-bold text-yellow-500 py-2 block underline text-2xl'>Formulário Criação de Paciente</span>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Nome</label>
                    <input type='text' defaultValue={pacient.name} name='name' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setName(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Nascimento</label>
                    <input type="text" name='birthDate' defaultValue={pacient.birthDate} className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setBirthDate(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Email</label>
                    <textarea name='email' defaultValue={pacient.email} className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setEmail(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Telefone</label>
                    <textarea name='phone' defaultValue={pacient.phone} className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setPhone(e.target.value)} />
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