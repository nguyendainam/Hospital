import { postVerifyPatientAppoiment } from '../../../services/userService';
import React, { Component } from 'react';
import { connect } from "react-redux";
import Header from '../../HomePage/Header/Header';
import './VerifyEmail.scss'



class VerifyEmail extends Component {


    constructor(props) {
        super(props);
        this.state = {
            statusVerify: 0
            , isloadding: false
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyPatientAppoiment({
                token: token,
                doctorId: doctorId
            })
            console.log('res.......', res)
            if (res.data && res.data.errCode === 0) {
                this.setState({
                    isloadding: true,
                    statusVerify: res.data.errCode
                })
            }
            else {
                this.setState({
                    isloadding: true,
                    statusVerify: res.data && res.data.errCode ? res.data.errCode : '-2'
                })
            }
        }
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        const { statusVerify, isloadding } = this.state
        // console.log('.............', this.state)
        return (
            <>
                <div>
                    <Header />
                </div>

                {isloadding === false ?
                    <div className='textVerify'>..... loading</div>

                    :
                    ''
                }

                {+statusVerify === 0 ?

                    <div className='textVerify'>ĐẶT LỊCH THÀNH CÔNG
                        <div> Lịch đặt của bạn đã được đặt. Vui lòng đến đúng giờ để được chữa trị kịp thời </div>
                    </div>
                    :
                    <div className='textVerify'>Lịch đã được đặt hoặc không tồn tại
                        <div></div>

                    </div>

                }


            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
