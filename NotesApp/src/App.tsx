import "bootstrap/dist/css/bootstrap-grid.min.css";
import { Routes , Route, Navigate} from "react-router-dom";
import { Container } from "react-bootstrap";
import { NewNote } from "./Screens/NewNote";

//Container is from bootstrap. We are using it to style the top of the page
function App() {
  return (
    <Container className="my-4">
        <Routes>
          <Route path="/" element={<h1>Home</h1>}/>
          <Route path="/new" element={<NewNote />}/>
          <Route path="/:id">
            <Route index element={<h1>Show</h1>} />
            <Route path="edit" element={<h1>Edit</h1>}/>
          </Route>


          {/**If a user goes to a page that does not exist, navigate them back to the home page */}
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
    </Container>
  )
}

export default App
