import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone'
import RenderField from './Form/RenderField';
import FormHeader from './Form/FormHeader';
import axios from 'axios';
import validator from 'validator';
import izitoast from 'izitoast';
import tools from '../utils/tools.js';

class SignUp extends Component {   
    constructor(props) {
        super(props);
        const initData = {
            "firstname": null,
            "lastname": null,
            "username": null,
            "email": null,
            "password": null
        };

        this.state = {
            files: null 
        }

        this.props.initialize(initData);
    }

    onDrop(files) {
        let message;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('filename', files[0].name);
        axios.post('http://localhost:8080/api/verification/upload', data)
            .catch((err) => {
                if (err) {
                    switch (err.response.status) {
                        case 404 :
                            message = 'Upload file is invalid';
                            break;
                        case 500:
                            message = 'Oops, something went wrong!';
                            break;
                        default: 
                            break;
                    }
                    izitoast.error({
                        message: message,
                        position: 'topRight'
                    });
                }
            })
            .then((res) => {
                if (res) {
                    this.setState({
                        files: res.data
                    });
                    izitoast.success({
                        message: 'Your picture is valid',
                        position: 'topRight'
                    });
                }
            })
    }

    onSubmit(values) {
        var data = { values: values,
                     path: this.state.files}
        let message;
        axios.post('http://localhost:8080/api/users', data)
        .catch((err) => {
            switch (err.response.status) {
                case 409 :
                    message = 'Invalid username or email';
                    break;
                case 500:
                    message = 'Your information is invalid';
                    break;
                default: 
                    break;
            }
            izitoast.error({
                message: message,
                position: 'topRight'
            });
        }) 
        .then((res) => {
            if (res) {
                izitoast.success({
                    message: res.data.message,
                    position: 'topRight'
                });
            }
        })
    }

    render() {
        const { handleSubmit } = this.props;
        const { files } = this.state
        var path;
       
        const dropzoneStyle = {
            width: 110,
            height: 100,
            borderRadius: 20,
            border: "none",
            position: "relative"
          };

        if (files != null)
            path = files;
        else 
            path = require('../assets/img/photo2.jpg');

        return (
            <div className="card__side card__side--back">
                <FormHeader 
                    heading1 = "You want to see our film's selection"
                    heading2 = "sign up now"
                />
                <div className="card__form">
                <div className="card__form--picture">
                    <div className="card__form--picture-block">
                        <img className="card__form--picture-block-img" src={path} alt="img"/>
                        <Dropzone multiple={false} 
                        accept="image/*" 
                        onDrop={this.onDrop.bind(this)} 
                        style={dropzoneStyle}
                        >
                        <p className="card__form--picture-block-text">Please select a picture</p>
                        </Dropzone>
                    </div>
                </div>
                    <form className="card__form--input" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field
                            label="Firstname"
                            name="firstname"
                            type="text"
                            component= {RenderField}
                            placeholder=""
                        />
                        <Field
                            label="Lastname"
                            name="lastname"
                            type="text"
                            component= {RenderField}
                            placeholder=""
                        />
                        <Field
                            label="Username"
                            name="username"
                            type="text"
                            component= {RenderField}
                            placeholder=""
                        />
                        <Field
                            label="Email"
                            name="email"
                            type="email"
                            component= {RenderField}
                            placeholder=""
                        />
                        <Field
                            label="Password"
                            name="password"
                            type="password"
                            placeholder=""
                            component={RenderField}
                        />
                        <button type="submit" className="btn btn-primary btn-primary--pink">Sign Up</button>
                    </form>
                </div>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    if (!values.firstname) {
        errors.firstname = "Please enter your firstname"
    } else if (!validator.isByteLength(values.firstname, { min : 1, max : 30 })) {
        errors.firstname = "Your firstname is too short or too long"
    } else if (!validator.isAlpha(values.firstname)) {
        errors.firstname = "Your firstname must contain only alphabetic characters"
    }

    if (!values.lastname) {
        errors.lastname = "Please enter your lastname"
    } else if (!validator.isByteLength(values.lastname, { min : 1, max : 30 })) {
        errors.lastname = "Your lastname is too short or too long"
    } else if (!validator.isAlpha(values.lastname)) {
        errors.lastname = "Your lastname must contain only alphabetic characters"
    }

    if (!values.username) {
        errors.username = "Please enter your username"
    } else if (!validator.isByteLength(values.username, { min : 1, max : 30 })) {
        errors.username = "Your username is too short or too long"
    } else if (!validator.isAlphanumeric(values.username)) {
        errors.username = "Your username must contain only alphanumeric characters"
    }

    if (!values.email) {
        errors.email = "Please enter your email"
    } else if (!validator.isEmail(values.email, { allow_display_name: false, require_display_name: false, allow_utf8_local_part: true, require_tld: true, allow_ip_domain: false, domain_specific_validation: false })) {
        errors.email = "Please enter a valid email address"
    }

    if (!values.password) {
        errors.password = "Please enter your password"
    } else if (!tools.isPassword(values.password)) {
        errors.password = "Your password must contain at least 6 character, a capital letter and a number"
    }
    return errors;
}

const reduxFormSignUp = reduxForm({
    validate,
    form: 'signup'
})(SignUp);

export default reduxFormSignUp;