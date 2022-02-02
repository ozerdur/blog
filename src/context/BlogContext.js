import React from 'react';
import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogPosts', { title, content });

    if (callback) {
      callback();
    }
  };
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get('/blogPosts');
    dispatch({
      type: 'get_blogposts',
      payload: response.data,
    });
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogPosts/${id}`);
    dispatch({
      type: 'delete_blogpost',
      payload: id,
    });
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogPosts/${id}`, { title, content });
    dispatch({
      type: 'edit_blogpost',
      payload: { id, title, content },
    });
    if (callback) {
      callback();
    }
  };
};

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'delete_blogpost':
      return state.filter((s) => s.id !== action.payload);

    case 'edit_blogpost':
      return state.map((p) =>
        p.id === action.payload.id ? action.payload : p
      );

    case 'get_blogposts':
      return action.payload;

    default:
      return state;
  }
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
