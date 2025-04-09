import axios from 'axios';
import React from 'react';
import { mutate } from "swr"
interface IProps {
    pblog?: {       
        author: string;
        content: string;
        id: number;
        title: string;
    }
    delete: boolean,
}

const DeleteModal: React.FC<IProps> = (props: IProps) => {
    const { pblog } = props;
    const productId = pblog?.id;

    // Delete product without page reload
    const handleDelete = async () => {
        if (productId) {
            try {
                await axios.delete(`http://localhost:8000/blogs/${productId}`);
                mutate("http://localhost:8000/blogs")
                // window.location.reload(); // Reload the page to refresh the blog list
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };

    React.useEffect(() => {
        if (props.delete && productId) {
            handleDelete();
        }
    }, [props.delete, productId]);

    return null;
}
export default DeleteModal;
