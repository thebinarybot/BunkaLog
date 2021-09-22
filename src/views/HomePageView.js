import React from 'react';
import AttendanceCard from '../components/AttendanceCard.js';

import axios from 'axios';
import config from '../config.js';
import Cookies from 'js-cookie';

import {Row, Col} from 'reactstrap';


/**
 * The default layout shown when a user is logged in. Displays all attendance
 * cards.
 */
class HomePageView extends React.Component {
  /**
   * @param {Props} props No props expected
   */
  constructor(props) {
    super(props);
    this.state = {
      data: {
        'data': [],
      },
    };
  }


  /**
   * Used to fetch all attendance data of a user from API server when component
   * is mounted
   */
  componentDidMount() {
    // console.log(Cookies.get('bunkalog_session_id'));
    console.log('Function Call: HomePageView.js: componentDidMount()');

    axios.get(config.PROXY_URL + '/user',
        {params: {'session_id': Cookies.get('bunkalog_session_id')}})
        .then( (response) => {
          this.setState({data: response});
        })
        .catch( (error) => {
          console.log(error);
        });
  }


  /**
   * @return {string} HomePageView's HTML
   */
  render() {
    console.log('Function Call: HomePageView.js: render()');

    const renderData = this.state.data['data'];
    const cards = renderData.map(function(course, index) {
      return (
        <Col key={index}>
          <AttendanceCard courseName={course['courseName']}
            courseCode={course['courseCode']}
            classesAttended={course['classesAttended']}
            totalClasses={course['totalClasses']} />
        </Col>
      );
    });

    return (
      <div className="App">
        <Row sm="3">
          {cards}
        </Row>
      </div>
    );
  }
}

export default HomePageView;
