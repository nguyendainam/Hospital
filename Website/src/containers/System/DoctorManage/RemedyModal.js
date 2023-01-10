import React, { Component } from 'react';
import { connect } from "react-redux";
import './RemedyModal.scss'
import { FormattedMessage } from 'react-intl'
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
class RemedyModal extends Component {


    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }








    async componentDidUpdate(prevProps, prevState, snapshot) {

    }



    render() {
        let { isOpenModal, dataModal, isCloseModal, sendRemedy } = this.props
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
                        <button type="button" class="btn-close"
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
                                    <input type='email' value={dataModal.email} />
                                </div>
                            </div>
                            <div className='col-6 form-group'>
                                <div className='form-control'>
                                    <label>Đơn thuốc</label>
                                    <input type='file' />
                                </div>
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary"
                            onClick={sendRemedy}
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
