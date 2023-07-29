import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './../../styles/RegistrationForm.css';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/');
    }

    return (
        <>
            <Container className='RegistrationForm'>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type="text" placeholder="Enter Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formUserName">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control required type="text" placeholder="Enter UserName" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control required type="email" placeholder="Enter Email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAccountType">
                    <Form.Label>Account Type</Form.Label>
                    <Form.Control required type="text" placeholder="Select Account Type" />
                </Form.Group>

                <Button variant="primary" type="submit" >
                    Submit
                </Button>
                </Form>
            </Container>
        </>
    );
}

export default RegistrationForm;