"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  const [login, setLogin] = useState<string>(''); // hook = gancho
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>('');

  const authentication = async (e: any) => {
    e.preventDefault();
    setError(null);

    if (login != "" && password != "") {

      const formData = {
        login: login,
        password: password
      }

      const add = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)

      })

      const content = await add.json();
      if (content.token) {
        sessionStorage.setItem("token", content.token);
        router.push('/home');
      } else {
        setError(content.error);
      }

    }
  }

  return (
    <div>
      <form className='w-full' onSubmit={authentication}>
        <span className='font-bold text-blue-500 py-2 block text-2xl'>Login</span>
        <div className='w-full py-2'>
          <label htmlFor="" className='text-sm font-bold py-2 block'>Usuário</label>
          <input type='text' name='name' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setLogin(e.target.value)} />
        </div>
        <div className='w-full py-2'>
          <label htmlFor="" className='text-sm font-bold py-2 block'>Senha</label>
          <input name='login' type="password" className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setPassword(e.target.value)} />
        </div>
        <div className='w-full py-2'>
          <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">Login</button>
        </div>
        <div>
          {error && <div className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-red-400" style={{ color: 'red' }}>{error}</div>}
        </div>
      </form>

    </div>
  )
}
