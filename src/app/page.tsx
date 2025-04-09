'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
import x from '@/styles/app.module.css'
import Appbody from '@/components/app.body'
import { useEffect } from "react"
import useSWR from "swr"
import axios from "axios"

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
      <div>
      </div>
      <Appbody
        blogs={data?.sort((a: any, b: any) => b.id - a.id)} />
    </div>
  )
}