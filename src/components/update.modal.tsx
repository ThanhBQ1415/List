'use client'
import { useState, useEffect,useContext } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { mutate } from "swr"
import axios from "axios";
import { ModalContext } from '@/components/app.body'; 
// interface Iprops {
//     updateModal: boolean,
//     setUpdateModal: (v: boolean) => void;
//     blog?: {       
//         author: string;
//         content: string;
//         id: number;
//         title: string;
//     }
// }

function UpdateModal() {
    const { updateModal, setUpdateModal, blogToedit } = useContext(ModalContext);
    const [title, setTitle] = useState<string>("")
    const [author, setAuthor] = useState<string>("")
    const [content, setContent] = useState<string>("")

    useEffect(() => {
        if(blogToedit) {
            setTitle(blogToedit.title)
            setAuthor(blogToedit.author)
            setContent(blogToedit.content)
        }
    }, [blogToedit])

    const handleSubmit = () => {
        if(!blogToedit?.id) return;
        
        axios.put(`http://localhost:8000/blogs/${blogToedit.id}`, {
            title: title,
            content: content,
            author: author
        }).then(res => {
            if (res) {
                mutate("http://localhost:8000/blogs")
                handleCloseModal()
                toast.success("Blog updated successfully!")
            }
        }).catch(error => {
            toast.error("Failed to update blog")
        });
    }

    const handleCloseModal = () => {
        setTitle("")
        setAuthor("")
        setContent("")
        setUpdateModal(false)
    }

    return (
        <>
            <Modal
                show={updateModal}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit blog</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleSubmit()}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateModal;