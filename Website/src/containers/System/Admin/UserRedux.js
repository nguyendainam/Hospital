import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService'
import { LANGUAGES } from "../../../utils"
import * as actions from '../../../store/actions'

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: []
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();

        // try {
        //     let res = await getAllCodeService('gender');



        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        //     console.log("res list", res)
        // } catch (error) {
        //     console.log(error)
        // }
    }

    componentDidUpdate(prevProps, pervState, snapShot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
    }


    render() {
        let arrGenders = this.state.genderArr
        let language = this.props.language
        console.log("check", this.props.genderRedux)

        return (
            <div className="container" >
                <div className='title'>
                    User Manager Redux
                </div>
                <div className='user-redux-body'>

                    <form>
                        <div className="row">
                            <div class="col-md-3">
                                <label for="inputEmail4"><FormattedMessage id="manage-user.Email" /></label>
                                <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                            </div>
                            <div class=" col-md-3">
                                <label for="inputPassword4"><FormattedMessage id="manage-user.Password" /></label>
                                <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                            </div>
                            <div className=" col-md-2">
                                <label for="inputZip"><FormattedMessage id="manage-user.PhoneNumber" /></label>
                                <input type="text" className="form-control" id="inputZip" />
                            </div>
                        </div>
                        <div className="row">
                            <div className=" col-md-3">
                                <label for="inputEmail4"><FormattedMessage id="manage-user.FName" /></label>
                                <input type="text" className="form-control" id="inputEmail4" placeholder="First Name" />
                            </div>
                            <div className=" col-md-3">
                                <label for="inputPassword4"><FormattedMessage id="manage-user.LName" /> </label>
                                <input type="text" className="form-control" id="inputPassword4" placeholder="Last Name" />


                            </div>

                            <div className=" col-md-2">
                                <label for="inputZip"><FormattedMessage id="manage-user.Position" /></label>
                                <input type="text" className="form-control" id="inputZip" />
                            </div>


                        </div>


                        <div className="row">
                            <div class=" col-md-2">
                                <label for="inputCity"><FormattedMessage id="manage-user.address" /></label>
                                <input type="text" className="form-control" id="inputCity" />
                            </div>
                            <div className=" col-md-2">
                                <label for="inputState"><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control">
                                    {arrGenders && arrGenders.length > 0 &&
                                        arrGenders.map((item, index) => {

                                            return (
                                                <option key={index}>{language == LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })

                                    }


                                </select>
                            </div>
                            <div className=" col-md-2">
                                <label for="inputZip"><FormattedMessage id="manage-user.Image" /></label>
                                <input type="text" className="form-control" id="inputZip" />
                            </div>

                            <div className=" col-md-2">
                                <label for="inputZip"><FormattedMessage id="manage-user.Role" /></label>
                                <input type="text" className="form-control" id="inputZip" />
                            </div>
                        </div>

                        <div className='col-12 pt-2'>
                            <button type="submit" className="btn btn-primary" >Save</button>
                        </div>
                    </form>
                </div>


            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart())

        // processLogout: () => dispatch(actions.processLogout()),
        // changLanguageAppRedux: (language) => dispatch(actions.changLanguageApp(language))


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
