import axios from "axios";
import { useEffect,useState, useRef } from "react";
function ReturnBooks() {

    let [books,setBooks] = useState([])
    let [title,setTitle] = useState("")

    let studentRef = useRef();
    let loanRef = useRef();
    let bookRef = useRef();
    let returnRef = useRef();


    const doSearch=()=>{
        let url = "http://localhost:8081/api/v1/services/search/book/book_id/"+bookRef.current.value
        axios.get(url).then(response =>{
            console.log(response.data)
            setTitle(response.data.title)
            setBooks(response.data)
            
        }).catch((err)=>{
            console.log(err);
            alert(err.message)
        })

    }
    const doReturn=()=>{
        let url = "http://localhost:8081/api/v1/services/return/loan/loanId/"+loanRef.current.value+"/studentId/"+studentRef.current.value+"/bookId/"+bookRef.current.value
        let data = {
            date_returned: returnRef.current.value
        }
        axios.post(url,data).then(response =>{
            console.log(response.data)
            
        }).catch((err)=>{
            console.log(err);
            alert(err.message)
        })

    }

  return (
    <div className="container" id="return">
      <h1 className="text-center">Return Book</h1>
      <br />
      <label>Book Id</label>
      <div className="row">
        <div className="col-md-2">
          <input className="form-control" type="number" placeholder="Book Id" ref={bookRef}/>
          <br />
        </div>

        <div className="col-md-7">
          <button className="btn btn-warning" onClick={()=>doSearch()}>Search book</button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label>Book title</label>
          <input
            className="form-control"
            type="text"
            placeholder="Book title"
            value={title}
          />
        </div>
      </div>
      <br/>
      <div className="row">
        <div className="col-md-3">
          <label>Student Id</label>
          <input
            className="form-control"
            type="number"
            placeholder="Student Id"
            ref={studentRef}
          />
        </div>
        <div className="col-md-3">
          <label>Loan Id</label>
          <input
            className="form-control"
            type="number"
            placeholder="Loand Id"
            ref={loanRef}
          />
        </div>
        <div className="col-md-3">
          <label>Return Date</label>
          <input
            className="form-control"
            type="date"
            ref={returnRef}
          />
        </div>
      </div>
      <br />
      <button className="btn btn-primary" onClick={()=>doReturn()}>Submit</button>
    </div>
  );
}

export default ReturnBooks;
