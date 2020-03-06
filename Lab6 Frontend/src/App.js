import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Input } from 'reactstrap';
const api = 'http://localhost:8000/api/students/'

const App = () => {
  const [students, setStudents] = useState([])
  const [student, setStudent] = useState({
    id: '',
    name: '',
    surname: '',
    major: '',
    GPA: 0
  })


  const getStudents = async () => {
    const result = await axios.get(`${api}`)
    setStudents(result.data)
  }

  const getStudent = async (id) => {
    const result = await axios.get(`${api}${id}`)
    setStudent(result.data)
    console.log(student)
  }

  const addStudent = async () => {
    const result = await axios.post(`${api}`, student)
    console.log(result.data)
    getStudents()
  }

  const deleteStudent = async (id) => {
    const result = await axios.delete(`${api}${id}`)
    console.log(result.data)
    getStudents()
  }

  const updateStudent = async (id) => {
    const result = await axios.put(`${api}${id}`, student)
    console.log('student id update: ', result.data)
    getStudents()
  }


  const printStudents = () => {
    if (students && students.length)
      return (
        <div>{
          (students.map((student, index) =>
            (<div key={index}>
              <ul>STUDENT : {index + 1}</ul>
              <ul>ID: {student.id}</ul>
              <ul>NAME: {student.name}</ul>
              <ul>SURNAME: {student.surname}</ul>
              <ul>MAJOR: {student.Major}</ul>
              <ul>GPA: {student.GPA}</ul>

              <Button style={{ marginLeft: 10 }} onClick={() => deleteStudent(index.id)}> Delete </Button>
              <Button style={{ marginLeft: 10 }} onClick={() => getStudent(student.id)}>Get</Button>
              <Button style={{ marginLeft: 10 }} onClick={() => updateStudent(student.id)}>Update</Button>
            </div>)
          ))}
        </div>
      )
    else {
      return (<h2>No students</h2>)
    }
  }


  useEffect(() => {
    getStudents()
  }, [])


  return (
    <div >
      <h2>Students</h2>
      <ul>{printStudents()}</ul>


      <h2>Add student</h2>
      ID:<Input type="text" style={{ width: '20%' }} value={student.id} onChange={(e) => setStudent({ ...student, id: e.target.value })} />  <br />
      Name:<Input type="text" style={{ width: '20%' }} value={student.name} onChange={(e) => setStudent({ ...student, name: e.target.value })} /> <br />
      Surname:<Input type="text" style={{ width: '20%' }} value={student.surname} onChange={(e) => setStudent({ ...student, surname: e.target.value })} /> <br />
      Major:<Input type="text" style={{ width: '20%' }} value={student.Major} onChange={(e) => setStudent({ ...student, Major: e.target.value })} /> <br />
      GPA:<Input type="text" style={{ width: '20%' }} value={student.GPA} onChange={(e) => setStudent({ ...student, GPA: e.target.value })} /> <br />
      <Button onClick={() => addStudent()}>Add new student</Button>
    </div>
  )
}

export default App