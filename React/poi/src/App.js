import 'bootstrap/dist/css/bootstrap.min.css';

import logo from './logo.svg';
import './App.css';
import  Button  from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function App() {
  return (
    <div className="App">
      <button> Click Me</button>
      <button> Hello </button><br></br>
      <Button> bootstrap </Button>
      <Button variant="flat" size="xxl">
        flat button
      </Button>

      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>

    </div>
  );
}

export default App;
