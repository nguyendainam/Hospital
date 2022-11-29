import React, { Component } from 'react';

import { connect } from 'react-redux';

import "./style_Header.scss"
class Header extends Component {

    render() {

        return (
            <div className='HomeHeader-Container'>
                <div className='HomeHeader-content'>
                    <div className='left-header'>

                        <i className="fas fa-bars" />
                        <image className='headerLogo'>


                        </image>

                    </div>
                    <div className='center-header'>

                        <div className='content-center'>
                            <div><b>Chuyên Khoa</b></div>
                            <div className='sub_titlte'>tìm bác sĩ theo chuyên khoa </div>
                        </div>
                        <div className='content-center'>
                            <div><b>Cơ sở y tế</b></div>
                            <div className='sub_titlte'>Chọn bệnh viện phòng Khám</div>
                        </div>
                        <div className='content-center'>
                            <div><b>Bác sĩ</b></div>
                            <div className='sub_titlte'>Chọn bác sĩ</div>
                        </div>
                        <div className='content-center'>
                            <div><b>Gói Khám</b></div>
                            <div className='sub_titlte'>Khám sức khỏe tổng quát</div>
                        </div>
                    </div>
                    <div className='right-header'>

                        <div className='right_content'>
                            <div className='tittle_right'> <i className="fas fa-question-circle"></i>
                                Hỗ trợ
                            </div>
                            <div className='flat'>VN</div>
                        </div>

                    </div>
                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
