'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
import x from '@/styles/app.module.css'
import Appbody from '@/components/app.body'
import { useEffect } from "react"
import useSWR from "swr"
import axios from "axios"
import { setBlogToSearch } from '@/app/Redux/blogSlice';
import { useSelector, useDispatch } from 'react-redux';
// import '@/styles/globals.css';
const fetcher = (url: string) => axios.get(url).then(res => res.data);
export default function Home() {
  
  type Blog = {
    id: number,
    title: string,
    author: string,
    content: string,
  }

  let data;
  const BlogToSearch = useSelector((state: any) => state.blog.blogToSearch);


 if(BlogToSearch!=0) data = [BlogToSearch];


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