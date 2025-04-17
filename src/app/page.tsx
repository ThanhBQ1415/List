'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
import x from '@/styles/app.module.css'
import Appbody from '@/components/app.body'
import { useEffect } from "react"
import useSWR from 'swr'
import { cache } from 'swr/_internal'
import axios from "axios"
const fetcher = (url: string) => axios.get(url).then(res => res.data);
export default function Home() {
  const { data, error, isLoading, isValidating } = useSWR(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
 
  );

if(!isLoading && !isValidating)  console.log("du lieu tu cache")
  console.log(data)
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