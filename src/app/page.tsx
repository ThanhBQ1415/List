'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
import x from '@/styles/app.module.css'
import Appbody from '@/components/app.body'
import { useEffect } from "react"
import { useQuery } from '@tanstack/react-query'
import axios from "axios"

const fetchBlogs = async () => {
  const response = await axios.get("http://localhost:8000/blogs")
  return response.data
}

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
    staleTime: Infinity, // Disable automatic refetching
   
  })

  if (isLoading) {
    return <div>loading...</div>
  }

  if (isError) {
    return <div>Error fetching data</div>
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