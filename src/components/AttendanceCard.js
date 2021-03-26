import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Progress,
  Row, Col
} from 'reactstrap';
import axios from 'axios';

class AttendanceCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.courseCode,
      loadData: props.reloadData,
    };
  }

  attendClass() {
    var url = "http://192.168.86.129:5000/attend-class?courseCode=" + this.state.name;
    axios.get(url)
        .then( (response) => {
          this.state.loadData();
        })
        .catch( (error) => {
            console.log(error);
        })
  }

  bunkClass() {
    var url = "http://192.168.86.129:5000/bunk-class?courseCode=" + this.state.name;
    axios.get(url)
        .then( (response) => {
          this.state.loadData();
        })
        .catch( (error) => {
            console.log(error);
        })
  }

  render(props) {
  this.state.name = this.props.courseCode;
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">{this.props.courseName}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{this.props.courseCode}</CardSubtitle>
          <CardText>Attended {this.props.classesAttended} out of {this.props.totalClasses} classes</CardText>
        </CardBody>
        <CardBody>
          <Progress multi >
            <Progress bar value={this.props.classesAttended} max={this.props.totalClasses} />
            <Progress bar value={this.props.totalClasses - this.props.classesAttended}
              color="danger" max={this.props.totalClasses} />
          </Progress>
        </CardBody>
        <CardBody>
          <Row>
            <Col>
              <Button onClick={() => this.attendClass() }>
                Attend Next Class
              </Button>
            </Col>
            <Col>
              <Button onClick={ () => this.bunkClass() }>
                Bunk Next Class
              </Button>
            </Col>
            <Col><Button>Class Cancelled</Button></Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
  }
};

export default AttendanceCard;
