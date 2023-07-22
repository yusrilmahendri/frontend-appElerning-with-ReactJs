import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataSend = {
            email,
            password
        };
        if (email === '' || password === '') {
            Swal.fire("Failed", "Login Gagal", "error");
        } else {
            fetch(`${process.env.REACT_APP_API}api/authenticatedAdmin`, {
                method: 'POST', 
                body: JSON.stringify(dataSend),
                headers: {
                    'Content-Type':'application/json'
                }
            })
            .then(res => res.json())
            .then(result => {
                console.log("Response Data:", result); // Log the response data
                if (result && result.token) {
                    localStorage.setItem('dataLoginAdmin', result.token);
                    history.push('list-videoAdmin');
                } else {
                    Swal.fire("Failed", "Invalid email or password", "error");
                }
            })
            .catch(error => {
                Swal.fire("error this your data", "has error", "error");
                console.error('Error:', error);
            });
        }
    };
    

    return (
        <>
            <div className="container image-bg">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3> Login Admin</h3>
                            <div className="d-flex justify-content-end social-icon">
                                <span>
                                    <i className="fab fa-facebook-square"></i>
                                    <i className="fab fa-google-plus-square"></i>
                                    <i className="fab fa-twitter-square"></i>
                                </span>
                            </div>
                        </div>

                        <div className="card-body">
                            <form>
                                <div className="input-group form-group">
                                    <div className="input-group prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-key"></i>
                                        </span>
                                         <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="username"/>
                                    </div>
                                </div>

                                <div className="input-group form-group">
                                    <div className="input-group prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-user"></i>
                                        </span>
                                        <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="password"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <button onClick={(e) => handleSubmit(e)} className="btn btn-outline-info login-btn">LOGIN</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;