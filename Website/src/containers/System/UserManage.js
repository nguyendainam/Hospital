import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService, deleUserService, editUserService } from '../../services/userService'
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter'
import ModalEditUser from './ModalEditUser'
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenAddNewUser: false,
            isOpenEditUser: false,
            userEdit: {}

        }
    }

    async componentDidMount() {
        await this.getAllUserfromBackend()

    }

    getAllUserfromBackend = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
                isOpenAddNewUser: false

            })


        }

    }


    handleAddNewUser = () => {
        this.setState({
            isOpenAddNewUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenAddNewUser: !this.state.isOpenAddNewUser
        })
    }

    toggleEditUser = () => {
        this.setState({
            isOpenEditUser: !this.state.isOpenEditUser
        })
    }



    //  lay data tu ModelUser
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUserfromBackend()
                this.setState({
                    isOpenAddNewUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
            console.log("add user", response)
        } catch (error) {
            console.log(error)
        }

    }


    handleDeleteUser = async (user) => {
        console.log('click delete', user)
        try {
            let res = await deleUserService(user.id)
            if (res && res.errCode === 0) {
                await this.getAllUserfromBackend()
            } else {
                alert(res.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenEditUser: true,
            userEdit: user
        })
    }
    EditUser = async (user) => {
        try {
            let res = await editUserService(user)
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenEditUser: false
                })
                await this.getAllUserfromBackend()
            } else {
                this.setState({
                    isOpenEditUser: false

                })
                await this.getAllUserfromBackend()
            }

        } catch (e) {
            console.log(e)
        }


    }

    render() {
        console.log(this.state)
        let arrUsers = this.state.arrUsers
        return (
            <div className="container ">
                <ModalUser
                    isOpen={this.state.isOpenAddNewUser}
                    toggleUserModal={this.toggleUserModal}
                    createNewUser={this.createNewUser} />

                {this.state.isOpenEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenEditUser}
                        toggleUserModal={this.toggleEditUser}
                        currentUser={this.state.userEdit}
                        editUser={this.EditUser}
                    />}


                <div className='title text-center'>Wellcome </div>

                <div className='mt-3 px-5 pb-3'>
                    <button
                        onClick={() => this.handleAddNewUser()}
                        className='btn btn-outline-success px-4'>
                        <i className="fas fa-user-plus" />Add new user
                    </button>

                </div>
                <div className='table-container '>
                    <table className="table  mr-4   ">
                        <thead>
                            <tr>
                                <th className='w-20' scope="col">Email</th>
                                <th className='w-20' scope="col">FirstName</th>
                                <th className='w-20' scope="col">LastName</th>
                                <th className='w-20' scope="col">Address</th>
                                <th className='w-20' cope="col">Acction</th>
                            </tr>
                        </thead>
                        <tbody>


                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    // console.log("check map", item, index)
                                    return (
                                        <>
                                            <tr>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <button className='btn-edit' onClick={() => this.handleEditUser(item)}>
                                                        <i className="fas fa-pencil-alt" /> Edit</button>
                                                    <button className='btn-delete'
                                                        onClick={() => this.handleDeleteUser(item)}
                                                    > <i className="fas fa-user-times" /> Delete</button>
                                                </td>
                                            </tr>
                                        </>

                                    )
                                })
                            }


                        </tbody>
                    </table>

                </div>
            </div>

        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
