import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Progress,
  Row, Col
} from 'reactstrap';

const AttendanceCard = (props) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">{props.courseName}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{props.courseCode}</CardSubtitle>
          <CardText>Attended {props.classesAttended} out of {props.totalClasses} classes</CardText>
        </CardBody>
        <CardBody>
          <Progress multi >
            <Progress bar value={props.classesAttended} max={props.totalClasses} />
            <Progress bar value={props.totalClasses - props.classesAttended}
              color="danger" max={props.totalClasses} />
          </Progress>
        </CardBody>
        <CardBody>
          <Row>
            <Col><Button>Attend Next Class</Button></Col>
            <Col><Button>Bunk Next Class</Button></Col>
            <Col><Button>Class Cancelled</Button></Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default AttendanceCard;
