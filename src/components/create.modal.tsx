'use client'
import { useState, useContext } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { mutate } from "swr"
import axios from "axios";
import { createContext } from 'react';
import { ModalContext } from '@/components/app.body'; 

function CreateModal() {
    // Get modal state and setter from context
    const { showModalCreate, setShowModalCreate } = useContext(ModalContext);
    
    // State for form inputs
    const [title, setTitle] = useState<string>("")
    const [author, setAuthor] = useState<string>("")
    const [content, setContent] = useState<string>("")

    console.log("thanhdeptrai")
    
    // Handle submit form and create new blog
    const handleSubmit = () => {
        console.log("thanhdeptrai")
        // Send POST request to create new blog
        axios.post("http://localhost:8000/blogs", {
            title: title,
            content: content,
            author: author
        }).then(res => {
            if (res) {
                // Revalidate data and close modal
                mutate("http://localhost:8000/blogs")             
                handleCloseModal()
            }
        });
    }

    // Reset form and close modal
    const handleCloseModal = () => {
        setTitle("")
        setAuthor("")
        setContent("")
        setShowModalCreate(false)
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