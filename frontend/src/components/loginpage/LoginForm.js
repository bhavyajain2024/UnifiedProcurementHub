import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './../../styles/LoginForm.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LoginForm() {
    const navigate = useNavigate();
    const passwordChecker = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    // eslint-disable-next-line
    const emailChecker = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleSubmit = (event) => {

        event.preventDefault();
        event.stopPropagation();

        if(!passwordChecker.test(formData.password)) {
            setInvalid((Invalid)=> ({...Invalid, password: true}));
        
        }
        else{
            setInvalid((Invalid)=> ({...Invalid, password: false}));
        }


        if(!emailChecker.test(formData.email)) {
            setInvalid((Invalid)=> ({...Invalid, email: true}));
        }
        else{
            setInvalid((Invalid)=> ({...Invalid, email: false}));
        }
        
        if(passwordChecker.test(formData.password) && emailChecker.test(formData.email)) {
            navigate('/');
        }


    };

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [Invalid, setInvalid] = useState({
        email: false,
        password: false
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((formData)=>({...formData, [name]: value}));
    };

    return (
        <>
            <Container className='loginForm'>
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="mb-3" controlId="emailField">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            isInvalid={Invalid.email}
                            required 
                            name='email' 
                            type="email"
                            value={formData.email}
                            placeholder="Enter email"
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type='invalid'>
                            "Incorrect Email! Please type again."
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="passwordField" id='passwordGroup'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            isInvalid={Invalid.password}
                            required 
                            name='password' 
                            type="password"
                            value={formData.password}
                            minLength={8}
                            placeholder="Password"
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type='invalid'>
                            "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!"
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button variant="danger" type="reset" className='ms-2'>
                        Forgot Credentials?
                    </Button>
                </Form>
            </Container>
        </>
    );
}

export default LoginForm;