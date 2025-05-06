import { useState } from 'react';
import { toast } from 'react-toastify';
import { uploadImage } from '../services/firebase';

function PostForm({ onSubmit, initialData = {}, isEditing = false }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image, `posts/${Date.now()}_${image.name}`);
        console.log('Image uploaded to Firebase, URL:', imageUrl); // Log Firebase URL
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (imageUrl) {
        formData.append('imageUrl', imageUrl); // Send Firebase URL
      }

      await onSubmit(formData);
      toast.success(isEditing ? 'Post updated!' : 'Post created!');
    } catch (error) {
      console.error('Error creating post:', error.response?.data || error.message); // Log error details
      toast.error(isEditing ? 'Failed to update post' : `Failed to create post: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white p-2">
      <div className="space-y-1">
        <label htmlFor="title" className="block text-sm font-medium text-white text-left pl-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-gray-500 focus:bg-gray-700 focus:ring-0 focus:outline-none py-2 px-3 text-lg autofill:bg-gray-700 autofill:text-white"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="content" className="block text-sm font-medium text-white text-left pl-1">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="5"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-gray-500 focus:bg-gray-700 focus:ring-0 focus:outline-none py-2 px-3"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="image" className="block text-sm font-medium text-white text-left pl-1">
          Image (Optional)
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mt-1 block w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-blue-700 py-1"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          {loading ? 'Processing...' : isEditing ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}

export default PostForm;