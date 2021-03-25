import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar.js';
import AttendanceCard from './components/AttendanceCard.js';
import { Row, Col } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Row>
        <Col>
          <AttendanceCard courseName="Game Theory" courseCode="15XT81"
            classesAttended="21" totalClasses="24" />
        </Col>
        <Col>
          <AttendanceCard courseName="Parallel & Distributed Computing" courseCode="15XT82"
            classesAttended="13" totalClasses="14" />
        </Col>
      </Row>
    </div>
  );
}

export default App;
