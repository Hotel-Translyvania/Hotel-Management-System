import React, { useState } from 'react';

const StaffNotes = () => {
  const styles = {
    container: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      maxWidth: '100%',
      margin: '0 auto',
      fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
      marginTop: '24px',
    },
    header: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#2d3436',
      marginBottom: '24px',
      paddingBottom: '12px',
      borderBottom: '1px solid #f0f0f0'
    },
    addNoteSection: {
      display: 'flex',
      gap: '12px',
      marginBottom: '24px'
    },
    noteInput: {
      flex: 1,
      padding: '12px 16px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      minHeight: '80px',
      resize: 'vertical',
      fontSize: '14px',
      transition: 'border 0.2s ease',
      ':focus': {
        outline: 'none',
        borderColor: '#0984e3',
        boxShadow: '0 0 0 2px rgba(9, 132, 227, 0.1)'
      }
    },
    addButton: {
      padding: '0 20px',
      backgroundColor: '#0984e3',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '14px',
      height: '44px',
      alignSelf: 'flex-end',
      transition: 'all 0.2s ease'
    },
    addButtonHover: {
      backgroundColor: '#0873c4'
    },
    notesList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      marginBottom: '24px'
    },
    noteItem: {
      position: 'relative',
      padding: '16px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      borderLeft: '4px solid #0984e3',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)'
    },
    noteDate: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#636e72',
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    noteContent: {
      fontSize: '14px',
      lineHeight: '1.5',
      color: '#2d3436'
    },
    deleteButton: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      background: 'none',
      border: 'none',
      color: '#b2bec3',
      cursor: 'pointer',
      fontSize: '18px',
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
      transition: 'all 0.2s ease'
    },
    deleteButtonHover: {
      color: '#ff7675',
      backgroundColor: 'rgba(255, 118, 117, 0.1)'
    },
    tagsSection: {
      display: 'flex',
      gap: '8px',
      marginBottom: '24px',
      flexWrap: 'wrap'
    },
    tag: {
      padding: '6px 12px',
      backgroundColor: '#e0e0e0',
      borderRadius: '16px',
      fontSize: '12px',
      fontWeight: '600',
      color: '#636e72'
    },
    deleteProfileButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#ff7675',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '14px',
      transition: 'all 0.2s ease'
    },
    deleteProfileButtonHover: {
      backgroundColor: '#e84343'
    }
  };
  
  
  const applyHoverStyles = (element, hoverStyles) => {
    const originalStyles = {};
    
    Object.keys(hoverStyles).forEach(key => {
      originalStyles[key] = element.style[key];
      element.style[key] = hoverStyles[key];
    });
  
    return {
      onMouseLeave: () => {
        Object.keys(originalStyles).forEach(key => {
          element.style[key] = originalStyles[key];
        });
      }
    };
  };
  const [notes, setNotes] = useState([
    { id: 1, date: 'Sept 15,2023', content: 'VIP guest - Prefers room service breakfast between 7-8 AM' },
    { id: 2, date: 'Sept 14,2023', content: 'Allergic to feather pillows - Replaced with hypoallergenic' }
  ]);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = async () => {
    if (newNote.trim()) {
      const today = new Date();
      const month = today.toLocaleString('default', { month: 'short' });
      const dateStr = `${month} ${today.getDate()},${today.getFullYear()}`;
      
      setNotes([{ id: notes.length + 1, date: dateStr, content: newNote }, ...notes]);
      // try {
      //   const response = await fetch("https://your-api-url.com/notes", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "Authorization": `Bearer ${token}` // Uncomment if you need to send a token
      //     },
      //     body: JSON.stringify(newNoteObj),
      //   });
  
      //   if (!response.ok) throw new Error("Failed to add note");
  
      //   const savedNote = await response.json();
        
      //   setNotes([savedNote, ...notes]);
      //   setNewNote('');
      // } catch (error) {
      //   console.error("Error adding note:", error);
      // }
      setNewNote('');


    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
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