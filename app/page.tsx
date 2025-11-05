'use client';

import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

    const router = useRouter();
    useEffect(() => {
      router.push('/breeds');
    }, [router]);
    return (

        // redirect("/breeds")
        <p>Redirecting...</p>
  );
}
