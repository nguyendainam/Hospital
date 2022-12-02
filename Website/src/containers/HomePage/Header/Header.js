import React, { Component } from 'react';

import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant';
import "./style_Header.scss"
import { FormattedMessage } from 'react-intl'
import { changLanguageApp } from '../../../store/actions/appActions';

class Header extends Component {

    changLanguage = (language) => {
        this.props.changLanguageAppRedux(language)
    }

    render() {
        let language = this.props.language;


        return (
            <React.Fragment>
                <div className='HomeHeader-Container'>
                    <div className='HomeHeader-content'>
                        <div className='left-header'>
                            <i className="fas fa-bars" />
                            <image className='headerLogo'>
                            </image>

                        </div>
                        <div className='center-header'>

                            <div className='content-center'>
                                <div><b> < FormattedMessage id={"home-header.specialist"} /> </b></div>
                                <div className='sub_titlte'> < FormattedMessage id={"home-header.Find_a_doctor"} /></div>
                            </div>
                            <div className='content-center'>
                                <div><b> < FormattedMessage id={"home-header.health_facilities"} /></b></div>
                                <div className='sub_titlte'> < FormattedMessage id={"home-header.choose_hos"} /></div>
                            </div>
                            <div className='content-center'>
                                <div><b>< FormattedMessage id={"home-header.doctor"} /></b></div>
                                <div className='sub_titlte'>< FormattedMessage id={"home-header.select_doctor"} /></div>
                            </div>
                            <div className='content-center'>
                                <div><b>< FormattedMessage id={"home-header.goikhambenh"} /></b></div>
                                <div className='sub_titlte'> < FormattedMessage id={"home-header.General_health"} /> </div>
                            </div>
                        </div>
                        <div className='right-header'>

                            <div className='right_content'>
                                <div className='tittle_right'> <i className="fas fa-question-circle" /> < FormattedMessage id={"home-header.support"} /> </div>
                                <div className={language === LANGUAGES.VI ? 'language-vi  active ' : 'language-vi'}><span onClick={() => this.changLanguage(LANGUAGES.VI)} >VN</span> </div>
                                <div className={language === LANGUAGES.EN ? 'language-en  active ' : 'language-en'}><span onClick={() => this.changLanguage(LANGUAGES.EN)} >EN</span> </div>
                            </div>

                        </div>
                    </div>
                </div >

                <div className='HomeHeader-Banner'>
                    <div className='Top_Header_Banner'>
                        <div className='Title_Banner'>< FormattedMessage id={"home-header.slogan_main"} /> </div>
                        <div className='Title2_Banner'>< FormattedMessage id={"home-header.slogan_2"} /></div>
                        <div className='Search_Banner'>
                            <i className="fas fa-search" /><input type='text' className='Input_search' placeholder='Search' />
                        </div>
                    </div>

                    <div className='Bottom_Header_Banner'>
                        <div className='Option_Banner'>
                            <div className='Option_Banner_Chirld'>
                                <div className='Option_Banner_Chirld_Icon'> <i className="fas fa-hospital-alt"></i></div>
                                <div className='Option_Banner_Chirld_Text'> < FormattedMessage id={"home-header.spec_E"} /></div>
                            </div>
                            <div className='Option_Banner_Chirld'>
                                <div className='Option_Banner_Chirld_Icon'> <i className="fas fa-mobile-alt"></i></div>
                                <div className='Option_Banner_Chirld_Text'>< FormattedMessage id={"home-header.remove"} /></div>
                            </div>
                            <div className='Option_Banner_Chirld'>
                                <div className='Option_Banner_Chirld_Icon'> <i className="fas fa-procedures"></i></div>
                                <div className='Option_Banner_Chirld_Text'> < FormattedMessage id={"home-header.ge_E"} /></div>
                            </div>
                            <div className='Option_Banner_Chirld'>
                                <div className='Option_Banner_Chirld_Icon'><i className="fas fa-vial"></i></div>
                                <div className='Option_Banner_Chirld_Text'> < FormattedMessage id={"home-header.Medical_Test"} /></div>
                            </div>
                            <div className='Option_Banner_Chirld'>
                                <div className='Option_Banner_Chirld_Icon'> <i className="fas fa-heart"></i></div>
                                <div className='Option_Banner_Chirld_Text'> < FormattedMessage id={"home-header.Mental_health"} /></div>
                            </div>
                            <div className='Option_Banner_Chirld'>
                                <div className='Option_Banner_Chirld_Icon'> <i className="fas fa-smile"></i></div>
                                <div className='Option_Banner_Chirld_Text'>< FormattedMessage id={"home-header.Dental"} /></div>
                            </div>


                        </div>
                    </div>


                </div >

            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,

        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changLanguageAppRedux: (language) => dispatch(changLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
