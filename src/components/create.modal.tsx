'use client'
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import useSWR, { mutate } from "swr"
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setShowModalCreate } from '@/app/Redux/blogSlice';

// Fetcher function for SWR
const fetcher = (url: string) => axios.get(url).then(res => res.data);

function CreateModal() {
    // Get modal state from Redux store
    const showModalCreate = useSelector((state: any) => state.blog.showModalCreate);
    const { data: blogs, error } = useSWR("http://localhost:8000/blogs", fetcher);

    const dispatch = useDispatch();


    const [title, setTitle] = useState<string>("")
    const [author, setAuthor] = useState<string>("")
    const [content, setContent] = useState<string>("")


    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:8000/blogs", {
                title: title,
                content: content,
                author: author
            });
            
            if (response) {
                mutate("http://localhost:8000/blogs");
                toast.success("Blog created successfully!");
                handleCloseModal();
            }
        } catch (error) {
            toast.error("Failed to create blog");
        }
    }


    const handleCloseModal = () => {
        setTitle("")
        setAuthor("")
        setContent("")
        dispatch(setShowModalCreate(false))
    }

    return (
        <>
            <Modal
                show={showModalCreate}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new a blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control as="textarea" rows={1}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Author</Form.Label>
                            <Form.Control as="textarea" rows={1}
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={10}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateModal;