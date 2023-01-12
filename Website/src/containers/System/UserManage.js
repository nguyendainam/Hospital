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
        return (
            <div className="container ">


                <div className='title text-center'>Wellcome </div>


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
