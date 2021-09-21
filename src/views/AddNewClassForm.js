import React from 'react';
import config from '../config.js';
import axios from 'axios';
import Cookies from 'js-cookie';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {Redirect} from 'react-router-dom';


/**
 * The layout shown when user wants to add a new course to track.
 * Form implemented as a controlled component.
 */
class AddClass extends React.Component {
  /**
   * @param {Props} props No props are expected
   */
  constructor(props) {
    super(props);
    this.state = {
      courseName: '',
      courseCode: '',
      classesAttended: 0,
      totalClasses: 0,
      formSubmittedSuccessfully: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  /**
   * Called when input is recieved on form's fields
   * @param {Object} event Contains details on what input event occured
   */
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  }


  /**
   * Called when submit button is clicked
   * @param {Object} event Contains details on what input event occured
   */
  handleSubmit(event) {
    const requestOptions = {
      method: 'POST',
      params: {'session_id': Cookies.get('bunkalog_session_id')},
      url: config.PROXY_URL + '/add-class',
      data: this.state,
    };

    axios(requestOptions)
        .then(function(response) {
          console.log(response);
          this.setState({formSubmittedSuccessfully: true});
        }.bind(this))
        .catch(function(error) {
          console.log(error);
        });

    event.preventDefault();
  }


  /**
   * @return {string} Form's HTML
   */
  render() {
    if (this.state.formSubmittedSuccessfully) {
      return (
        <Redirect to="" />
      );
    }

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
          <Input type="number" name="classesAttended"
            value={this.state.classesAttended}
            id="classesAttended" onChange={this.handleChange} />
        </FormGroup>

        <FormGroup>
          <Label for="totalClasses">Total Classes</Label>
          <Input type="number" name="totalClasses"
            value={this.state.totalClasses}
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
