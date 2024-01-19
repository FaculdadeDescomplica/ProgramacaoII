import React from "react";
import Link from "next/link";

export default function Home(){

    return (
        <>
        <h1>Home</h1>
        <div>
            <Link href="/doctor/create">Create new doctor</Link>
            <br></br>
            <Link href="/doctor/list">List all doctors</Link>
            <br></br>
            <Link href="/pacient/create">Create new pacient</Link>
            <br></br>
            <Link href="/appointment/create">Create new appointment</Link>
            <br></br>
            <Link href="/prescription/create">Create new prescription</Link>
            <br></br>
            <Link href="/prescription/upload">Upload prescription</Link>
            <br></br>
            <br></br>
            <Link href="/fake">Access FakeApi</Link>
        </div>
        </>
    );
}