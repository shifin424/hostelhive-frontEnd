import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import image from '../../assets/images/loginImage.jpg';

function Otp() {
    const [otp, setOtp] = useState('');

    const handleSubmit = () => {
        
    };

    return (
        <>
            <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-gray-100 flex rounded-2xl shadow-2xl max-w-3xl p-5 items-center">
                    <div className="md:w-1/2 px-8 md:px-8">
                        <h2 className="font-bold text-2xl text-[#002D74]">OTP Verification</h2>
                        <p className="text-xs mt-4 text-[#002D74]">
                            Enter the OTP sent to your phone number
                        </p>

                        <Formik
                            initialValues={{
                                otp1: '',
                                otp2: '',
                                otp3: '',
                                otp4: '',
                                otp5: '',
                                otp6: ''
                            }}
                            onSubmit={handleSubmit}
                        >
                            <Form className="flex flex-col gap-4">
                                <div className="flex justify-between">
                                    <Field
                                        className="p-2  rounded-xl border mr- bg-white w-1/6 text-center"
                                        type="text"
                                        name="otp1"
                                        maxLength={1}
                                    />
                                    <Field
                                        className="p-2 rounded-xl border mr-1 bg-white w-1/6 text-center"
                                        type="text"
                                        name="otp2"
                                        maxLength={1}
                                    />
                                    <Field
                                        className="p-2 rounded-xl border mr-1 bg-white w-1/6 text-center"
                                        type="text"
                                        name="otp3"
                                        maxLength={1}
                                    />
                                    <Field
                                        className="p-2 rounded-xl border mr-1 bg-white w-1/6 text-center"
                                        type="text"
                                        name="otp4"
                                        maxLength={1}
                                    />
                                    <Field
                                        className="p-2 rounded-xl border mr-1 bg-white w-1/6 text-center"
                                        type="text"
                                        name="otp5"
                                        maxLength={1}
                                    />
                                    <Field
                                        className="p-2 rounded-xl border mr-1 bg-white w-1/6 text-center"
                                        type="text"
                                        name="otp6"
                                        maxLength={1}
                                    />
                                </div>

                                <ErrorMessage
                                    name="otp"
                                    component="div"
                                    className="text-red-500 text-xs"
                                />

                                <button
                                    className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                                    type="submit"
                                >
                                    Verify
                                </button>
                            </Form>
                        </Formik>

                        <div id="recaptcha-container"></div>

                        <div className="mt-6 text-xs text-gray-400">
                            <hr className="border-gray-400" />
                            <p className="text-center">Didn't receive the OTP?</p>
                            <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 text-[#002D74]">
                                Resend OTP
                            </button>
                        </div>
                    </div>

                    <div className="md:block hidden w-1/2">
                        <img className="rounded-2xl" src={image} alt="Signup Image" />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Otp;
