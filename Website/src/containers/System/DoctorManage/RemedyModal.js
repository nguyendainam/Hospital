import React, { Component } from 'react';
import { connect } from "react-redux";
import './RemedyModal.scss'
import { FormattedMessage } from 'react-intl'
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import { CommonUtils } from '../../../utils';


class RemedyModal extends Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
            timeType: '',
            fullname: ''
        }
    }

    async componentDidMount() {

        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
                fullname: this.props.dataModal.fullname
            })
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
                fullname: this.props.dataModal.fullname
            })
        }
    }


    handleOnchangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }


    handleOnchangeImage = async (event) => {
        let data_file = event.target.files
        let file = data_file[0]

        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imgBase64: base64
            })
        }
    }


    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }


    render() {
        let { isOpenModal, dataModal, isCloseModal, sendRemedy } = this.props

        console.log('data chilrd', dataModal)
        return (
            <>
                <Modal
                    isOpen={isOpenModal}
                    size='md'
                    centered
                    className='formModal'

                >
                    <ModalHeader >
                        Modal title
                        <button type="button" className="btn-close"
                            aria-label="Close"
                            onClick={isCloseModal}
                        >


                        </button>
                    </ModalHeader>
                    <ModalBody className='bodymodal'>
                        <div className='row col-12'>
                            <div className='col-6 form-group'>
                                <div className='form-control'>
                                    <label>Email Bệnh nhân</label>
                                    <input type='email' value={this.state.email}
                                        onChange={(event) => this.handleOnchangeEmail(event)}
                                    />
                                </div>
                            </div>
                            <div className='col-6 form-group'>
                                <div className='form-control'>
                                    <label>Đơn thuốc</label>
                                    <input type='file'
                                        onChange={(event) => this.handleOnchangeImage(event)}

                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary"
                            onClick={this.handleSendRemedy}
                        >
                            Gửi
                        </Button>

                    </ModalFooter>
                </Modal>

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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
