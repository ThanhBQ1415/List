'use client'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import CreateModal from './create.modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import UpdateModal from './update.modal';
import DeleteModal from './delete.modal';
import { 
    setShowModalCreate,
    setUpdateModal,
    setDeleteModal,
    setBlogToDelete,
    setBlogToEdit
} from '@/app/Redux/blogSlice';

interface IProps {
    blogs: IBlog[]
}

function DarkExample(props: IProps) {
    const { blogs } = props;
    const dispatch = useDispatch();
    
    
    const { 
        showModalCreate,
        updateModal,
        deleteModal,
        blogToDelete,
        blogToEdit 
    } = useSelector((state: any) => state.blog);

    const handleDeleteClick = (blog: IBlog) => {
        dispatch(setBlogToDelete(blog));
        dispatch(setDeleteModal(true));
    };

    const handleEditClick = (blog: IBlog) => {
        dispatch(setBlogToEdit(blog));
        dispatch(setUpdateModal(true));
    }

    return (
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
                                            onClick={() => dispatch(setShowModalCreate(true))}
                                            title="Add Blog"
                                        >
                                            <i className='fas fa-eye'></i>
                                        </Button>
                                        <Button 
                                            variant='outline-warning' 
                                            className='me-2'
                                            onClick={() => handleEditClick(blog)}
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
            <DeleteModal />
        </div>
    );
}

export default DarkExample;