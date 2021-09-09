import React from 'react';
import config from '../config.js';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddClass extends React.Component {
  render() {
  var formUrl = config.PROXY_URL + '/add-class';
  return (
    <Form action = {formUrl} >

      <FormGroup>
        <Label for="courseName">Course Name</Label>
        <Input type="text" name="courseName" id="courseName" />
      </FormGroup>

      <FormGroup>
        <Label for="courseCode">Course Code</Label>
        <Input type="text" name="courseCode" id="courseCode" />
      </FormGroup>

      <FormGroup>
        <Label for="classesAttended">Classes Attended</Label>
        <Input type="number" name="classesAttended" id="classesAttended" />
      </FormGroup>

      <FormGroup>
        <Label for="totalClasses">Total Classes</Label>
        <Input type="number" name="totalClasses" id="totalClasses" />
      </FormGroup>

      <Button type="Submit">
        Add Class
      </Button>
    </Form>
  );
  }
}

export default AddClass;
