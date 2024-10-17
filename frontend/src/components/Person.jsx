const Person = ({id, name, number, onClick}) => {

    return (
    <li className='note' key={id}>
      {name}: {number} 
      <button name = {id} onClick = {(event) => onClick(event, id)}>
        DEL
      </button>
    </li>
  )
}

export default Person