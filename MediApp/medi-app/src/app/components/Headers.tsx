import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";
import Head from 'next/head'
import React from 'react'
import Link from "next/link";

export default function Header() {
  return (
    <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
            <div className='w-full bg-gray-300 py-4 px-3'>
              <h1 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white"><Link href="/home">Medi-APP</Link></h1>
            </div>
    </>
  )
}