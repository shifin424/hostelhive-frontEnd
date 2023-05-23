import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Landing/NavBar/Navbar'
import Profile from '../../Components/HostelAdmin/Profile'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { hostelAdminApi } from '../../Services/hostelAdmin'
import * as yup from 'yup'

function Register() {


    const initialValues = {
        fullName: "", email: "", password: "", confirmPassword: "",
        mobileNumber: "", qualification: "",
        landMark: "", area: "", gender: "", state: ""
    }

    const [error, setError] = useState("")
    const [formValues, setFormValues] = useState(initialValues);


    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
        setError({ ...error, [name]: "" })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData()

        data.append("fullName", formValues.fullName)
        data.append("email", formValues.email)
        data.append("password", formValues.password)
        data.append("confirmPassword", formValues.confirmPassword)
        data.append("mobileNumber", formValues.mobileNumber)
        data.append("qualification", formValues.qualification)
        data.append("gender", formValues.gender)
        data.append("landMark", formValues.landMark)
        data.append("area", formValues.area)
        data.append("state", formValues.state)

       
         if(data) {
            hostelAdminApi(data).then((response) => {
                if (response.data.error) {
                    setError(response.data.error);
                } else {
                    alert.success("Your singing Successfully Completed");
                    console.log("every thing uptodate"); // Correction made here
                }
            }).catch((err) => {
                console.log(err);
            });
        }



    }




    return (
        <div>
            <Navbar />
            <div>
                <h1 className="text-[#002D7A] bg-white font-bold text-4xl   sm:pl-56  sm:pt-5 md:pt-5 ">Provide your Details</h1>
            </div>
            <Formik
                initialValues={formValues}
                validationSchema={yup.object({
                    fullName: yup.string().required('Required'),
                    password: yup.string().required('Required'),
                    email: yup.string().email('Invalid email address').required
                        ('Please enter your email'),
                    confirmPassword: yup
                        .string()
                        .required('Confirm Password is required')
                        .oneOf([yup.ref('password'), null], 'Passwords must match'),
                    mobileNumber: yup.string().required('Mobile Number is required'),
                    qualification: yup.string().required('Required'),
                    landMark: yup.string().required('Required'),
                    area: yup.string().required('Required'),
                    gender: yup.string().required('Required'),
                    state: yup.string().required('Required'),


                })}


            >
                <Form>
                    <div className='h-max py-10 bg-white flex items-center justify-center'>
                        <div className='w-[22rem] h-max py-10 bg-[#4B76C2] rounded-md shadow-sm md:w-[70rem] flex justify-center'>
                            <div action="" className='flex gap-y-10 flex-col items-center md:flex md:flex-row md:space-x-10'>
                                <div className='flex flex-col  gap-y-5'>
                                    <div className='flex flex-col items-center'>
                                        <label htmlFor="" className='text-white font-bold mr-48'>Full Name</label>
                                        <Field type="text" name="fullName" placeholder='Enter your fullname'
                                            className='w-72 h-10 bg-white font-sans mt-2 text-black rounded-md pl-2 shadow-sm' />
                                        <ErrorMessage name='fullName' component='div' className='text-red-400' />
                                    </div>


                                    <div className='flex flex-col items-center '>
                                        <label htmlFor="" className='text-white font-bold mr-48'>Password</label>
                                        <Field type="password" name="password" placeholder='Enter your Password'
                                            className='w-72 h-10 bg-white font-sans mt-2
                                 text-black rounded-md pl-2 shadow-sm ' />
                                        <ErrorMessage name='password' component='div' className='text-red-400' />
                                    </div>

                                    <div className='flex flex-col items-center'>
                                        <label htmlFor="" className='text-white font-bold mr-48'>Mobile Number</label>
                                        <Field placeholder='Enter your Mobile Number' name="mobileNumber"
                                            className='w-72 h-10 bg-white font-sans mt-2
                                  text-black rounded-md pl-2 shadow-sm ' />
                                        <ErrorMessage name='mobileNumber' component='div' className='text-red-400' />
                                    </div>

                                    <div className='flex flex-col items-center'>
                                        <label htmlFor="" className='text-white font-bold mr-48'>Qualificaion</label>
                                        <Field type="text" placeholder='Enter your Qualifiacion' name="qualification"
                                            className='w-72 h-10 bg-white font-sans mt-2
                                  text-black rounded-md pl-2 shadow-sm ' />
                                        <ErrorMessage name='qualification' component='div' className='text-red-400' />
                                    </div>

                                    <div className='flex flex-col items-center'>
                                        <label htmlFor="" className='text-white font-bold mr-48'>Confirm Password</label>
                                        <Field type="password" placeholder='Enter your Confirm Password' name="confirmPassword"
                                            className='w-72 h-10 bg-white font-sans mt-2
                                  text-black rounded-md pl-2 shadow-sm ' />
                                        <ErrorMessage name='confirmPassword' component='div' className='text-red-400' />
                                    </div>
                                </div>

                                <div className='flex flex-col gap-y-5'>
                                    <div className='flex flex-col items-center'>
                                        <label htmlFor="" className='text-white font-bold mr-48'>Email</label>
                                        <Field type="email" placeholder='Enter your Email' name="email"
                                            className='w-72 h-10 bg-white font-sans mt-2
                                  text-black rounded-md pl-2 shadow-sm ' />
                                        <ErrorMessage name='email' component='div' className='text-red-400' />
                                    </div>

                                    <div className='flex flex-col items-center'>
                                        <label htmlFor="" className='text-white font-bold mr-48'>Land Mark</label>
                                        <Field type="text" placeholder='Enter your Land Mark' name="landMark"
                                            className='w-72 h-10 bg-white font-sans mt-2
                                  text-black rounded-md pl-2 shadow-sm ' />
                                        <ErrorMessage name='landMark' component='div' className='text-red-400' />
                                    </div>

                                    <div className='flex flex-col items-center'>
                                        <label htmlFor="" className='text-white font-bold mr-48'>Gender</label>
                                        <Field type="text" placeholder='Select your gender' name="gender" as="select"
                                            className='w-72 h-10 bg-white font-sans mt-2
                                  text-black rounded-md pl-2 shadow-sm ' >
                                            <option value="">select gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </Field>
                                        <ErrorMessage name='gender' component='div' className='text-red-400' />
                                    </div>

                                    <div className='flex flex-col items-center'>
                                        <label htmlFor="" className='text-white font-bold mr-48'>Area</label>
                                        <Field type="text" placeholder='Enter your Area' name="area"
                                            className='w-72 h-10 bg-white font-sans mt-2
                                  text-black rounded-md pl-2 shadow-sm ' />
                                        <ErrorMessage name='area' component='div' className='text-red-400' />
                                    </div>

                                    <div className='flex flex-col items-center'>
                                        <label htmlFor="" className='text-white font-bold mr-48'>State</label>
                                        <Field type="text" placeholder='Enter your State' name="state"
                                            className='w-72 h-10 bg-white font-sans mt-2
                                  text-black rounded-md  pl-2 shadow-sm ' />
                                        <ErrorMessage name='state' component='div' className='text-red-400' />
                                    </div>

                                </div>

                                {/* <div className='bg-white flex  flex-col  w-50 border-dashed border-black h-max rounded-md'>
                                    <Profile />
                                </div> */}

                            </div>

                            <div>
                                <button className='bg-white text-black w-20 h-15 py-3 px-3 rounded-md'>Submit</button>
                            </div>

                        </div>



                    </div>
                </Form>
            </Formik>









        </div>


    )
}

export default Register




