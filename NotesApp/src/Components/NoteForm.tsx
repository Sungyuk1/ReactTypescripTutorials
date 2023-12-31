import { Form, Stack, Row, Col } from "react-bootstrap"
import CreatableReactSelect from "react-select/creatable"  //createable lets you create tags

//Form and Stack are coming from bootstrap
//Stack gap automatically stacks out the elements vertically with a gap of the given number
//Using React Select to make our select component. Saves us time
export function NoteForm(){
    return(
        <Form>
            <Stack gap={4}>
                <Row>
                    <Col>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control required/>
                    </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect isMulti/>
                        </Form.Group>
                    </Col>
                </Row>
            </Stack>
        </Form>
    )
}