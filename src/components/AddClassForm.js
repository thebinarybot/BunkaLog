import React from 'react';
import config from '../config.js';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddClass extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      courseName: '',
      courseCode: '',
      classesAttended: 0,
      totalClasses: 0,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event)
  {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event)
  {
    const requestOptions = {
      method: 'POST',
      params: {'session_id': Cookies.get('bunkalog_session_id')},
      url: config.PROXY_URL + '/add-class',
      data: this.state,
    }

    axios(requestOptions)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    event.preventDefault();
  }

  render() {
  var formUrl = config.PROXY_URL + '/add-class';
  return (
    <Form onSubmit={this.handleSubmit} >

      <FormGroup>
        <Label for="courseName">Course Name</Label>
        <Input type="text" name="courseName" value={this.state.courseName}
          id="courseName" onChange={this.handleChange} />
      </FormGroup>

      <FormGroup>
        <Label for="courseCode">Course Code</Label>
        <Input type="text" name="courseCode" value={this.state.courseCode}
          id="courseCode" onChange={this.handleChange} />
      </FormGroup>

      <FormGroup>
        <Label for="classesAttended">Classes Attended</Label>
        <Input type="number" name="classesAttended" value={this.state.classesAttended}
          id="classesAttended" onChange={this.handleChange} />
      </FormGroup>

      <FormGroup>
        <Label for="totalClasses">Total Classes</Label>
        <Input type="number" name="totalClasses" value={this.state.totalClasses}
          id="totalClasses" onChange={this.handleChange} />
      </FormGroup>

      <Button type="Submit">
        Add Class
      </Button>
    </Form>
  );
  }
}

export default AddClass;
