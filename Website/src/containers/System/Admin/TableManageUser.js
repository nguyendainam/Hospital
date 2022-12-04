import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from '../../../store/actions'


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: []


        }
    }

    componentDidMount() {
        this.props.fetchUserRedux()

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.ListUsers !== this.props.ListUsers) {
            this.setState({
                userRedux: this.props.ListUsers
            })
        }
    }


    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id)
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user)
    }

    render() {
        console.log("check all user ", this.props.ListUsers)

        console.log("check all user state update ", this.state.userRedux)
        let arrUser = this.state.userRedux
        return (
            <div >
                <div className="container pt-5">


                    <div className='table-container '>
                        <table className="table  mr-4   ">
                            <thead>
                                <tr>
                                    <th className='w-20' scope="col">Email</th>
                                    <th className='w-20' scope="col">FirstName</th>
                                    <th className='w-20' scope="col">LastName</th>
                                    <th className='w-20' scope="col">Address</th>
                                    <th className='w-20' scope="col">Position</th>
                                    <th className='w-20' scope="col">Role</th>
                                    <th className='w-20' scope="col">NumberPhone</th>
                                    <th className='w-20' cope="col">Acction</th>
                                </tr>
                            </thead>
                            <tbody>

                                {arrUser && arrUser.length > 0 &&
                                    arrUser.map((item, index) => {

                                        return (
                                            <tr key={index}>
                                                <td>{item.email}</td>
                                                <td>{item.firstName} </td>
                                                <td>{item.lastName}</td>
                                                <td>{item.address}</td>
                                                <td>{item.positionId}</td>
                                                <td>{item.roleId}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td><td>
                                                    <button className='btn-edit'
                                                        onClick={() => this.handleEditUser(item)}
                                                    >
                                                        <i className="fas fa-pencil-alt" /> Edit</button>
                                                    <button className='btn-delete'
                                                        onClick={() => { this.handleDeleteUser(item) }}
                                                    >
                                                        <i className="fas fa-user-times" /> Delete</button>
                                                </td></td>
                                            </tr>


                                        )
                                    })

                                }


                            </tbody>
                        </table>

                    </div>
                </div>

                <div className='container pt-5'>
                    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                </div>
            </div>



        );
    }

}

const mapStateToProps = state => {
    return {
        ListUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
