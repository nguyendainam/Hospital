import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '0',
        }

    }


    componentDidMount() {
        let user = this.props.currentUser

        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phonenumber: user.phoneNumber,
                gender: user.gender,

            })
        }
    }

    toggle = () => {
        this.props.toggleUserModal()
    }

    /// truyen tham so nhap vao luu trong mang
    handleOnChangeInput = (event, id) => {

        let coppyState = { ...this.state };
        coppyState[id] = event.target.value

        this.setState({
            ...coppyState
        })

    }

    handleSaveUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {

            console.log('check props', this.props)
            //truyen du lieu ve lai ham
            this.props.editUser(this.state)

        }

    }


    // kiem tra input co bi bo trong khong
    checkValideInput = () => {
        let isValid = true
        let arrInput = ['email', 'firstName', 'lastName']
        for (let i = 0; i < arrInput.length; i++) {
            console.log(this.state[arrInput[i]])
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }

        }
        return true;
    }


    render() {
        return (


            <div className="center" >
                <Modal
                    centered
                    size='lg'
                    isOpen={
                        this.props.isOpen}
                    toggle={() => this.toggle()}
                    className={'AddnewUserModal'}>

                    <ModalHeader className='headermodal' toggle={() => this.toggle()} >
                        Edit a user
                    </ModalHeader>
                    <ModalBody>
                        <div className='container'>
                            <form>
                                <div className="form-row">
                                    <div className='row'>
                                        <div className="form-group col-md-6">
                                            <label for="inputEmail4">Email</label>
                                            <input type="email"
                                                readOnly='true'
                                                className="form-control"
                                                name="email"
                                                placeholder="Email"
                                                onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                                value={this.state.email}
                                            />
                                        </div>
                                        {/* <div className="form-group col-md-6">
                                            <label for="inputPassword4">Password</label>
                                            <input type="password"
                                                className="form-control"
                                                name="password"
                                                placeholder="Password"
                                                onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                                value={this.state.password}
                                            />
                                        </div> */}

                                    </div>

                                    <div className='row'>
                                        <div className="form-group col-md-6">
                                            <label for="inputEmail4">FirstName</label>
                                            <input type="text"
                                                className="form-control"
                                                name="firstName"
                                                onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                                value={this.state.firstName}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="inputPassword4">LastName</label>
                                            <input type="text"
                                                className="form-control"
                                                name="lastName"
                                                onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                                                value={this.state.lastName}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-group col-md-6">
                                        <label for="inputEmail4">Address</label>
                                        <input type="text"
                                            className="form-control"
                                            name="address"
                                            onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                            value={this.state.address}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label for="inputPassword4">PhoneNumber</label>
                                        <input type="number"
                                            className="form-control"
                                            name="phonenumber"
                                            onChange={(event) => { this.handleOnChangeInput(event, "phonenumber") }}
                                            value={this.state.phonenumber}
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-row">

                                        <div className="form-group col-md-4">
                                            <label for="inputState">Sex</label>
                                            <select

                                                name="gender"
                                                className="form-control"
                                                onChange={(event) => { this.handleOnChangeInput(event, "gender") }}
                                                value={this.state.gender}
                                            >

                                                <option value={0}>Male</option>
                                                <option value={1}>FeMale</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>


                            </form>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleSaveUser()}>
                            Save
                        </Button>{' '}
                        <Button color="secondary" onClick={() => this.toggle()}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
