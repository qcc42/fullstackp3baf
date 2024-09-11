const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Person app, inspired by Note app created by Department of Computer Science, University of Helsinki 2023</em>
    </div>
  )
}

export default Footer