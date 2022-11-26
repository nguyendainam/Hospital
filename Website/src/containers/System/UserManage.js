import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers } from '../../services/userService'
import { Button } from 'reactstrap';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })


        }
    }



    render() {
        console.log(this.state)
        let arrUsers = this.state.arrUsers
        return (
            <div className="user-container">
                <div className='title text-center'>Wellcome </div>
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
                                    console.log("check map", item, index)
                                    return (
                                        <>
                                            <tr>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <button className='btn-edit'><i className="fas fa-pencil-alt" /> Edit</button>
                                                    <button className='btn-delete'> <i className="fas fa-user-times" /> Delete</button>
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
