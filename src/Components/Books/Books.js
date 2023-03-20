import {Navbar,NavItem,NavDropdown,MenuItem,Nav,Container} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Modal } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

import { useEffect, useState, useRef } from "react";


function Books() {
    let [books, setBooks] = useState([]);
    let [title, setTitle] = useState("");
    let [borrow, setBorrowed] = useState("");
    let [due, setDue] = useState("");
    let [id, setId] = useState(0);
    let [bookId, setBookId] = useState(0);

    let [show,setShow] = useState(false);
    let handleClose=()=>{setShow(false)}

    let borrowRef = useRef();
    let dueRef = useRef();
    let idRef = useRef();

    useEffect(() =>{
        let url = "http://localhost:8081/api/v1/services/books"
        axios.get(url).then(response => {
            console.log(response.data)
            setBooks(response.data)
            })
            .catch((err)=>{
                console.log(err);
            })
         
    },[])

    const getAll=()=>{
        let url = "http://localhost:8081/api/v1/services/books"

        axios.get(url)
        .then(response => {
        console.log(response.data)
        setBooks(response.data)

        })
        .catch((err)=>{
            console.log(err);
        })

    }

    const doSearch= (event) =>{
        // console.log(event.target.value)
        let title = event.target.value;
        setTitle(title)
        if(title.length > 2){
            let url = "http://localhost:8081/api/v1/services/search/book/book_title/" + title;
          
            axios.get(url).then(response => {
                console.log(response.data)
                setBooks(response.data)
        
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
        else if(title.length === 0){
          getAll();
        }
    }

    let loan = (books)=>{
        setTitle(books.title)
        setBookId(books.bookID)
        setShow(true)
    }


    const modal=()=>{
        return(
        <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Book Loan</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form.Label>Book Id</Form.Label>
                  <Form.Control
                    type="number"
                    value={bookId}
                  />
                <Form.Group>
                <Form.Label>Book Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                   
                  />
                  <Form.Label>Student Id</Form.Label>
                  <Form.Control
                    type="number"
                    ref={idRef}
                    required
                  />
      
                  <Form.Label>Date Borrowed</Form.Label>
                  <Form.Control
                    type="date"
                    ref={borrowRef}
                    required
                  />
      
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    ref={dueRef}
                    required
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} >
                  Close
                </Button>
                <Button variant="primary" onClick={doLoan} >
                  Loan
                </Button>
              </Modal.Footer>
            </Modal>
            )
      }

      const doLoan = () =>{
        let url = "http://localhost:8081/api/v1/services/add/loan/book_ID/"+bookId+"/student_ID/"+idRef.current.value

        let data = {
            dateBorrowed: borrowRef.current.value,
            date_due: dueRef.current.value,
            
        }

        axios.post(url,data)
        .then(response => {
            console.log(response.data)
            getAll()
            setShow(false)
        })
        .catch((err)=>{
            console.log(err);
            alert(err.message)
        })
      }


    return ( 
        <div className="container " id="dashboard">
            <input className="form-control" type="text" placeholder="Search book...." onChange={doSearch}/>

            {books.map((b,no)=>(
                <div key={no}>
                    <div className="card mt-5">
                        <div className="card-header"  >
                            <h5>{b.title}</h5>
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                            <h6>Author: {b.author}</h6>
                            <h6>Status: {b.status}</h6>
                            <h6>Genre: {b.categories}</h6>
                            
                            <h6>Synopsis: </h6>
                            <footer className="blockquote-footer">{b.synopsis}</footer>
                            </blockquote>
                            <button className="btn btn-primary" onClick={()=>{loan(b)}}>Loan this book</button>
                        </div>
                    </div>
                </div>
            ))}
            <div>
                {modal()}
            </div>
        </div>
     );
}

export default Books;
