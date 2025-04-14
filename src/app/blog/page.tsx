'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
import x from '@/styles/app.module.css'
import Appbody from '@/components/app.body'
import { useEffect } from "react"
import useSWR from "swr"
import axios from "axios"
import '@/styles/globals.css';
const fetcher = (url: string) => axios.get(url).then(res => res.data);
export default function Home() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );
  if (!data) {
    return <div>loading...</div>
  }
  return (
    <div>
 <div className="bg-blue-200 p-4 italic rounded-lg shadow-lg max-w-md mx-auto mt-6">
  <h1 className="text-xl font-bold text-red-800 mb-2">Xin chào!</h1>
  <p className="text-red-600">Đây là một ví dụ sử dụng Tailwind CSS.</p>
</div>

    </div>
  )
}