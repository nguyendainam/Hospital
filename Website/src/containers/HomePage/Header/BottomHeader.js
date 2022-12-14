import React, { Component } from 'react';

import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant';
import "./style_Header.scss"
import { FormattedMessage } from 'react-intl'
import { changLanguageApp } from '../../../store/actions/appActions';

class BottomHeader extends Component {

    changLanguage = (language) => {
        this.props.changLanguageAppRedux(language)
    }

    render() {
        let language = this.props.language;


        return (
            <React.Fragment>


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

export default connect(mapStateToProps, mapDispatchToProps)(BottomHeader);
