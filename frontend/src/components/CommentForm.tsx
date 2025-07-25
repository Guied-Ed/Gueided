'use client'
import React, { useState } from 'react'
import { axiosInstance } from '../../lib/axios'
interface CommentFormProps {
  onSubmit: (comment: string) => void
  onClose: () => void
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, onClose }) => {
  const [comment, setComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return
    onSubmit(comment)
    setComment('')
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label htmlFor="comment" className="text-gray-700 dark:text-gray-200 text-sm font-medium">
        Your Comment
      </label>
      <textarea
        id="comment"
        className="w-full p-3 border-2 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={5}
        value={comment}
        placeholder="Type your comment here..."
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default CommentForm
