import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { GiBookshelf } from 'react-icons/gi';
import { Link } from 'react-router-dom';

function AppBar() {
    return ( 
        <div>
        <Navbar id='navi' variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">< GiBookshelf/> UOB Library</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#"><Link to="/" id='link'>Home</Link> </Nav.Link>
              <Nav.Link href="#"><Link to="/books" id='link'>Books</Link> </Nav.Link>
              <Nav.Link href="#link">Student</Nav.Link>
              <Nav.Link href="#link">Librarian</Nav.Link>
              
              <NavDropdown title="Book" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Insert </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
     );
}

export default AppBar;