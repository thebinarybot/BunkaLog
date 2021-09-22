import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Progress,
  Row, Col,
} from 'reactstrap';
import Cookies from 'js-cookie';
import axios from 'axios';
import config from '../config.js';


/**
 * Defines the card component used to display each course's attendance stats
 */
class AttendanceCard extends React.Component {
  /**
   * @param {Props} props Course details are passed as props during creation
   */
  constructor(props) {
    super(props);
    this.state = {
      courseName: props.courseName,
      courseCode: props.courseCode,
      attendClass: props.classesAttended,
      totalClasses: props.totalClasses,
    };
  }


  /**
   * This function is used to notify the API server to update the attendance
   *    data of the course when an user clicks "Attend Class" button.
   */
  attendClass() {
    console.log('Function Call: AttendanceCard.js: attendClass()');

    const requestOptions = {
      method: 'POST',
      params: {'session_id': Cookies.get('bunkalog_session_id')},
      url: config.PROXY_URL + '/attend-class',
      data: {
        courseCode: this.state.courseCode,
      },
    };

    axios(requestOptions)
        .then( (response) => {
          axios.get(config.PROXY_URL + '/user/course',
              {params: {
                'session_id': Cookies.get('bunkalog_session_id'),
                'courseCode': this.state.courseCode,
              }})
              .then( (response) => {
                const resp = response.data;
                // console.log(resp);
                this.setState(
                    {
                      attendClass: resp['classesAttended'],
                      totalClasses: resp['totalClasses'],
                    },
                );
              })
              .catch( (error) => {
                console.log(error);
              });
        })
        .catch( (error) => {
          console.log(error);
        });
  }


  /**
   * This function is used to notify the API server to update the attendance
   *    data of the course when an user clicks "Bunk Class" button.
   */
  bunkClass() {
    console.log('Function Call: AttendanceCard.js: bunkClass()');

    const requestOptions = {
      method: 'POST',
      params: {'session_id': Cookies.get('bunkalog_session_id')},
      url: config.PROXY_URL + '/bunk-class',
      data: {
        courseCode: this.state.courseCode,
      },
    };

    axios(requestOptions)
        .then( (response) => {
          axios.get(config.PROXY_URL + '/user/course',
              {params: {
                'session_id': Cookies.get('bunkalog_session_id'),
                'courseCode': this.state.courseCode,
              }})
              .then( (response) => {
                const resp = response.data;
                // console.log(resp);
                this.setState(
                    {
                      attendClass: resp['classesAttended'],
                      totalClasses: resp['totalClasses'],
                    },
                );
              })
              .catch( (error) => {
                console.log(error);
              });
        })
        .catch( (error) => {
          console.log(error);
        });
  }


  /**
   * @return {string} AttendanceCard's HTML
   */
  render() {
    console.log('Function Call: AttendanceCard.js: render()');

    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h5">{this.state.courseName}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {this.state.courseCode}
            </CardSubtitle>
            <CardText>
              Attended {this.state.attendClass} out of
              {this.state.totalClasses} classes
            </CardText>
          </CardBody>
          <CardBody>
            <Progress multi >
              <Progress bar
                value={this.state.attendClass} max={this.state.totalClasses} />
              <Progress bar
                value={this.state.totalClasses - this.state.attendClass}
                color="danger" max={this.state.totalClasses} />
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

AttendanceCard.propTypes = {
  courseName: PropTypes.string,
  courseCode: PropTypes.string.isRequired,
  classesAttended: PropTypes.any,
  totalClasses: PropTypes.any,
};

export default AttendanceCard;
