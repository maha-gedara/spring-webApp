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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-white">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="5"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image (Optional)
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mt-1 block w-full"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {loading ? 'Processing...' : isEditing ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
}

export default PostForm;