import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const AddClass = (props) => {
  return (
    <Form action="http://192.168.86.129:5000/add-class">

      <FormGroup>
        <Label for="courseName">Course Name</Label>
        <Input type="text" name="courseName" id="courseName" />
      </FormGroup>

      <FormGroup>
        <Label for="courseCode">Course Code</Label>
        <Input type="text" name="courseCode" id="courseCode" />
      </FormGroup>
      
      <Button>
        Add Class
      </Button>
    </Form>
  );
}

export default AddClass;
