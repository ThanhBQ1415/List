// redux/blogSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Blog {
  id: number
  title: string
  content: string
  author: string
}

interface BlogState {
  blogs: Blog[]
  showModalCreate: boolean
  updateModal: boolean
  deleteModal: boolean
  blogToDelete: Blog | null
  blogToEdit: Blog | null
}

const initialState: BlogState = {
  blogs: [
    {
      id: 1,
      title: 'Hello Redux',
      content: 'Đây là bài viết đầu tiên', 
      author: 'Admin'
    }
  ],
  showModalCreate: false,
  updateModal: false,
  deleteModal: false,
  blogToDelete: null,
  blogToEdit: null
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addBlog: (state, action: PayloadAction<Blog>) => {
      state.blogs.push(action.payload)
    },
    updateBlog: (state, action: PayloadAction<Blog>) => {
      const index = state.blogs.findIndex(b => b.id === action.payload.id)
      if (index !== -1) state.blogs[index] = action.payload
    },
    deleteBlog: (state, action: PayloadAction<number>) => {
      state.blogs = state.blogs.filter(b => b.id !== action.payload)
    },
    setShowModalCreate: (state, action: PayloadAction<boolean>) => {
      state.showModalCreate = action.payload
    },
    setUpdateModal: (state, action: PayloadAction<boolean>) => {
      state.updateModal = action.payload
    },
    setDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.deleteModal = action.payload
    },
    setBlogToDelete: (state, action: PayloadAction<Blog>) => {
      state.blogToDelete = action.payload
    },
    setBlogToEdit: (state, action: PayloadAction<Blog>) => {
      state.blogToEdit = action.payload
    }
  }
})

export const { 
  addBlog, 
  updateBlog, 
  deleteBlog,
  setShowModalCreate,
  setUpdateModal,
  setDeleteModal,
  setBlogToDelete,
  setBlogToEdit,
} = blogSlice.actions

export default blogSlice.reducer
