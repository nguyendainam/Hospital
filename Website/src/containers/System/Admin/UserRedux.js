import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService'
import { LANGUAGES, CRUD_ACTION, CommonUtils } from "../../../utils"
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import TableManageUser from './TableManageUser';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            UserEditId: '',
            action: ''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart()
    }

    componentDidUpdate(prevProps, pervState, snapShot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {

            let arrGender = this.props.genderRedux
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ''

            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {

            let arrPosition = this.props.positionRedux
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''

            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arr_role = this.props.roleRedux
            this.setState({
                roleArr: arr_role,
                role: arr_role && arr_role.length > 0 ? arr_role[0].keyMap : ''

            })
        }

        if (prevProps.ListUsers !== this.props.ListUsers) {

            let arrGender = this.props.genderRedux
            let arrPosition = this.props.positionRedux
            let arr_role = this.props.roleRedux


            this.setState({
                genderArr: [],
                positionArr: [],
                roleArr: [],
                previewImgUrl: '',
                isOpen: false,
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                role: arr_role && arr_role.length > 0 ? arr_role[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTION.CREATE,

            })
        }
    }

    handleOnchangeImage = async (event) => {
        let data_file = event.target.files
        let file = data_file[0]

        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            console.log("base64", base64)
            let ObjectURL = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: ObjectURL,
                avatar: base64
            })
        }
    }


    openPreviewImange = () => {

        if (this.state.previewImgUrl === '') return
        this.setState({
            isOpen: true
        })
    }



    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']

        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                alert('This input not emty ' + arrCheck[i])
                break;
            }
        }
        return isValid


    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return

        let action = this.state.action

        if (action === CRUD_ACTION.CREATE) {

            //CREATE NEW USER
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar

            })
        } if (action === CRUD_ACTION.EDIT) {
            // Edit User
            this.props.editAUserRedux({
                id: this.state.UserEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar

            })


        }

        ///redux action



        this.props.fetchUserRedux()

    }




    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value

        this.setState({
            ...copyState
        })

        // email: '',
        // password: '',
        // firstName: '',
        // lastName: '',
        // phoneNumber: '',
        // address: '',
        // gender: '',
        // position: '',
        // role: '',
        // avatar: '',
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = ''
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            action: CRUD_ACTION.EDIT,
            UserEditId: user.id,
            previewImgUrl: imageBase64

        })
    }



    render() {
        let arrGenders = this.state.genderArr
        let language = this.props.language
        let arrRoles = this.state.roleArr
        let arrPositon = this.state.positionArr

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state




        return (
            <div className="container" >
                <div className='title'>
                    User Manager Redux
                </div>
                <div className='user-redux-body'>

                    <form>
                        <div className="row">
                            <div className="col-md-3">
                                <label for="inputEmail4"><FormattedMessage id="manage-user.Email" /></label>
                                <input type="email" className="form-control" id="inputEmail4" placeholder="Email"
                                    value={email}
                                    onChange={(event) => this.onChangeInput(event, 'email')}
                                    disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                                />
                            </div>
                            <div className=" col-md-3">
                                <label for="inputPassword4"><FormattedMessage id="manage-user.Password" /></label>
                                <input type="password" className="form-control" id="inputPassword4" placeholder="Password"
                                    value={password}
                                    onChange={(event) => this.onChangeInput(event, 'password')}
                                    disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                                />
                            </div>
                            <div className=" col-md-2">
                                <label for="inputZip"><FormattedMessage id="manage-user.PhoneNumber" /></label>
                                <input type="text" className="form-control" id="inputZip"
                                    value={phoneNumber}
                                    onChange={(event) => this.onChangeInput(event, 'phoneNumber')} />

                            </div>
                        </div>
                        <div className="row">
                            <div className=" col-md-3">
                                <label for="inputEmail4"><FormattedMessage id="manage-user.FName" /></label>
                                <input type="text" className="form-control" id="inputEmail4" placeholder="First Name"
                                    value={firstName}
                                    onChange={(event) => this.onChangeInput(event, 'firstName')}
                                />
                            </div>
                            <div className=" col-md-3">
                                <label for="inputPassword4"><FormattedMessage id="manage-user.LName" /> </label>
                                <input type="text" className="form-control" id="inputPassword4" placeholder="Last Name"
                                    value={lastName}
                                    onChange={(event) => this.onChangeInput(event, 'lastName')}
                                />


                            </div>

                            <div className=" col-md-2">
                                <label for="inputZip"><FormattedMessage id="manage-user.Position" /></label>

                                <select className="form-control" onChange={(event) => this.onChangeInput(event, 'position')}
                                    value={position}
                                >
                                    {arrPositon && arrPositon.length > 0 &&
                                        arrPositon.map((item, index) => {

                                            return (
                                                <option key={index} value={item.keyMap}


                                                >

                                                    {language == LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>


                        </div>


                        <div className="row">
                            <div className=" col-md-2">
                                <label for="inputCity"><FormattedMessage id="manage-user.address" /></label>
                                <input type="text" className="form-control" id="inputCity"
                                    value={address}
                                    onChange={(event) => this.onChangeInput(event, 'address')}
                                />
                            </div>
                            <div className=" col-md-2">
                                <label for="inputState"><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control" onChange={(event) => this.onChangeInput(event, 'gender')}
                                    value={gender}

                                >

                                    {arrGenders && arrGenders.length > 0 &&
                                        arrGenders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>

                                                    {language == LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })

                                    }


                                </select>
                            </div>
                            <div className=" col-md-2">
                                <label for="inputZip"><FormattedMessage id="manage-user.Image" /></label>
                                <div>
                                    <input id='previewImg' type='file' hidden='true' onChange={(event) => this.handleOnchangeImage(event)} />
                                    <label htmlFor='previewImg'><i className=" fas fa-solid fa-upload" /> <FormattedMessage id="manage-user.uploadImg" /> </label>
                                    <div className='preview-Image'
                                        style={{ backgroundImage: `url(${this.state.previewImgUrl}) ` }}
                                        onClick={() => this.openPreviewImange()}
                                    >


                                    </div>
                                </div>

                            </div>

                            <div className=" col-md-2">
                                <label for="inputZip"><FormattedMessage id="manage-user.Role" /></label>
                                <select className="form-control"
                                    onChange={(event) => this.onChangeInput(event, 'role')}
                                    value={role}
                                >
                                    {arrRoles && arrRoles.length > 0 &&
                                        arrRoles.map((item, index) => {

                                            return (
                                                <option key={index} value={item.keyMap}


                                                >{language == LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })

                                    }

                                </select>
                            </div>
                        </div>

                        <div className='col-12 pt-2'>


                            <button
                                className={this.state.action === CRUD_ACTION.EDIT ? "btn btn-outline-danger" : "btn btn-outline-success"}
                                onClick={() => this.handleSaveUser()}>

                                {this.state.action === CRUD_ACTION.EDIT ?
                                    <FormattedMessage id="manage-user.edit" />
                                    :
                                    <FormattedMessage id="manage-user.add" />
                                }

                            </button>
                        </div>
                    </form>

                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgUrl}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
                </div>
                <div className='col-12'>
                    <TableManageUser
                        handleEditUserFromParent={this.handleEditUserFromParent}
                        action={this.state.action}
                    />
                </div>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        ListUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositonStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data))

        // processLogout: () => dispatch(actions.processLogout()),
        // changLanguageAppRedux: (language) => dispatch(actions.changLanguageApp(language))


    };
};




export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
