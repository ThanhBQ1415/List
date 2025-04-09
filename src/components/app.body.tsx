'use client'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import CreateModal from './create.modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import UpdateModal from './update.modal';
import DeleteModal from './delete.modal'

interface IProps {
    blogs: IBlog[]
}

function DarkExample(props: IProps) {
    const { blogs } = props;

    const [showmodalcreate, setShowModalCreate] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [blogToDelete, setBlogToDelete] = useState<IBlog | null>(null);
    const [blogToedit, setBlogToedit] = useState<IBlog | null>(null);

    const handleDeleteClick = ( blog : IBlog) => {
        setBlogToDelete(blog);
        setDeleteModal(true);
    };
    const handeditclick =(blog:IBlog)=>{
        setBlogToedit(blog);
        console.log(blogToedit);
        setUpdateModal(true)
    }
    return (
        <>
            <div className='container mt-4'>
                <div className='row mb-4'>
                    <div className='col'>
                        <h3 className='text-primary'>Blog Management</h3>
                    </div>
                    {/* <div className='col text-end'>
                        <Button 
                            variant='primary' 
                            onClick={() => setShowModalCreate(true)}
                            className='rounded-pill'
                        >
                            <i className='fas fa-plus me-2'></i>
                            Add New Blog
                        </Button>
                    </div> */}
                </div>

                <div className='card shadow'>
                    <div className='card-body'>
                        <Table hover responsive className='table-striped'>
                            <thead className='bg-light'>
                                <tr>
                                    <th className='text-center'>#</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th className='text-center'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs?.map(blog => (
                                    <tr key={blog.id}>
                                        <td className='text-center'>{blog.id}</td>
                                        <td>{blog.title}</td>
                                        <td>{blog.author}</td>
                                        <td className='text-center'>
                                            <Button 
                                                variant='outline-info' 
                                                // size='lg' 
                                                className='me-2'
                                                onClick={() => setShowModalCreate(true)}
                                                title="View Details"
                                            >
                                                <i className='fas fa-eye'></i>
                                            </Button>
                                            <Button 
                                                variant='outline-warning' 
                                            
                                                className='me-2'
                                                onClick={() => handeditclick(blog)}
                                                title="Edit Blog"
                                            >
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                            <Button 
                                                variant='outline-danger'
                                        
                                                onClick={() => handleDeleteClick(blog)}
                                                title="Delete Blog"
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>

                <CreateModal
                    showModalCreate={showmodalcreate}
                    setShowModalCreate={setShowModalCreate} 
                />
                <UpdateModal
                    updateModal={updateModal}
                    setUpdateModal={setUpdateModal}
                    blog={blogToedit || undefined}
                />
                <DeleteModal
                    pblog={blogToDelete || undefined}
                    delete={deleteModal}
                />
            </div>
        </>
    );
}

export default DarkExample;