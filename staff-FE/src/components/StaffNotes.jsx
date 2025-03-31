import React, { useState } from 'react';

const StaffNotes = () => {
  const [notes, setNotes] = useState([
    { id: 1, date: 'Sept 15,2023', content: 'VIP guest - Prefers room service breakfast between 7-8 AM' },
    { id: 2, date: 'Sept 14,2023', content: 'Allergic to feather pillows - Replaced with hypoallergenic' }
  ]);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim()) {
      const today = new Date();
      const month = today.toLocaleString('default', { month: 'short' });
      const dateStr = `${month} ${today.getDate()},${today.getFullYear()}`;
      
      setNotes([{ id: notes.length + 1, date: dateStr, content: newNote }, ...notes]);
      setNewNote('');
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '100%',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    header: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#333'
    },
    addNoteSection: {
      display: 'flex',
      marginBottom: '20px'
    },
    noteInput: {
      flex: '1',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      minHeight: '60px',
      resize: 'vertical'
    },
    addButton: {
      marginLeft: '10px',
      padding: '0 15px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    addButtonHover: {
      backgroundColor: '#45a049'
    },
    notesList: {
      marginBottom: '20px'
    },
    noteItem: {
      position: 'relative',
      padding: '15px',
      marginBottom: '15px',
      borderLeft: '3px solid #4CAF50',
      backgroundColor: '#f9f9f9',
      borderRadius: '0 4px 4px 0'
    },
    noteDate: {
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#555'
    },
    noteContent: {
      color: '#333'
    },
    deleteButton: {
      position: 'absolute',
      top: '5px',
      right: '5px',
      background: 'none',
      border: 'none',
      color: '#888',
      cursor: 'pointer',
      fontSize: '16px'
    },
    deleteButtonHover: {
      color: '#f44336'
    },
    tagsSection: {
      marginBottom: '20px'
    },
    tag: {
      display: 'inline-block',
      padding: '5px 10px',
      marginRight: '10px',
      backgroundColor: '#e0e0e0',
      borderRadius: '15px',
      fontSize: '14px',
      color: '#555'
    },
    deleteProfileButton: {
      display: 'block',
      width: '100%',
      padding: '10px',
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    deleteProfileButtonHover: {
      backgroundColor: '#d32f2f'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Staff Notes</h1>
      
      <div style={styles.addNoteSection}>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="+ Add Note"
          style={styles.noteInput}
        />
        <button 
          onClick={handleAddNote} 
          style={styles.addButton}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.addButtonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.addButton.backgroundColor}
        >
          Add
        </button>
      </div>
      
      <div style={styles.notesList}>
        {notes.map(note => (
          <div key={note.id} style={styles.noteItem}>
            <div style={styles.noteDate}>{note.date}</div>
            <div style={styles.noteContent}>{note.content}</div>
            <button 
              onClick={() => handleDeleteNote(note.id)} 
              style={styles.deleteButton}
              onMouseOver={(e) => e.currentTarget.style.color = styles.deleteButtonHover.color}
              onMouseOut={(e) => e.currentTarget.style.color = styles.deleteButton.color}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      <div style={styles.tagsSection}>
        <span style={styles.tag}>Front Desk</span>
        <span style={styles.tag}>Housekeeping</span>
      </div>
      
      <button 
        style={styles.deleteProfileButton}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.deleteProfileButtonHover.backgroundColor}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.deleteProfileButton.backgroundColor}
      >
        Delete Profile
      </button>
    </div>
  );
};

export default StaffNotes;