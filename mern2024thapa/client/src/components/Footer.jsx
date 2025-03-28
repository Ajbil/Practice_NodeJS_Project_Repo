export const Footer = () => {
    return (
      <footer style={footerStyle}>
        <div style={containerStyle}>
          <p>&copy; 2024 Thapa Mern Website</p>
          <p>Address: 123 Main Street, Cityville</p>
          <p>Email: info@example.com</p>
        </div>
      </footer>
    );
  };

  const footerStyle = {
    backgroundColor: '#646cff',
    color: '#fff',
    padding: '10px',
    marginTop: '30px',
    textAlign: 'center',
  };
  
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

//   #646cff;