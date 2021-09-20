import React from 'react';
import AttendanceCard from '../components/AttendanceCard.js';

import axios from 'axios';
import config from '../config.js';
import Cookies from 'js-cookie';

import { Row, Col } from 'reactstrap';



class HomePageView extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      data: {
        "data": []
      },
    };
  }

  componentDidMount() {
    //console.log(Cookies.get('bunkalog_session_id'));
    console.log('Function Call: HomePageView.js: componentDidMount()');

    axios.get(config.PROXY_URL + '/user', {params: {'session_id': Cookies.get('bunkalog_session_id')}})
        .then( (response) => {
            this.setState({data: response});
        })
        .catch( (error) => {
            console.log(error);
        })
  }

  render()
  {
    console.log('Function Call: HomePageView.js: render()');

    var renderData = this.state.data["data"]
    var cards = renderData.map(function(course, index) {
      return (
        <Col>
          <AttendanceCard courseName={course["courseName"]}
            courseCode={course["courseCode"]}
            classesAttended={course["classesAttended"]}
            totalClasses={course["totalClasses"]} />
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
