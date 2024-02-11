"use client"
import React, { useEffect, useState } from 'react'; // HOOK = gancho
import Link from 'next/link';

export default function PacientList() {
    const [pacients, setPacients] = useState(new Array());
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/pacients', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        }).then(response => response.json())
        .then(data => setPacients(data))
    }, [pacients]);

    const deletePacient = async (id: any) => {
        const add = await fetch(`http://127.0.0.1:3001/pacients/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        });
        const content = await add.json();
        
        if (content.login) {
            window.location.reload();
        } else {
            setError(content.error);
        }
    }

    return (
        <>
            <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/home">Voltar</Link>
            <table>
                <thead>
                    <tr>
                        <td className='border border-slate-300'>Nome</td>
                        <td className='border border-slate-300 text-center'>Nascimento</td>
                        <td className='border border-slate-300 text-center'>Email</td>
                        <td className='border border-slate-300 text-center'>Telefone</td>
                    </tr>
                </thead>

                <tbody className="pacients" id="pacients">
                    {!!pacients && pacients.map((pacient: any) => (
                        <tr>
                            <td className='border border-slate-300'>{pacient.name}</td>
                            <td className='border border-slate-300 text-center'>{pacient.birthDate}</td>
                            <td className='border border-slate-300 text-center'>{pacient.email}</td>
                            <td className='border border-slate-300 text-center'>{pacient.phone}</td>
                            <td className='border border-slate-300 text-center'>
                                <button onClick={(e) => deletePacient(pacient._id)} className='bg-red-500 p-2 inline-block text-white text-sm'>Delete</button></td>
                            <td className='border border-slate-300 text-center'>
                            <Link href={`/pacient/edit/${pacient._id}`} className='bg-yellow-500 p-2 inline-block ml-3 text-white text-sm'>Edit</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {error && <div className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-red-400" style={{ color: 'red' }}>{error}</div>}
            </div>
        </>
    )
}