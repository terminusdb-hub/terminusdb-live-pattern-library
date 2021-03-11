import React from 'react';
import PropTypes from 'prop-types';

const PrettyPrintComponent = ({ title = "Hello" }) => {
  /*return (
    <div>
      <h1 className="title">{title}</h1>
      <div>World</div>
    </div>
); */


  const PrettyPrintJson = ({data}) => (<div>
    <pre>
      {JSON.stringify(data, null, 2) }
    </pre>
  </div>
  )


  const json = { Name: "Kitty", Age: "Baby"}

  return <PrettyPrintJson data={ json } />
}

PrettyPrintComponent.propTypes = {
  title: PropTypes.string.isRequired
}

export default PrettyPrintComponent;
