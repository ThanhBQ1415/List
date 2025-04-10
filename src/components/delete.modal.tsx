import axios from 'axios';
import React from 'react';
import { mutate } from "swr"
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

function DeleteModal ()  {
    const blogToDelete = useSelector((state: any) => state.blog.blogToDelete);
    const deleteModal = useSelector((state: any) => state.blog.deleteModal);
  

    const handleDelete = async () => {
        if (blogToDelete?.id) {
            try {
                await axios.delete(`http://localhost:8000/blogs/${blogToDelete?.id}`);
                mutate("http://localhost:8000/blogs")
                // window.location.reload(); // Reload the page to refresh the blog list
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

    return null;
}
export default DeleteModal;
