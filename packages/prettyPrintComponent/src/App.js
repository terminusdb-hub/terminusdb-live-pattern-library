import "./styles.css";

export default function App() {

  const PrettyPrintJson = ({data}) => (<div>
    <pre>
      {JSON.stringify(data, null, 2) }
    </pre>
  </div>
  )


  const json = { Name: "Kitty", Age: "Baby"}

  return <PrettyPrintJson data={ json } />
}
