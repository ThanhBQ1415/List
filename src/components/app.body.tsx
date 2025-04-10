'use client'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import CreateModal from './create.modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import { useState, createContext, useContext } from 'react';
import UpdateModal from './update.modal';
import DeleteModal from './delete.modal'

// Create context for modal state
export const ModalContext = createContext<{
    showModalCreate: boolean;
    updateModal: boolean;
    setUpdateModal: (show: boolean) => void;
    showModalDelete: boolean;
    setShowModalDelete: (show: boolean) => void;
    deleteModal: boolean;
    setDeleteModal: (show: boolean) => void;
    pblog: IBlog | null;
    blogToDelete: IBlog | null;
    blogToedit: IBlog | null;
    setPblog: (blog: IBlog | null) => void;
    setShowModalCreate: (show: boolean) => void;
}>({
    showModalCreate: false,
    setShowModalCreate: () => {},
    updateModal: false,
    setUpdateModal: () => {},
    showModalDelete: false,
    setShowModalDelete: () => {},
    pblog: null,
    setPblog: () => {},
    blogToedit: null,
    deleteModal: false,
    setDeleteModal: () => {},
    blogToDelete: null,
});

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

    const handleDeleteClick = (blog: IBlog) => {
        setBlogToDelete(blog);
        setDeleteModal(true);
    };
    const handeditclick = (blog: IBlog) => {
        setBlogToedit(blog);
        setUpdateModal(true)
    }

    return (
        <ModalContext.Provider value={{
            showModalCreate: showmodalcreate,
            setShowModalCreate: setShowModalCreate,
            updateModal: updateModal,
            setUpdateModal: setUpdateModal,
            showModalDelete: deleteModal,
            setShowModalDelete: setDeleteModal,
            pblog: blogToDelete,
            blogToedit: blogToedit,
            setPblog: setBlogToDelete,
            blogToDelete: blogToDelete,
            deleteModal: deleteModal,
            setDeleteModal: setDeleteModal,          
           

        }}>
            <div className='container mt-4'>
                <div className='row mb-4'>
                    <div className='col'>
                        <h3 className='text-primary'>Blog Management</h3>
                    </div>                
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
                                                className='me-2'
                                                onClick={() => setShowModalCreate(true)}
                                                title="Add Blog"
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

                <CreateModal />
                <UpdateModal />
                <DeleteModal
                    pblog={blogToDelete || undefined}
                    delete={deleteModal}
                />
            </div>
        </ModalContext.Provider>
    );
}

export default DarkExample;