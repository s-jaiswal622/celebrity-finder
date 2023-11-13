import React from 'react';

const DeleteModal = ({ onClose = () => {}, onDelete = () => {} }) => {
    const handleDeleteClick = () => {
        onDelete();
        onClose();
    }
  return (
    <div className='delete-modal-container'>
      <div className='delete-modal-div'>
        <div className='delete-title-div'>
          Are you sure you want to delete?
        </div>
        <div className='delete-button-div'>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleDeleteClick} className='delete-button'>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
