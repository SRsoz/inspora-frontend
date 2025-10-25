import './App.css';
import Form from './components/Form'; // importera din Form-komponent

function App() {
  return (
    <div>
      {/* Visa Sign In-formuläret */}
      <Form mode="signin" />

      {/* Om du vill testa Sign Up-formuläret istället, byt mode:
      <Form mode="signup" /> 
      */}
    </div>
  );
}

export default App;
