import axios from 'axios';
import React from 'react';
import useSWR, { mutate } from "swr"
import { useState } from 'react';
import { useSelector } from 'react-redux';
// interface IProps {
//     pblog?: {       
//         author: string;
//         content: string;
//         id: number;
//         title: string;
//     }
//     delete: boolean,
// }

// Custom fetcher function for SWR
const fetcher = (url: string) => axios.get(url).then(res => res.data);

function DeleteModal() {
    const blogToDelete = useSelector((state: any) => state.blog.blogToDelete);
    const deleteModal = useSelector((state: any) => state.blog.deleteModal);

    // Use SWR to fetch and cache blog data
    const { data: blogs, error } = useSWR('http://localhost:8000/blogs', fetcher);

    const handleDelete = async () => {
        if (blogToDelete?.id) {
            try {
                await axios.delete(`http://localhost:8000/blogs/${blogToDelete?.id}`);
                // Revalidate the blogs data after deletion
                mutate('http://localhost:8000/blogs');
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };

    React.useEffect(() => {
        if (deleteModal && blogToDelete?.id) {
            handleDelete();
        }
    }, [deleteModal, blogToDelete?.id]);

    // Handle loading and error states
    if (error) return null;
    if (!blogs) return null;

    return null;
}

export default DeleteModal;
