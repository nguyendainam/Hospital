import React, { Component } from 'react';
import { connect } from "react-redux";
import Header from '../../Header/Header'
import './DetailsDoctor.scss'
import { getDetailsInforDoctor } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';
import Footer from '../../Footer/Footer'
class DetailsDoctor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailsInforDoctor(id)
            if (res && res.errCode === 0) {
                this.setState({
                    arrDoctor: res.data
                })
            }




        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {

        let { language } = this.props
        let ArrInforDoctor = this.state.arrDoctor
        console.log("state ", ArrInforDoctor)

        let nameVi = '', nameEn = ''
        if (ArrInforDoctor && ArrInforDoctor.positionData) {
            nameVi = `${ArrInforDoctor.positionData.valueVi}: ${ArrInforDoctor.lastName} ${ArrInforDoctor.firstName} `;
            nameEn = `${ArrInforDoctor.positionData.valueEn}: ${ArrInforDoctor.lastName} ${ArrInforDoctor.firstName} `;
        }

        let imageBase64 = ''
        if (ArrInforDoctor && ArrInforDoctor.image) {
            imageBase64 = new Buffer(ArrInforDoctor.image, 'base64').toString('binary')
        }


        return (
            <>
                <div>
                    <Header />
                </div>
                <div className='container'>


                    <div className='Main_Details_Doctor'>
                        {/* /////////////////// INFOR DOCTOR //////////////////// */}
                        <div className='layout_infor_doctor'>
                            <div className='Image_doctor'>
                                <div className='imange_dr'
                                    style={{ backgroundImage: `url(${imageBase64 ? imageBase64 : ''}) ` }} >

                                </div>
                            </div>
                            <div className='information_doctor'>

                                <div className='form_name_doctor'>

                                    {language === LANGUAGES.VI ? nameVi : nameEn}

                                </div>
                                <div className='form_des_doctor'>
                                    {ArrInforDoctor && ArrInforDoctor.Markdown && ArrInforDoctor.Markdown.description

                                        && <span>

                                            {ArrInforDoctor.Markdown.description}
                                        </span>

                                    }

                                </div>
                            </div>
                        </div>

                        <div className='Form_Schedule'>

                        </div>


                        <div className='Form_comment'>
                            {ArrInforDoctor && ArrInforDoctor.Markdown && ArrInforDoctor.Markdown.contentHTML

                                && <div dangerouslySetInnerHTML={{ __html: ArrInforDoctor.Markdown.contentHTML }}>


                                </div>

                            }
                        </div>
                    </div>
                </div>


            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsDoctor);
