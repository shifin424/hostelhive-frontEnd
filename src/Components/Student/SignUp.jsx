import React from 'react'
import image from '../../assets/images/loginImage.jpg'

function SignUp() {

    return (
        <>
            <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-gray-100 flex rounded-2xl shadow-2xl max-w-3xl p-5 items-center">
                    <div className="md:w-1/2 px-8 md:px-8">
                        <h2 className="font-bold text-2xl text-[#002D74]">Signup</h2>
                        <p className="text-xs mt-4 text-[#002D74]">
                            Create a new account to get started
                        </p>

                        <form action="" className="flex flex-col gap-4">
                            <input
                                className="p-2 rounded-xl border bg-white"
                                type="text"
                                name="username"
                                placeholder="Username"
                            />
                            <input
                                className="p-2 rounded-xl border bg-white"
                                type="email"
                                name="email"
                                placeholder="Email"
                            />
                            <input
                                className="p-2 rounded-xl border bg-white"
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                            />
                            <select
                                className="p-2 rounded-xl border bg-white"
                                name="gender"
                                defaultValue=""
                            >
                                <option value="" disabled hidden>
                                    Gender
                                </option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <input
                                className="p-2 rounded-xl border bg-white"
                                type="number"
                                name="age"
                                placeholder="Age"
                            />
                            <input
                                className="p-2 rounded-xl border bg-white"
                                type="password"
                                name="password"
                                placeholder="Password"
                            />

                            <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
                                Signup
                            </button>
                        </form>

                        <div className="mt-6 text-xs text-gray-400">
                            <hr className="border-gray-400" />
                            <p className="text-center">Already have an account?</p>
                            <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 text-[#002D74]">
                                Login
                            </button>
                        </div>
                    </div>

                    <div className="md:block hidden w-1/2">
                        <img className="rounded-2xl" src={image} alt="Signup Image" />
                    </div>
                </div>
            </section>


        </>
    )
}

export default SignUp
