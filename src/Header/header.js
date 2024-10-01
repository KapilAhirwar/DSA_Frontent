// src/components/Header.js

import React, { useState } from 'react';
import { useAppContext } from "../UseContext/context";
import Modal from '../Login/Model/Modal';
import { LoginForm, Otpverify, SignupForm } from '../Login/Login_Signin/Forms';
import PopupMenu from '../DashBoard/PopupMenu'; // Import the PopupMenu component

function Header() {
    const { darkMode, setDarkMode, isUser } = useAppContext();
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isSignupOpen, setSignupOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false); // State to handle popup menu
    const [isotpOpen, setotpOpen] = useState(false);

    const modeHandler = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    };

    const toggleMenu = () => setMenuOpen(!isMenuOpen);

    return (
        <>
            <div className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}> {/* Ensure navbar is on top */}
                <nav className={`w-[85%] py-2 m-auto text-[1.2rem] flex justify-between p-1 ${darkMode ? 'bg-gray-800' : 'bg-white'} `}>
                    <span className="font-bold text-[2rem] px-3 rounded shadow shadow-indigo-500">DSA Track</span>
                    <span className="flex gap-10 items-center">
                        <span className="w-[2rem] pt-1" onClick={modeHandler}>
                            <img
                                src={darkMode
                                    ? 'https://img.icons8.com/?size=100&id=45475&format=png&color=ffffff'
                                    : 'https://img.icons8.com/?size=100&id=45474&format=png&color=000000'}
                                alt="Toggle Dark Mode"
                            />
                        </span>
                        <span className="flex gap-3">
                            {!isUser && (
                                <>
                                    <button
                                        className="border-transparent font-semibold text-[1.1rem] px-4 py-[0rem] h-[2.5rem] rounded-[0.5rem] bg-red-600"
                                        onClick={() => setLoginOpen(true)}
                                    >
                                        LogIn
                                    </button>
                                    <button
                                        className="border-transparent font-semibold text-[1.1rem] px-4 py-[0rem] h-[2.5rem] rounded-[0.5rem] bg-red-600"
                                        onClick={() => setSignupOpen(true)}
                                    >
                                        SignUp
                                    </button>
                                </>
                            )}
                            {isUser && (
                                <button
                                    className="border-transparent text-red font-semibold text-[1.1rem] px-1 py-[0rem] h-[2.5rem] rounded-[0.5rem]"
                                    onClick={toggleMenu}
                                >
                                    <img className='w-[2.5rem]'
                                        src={darkMode
                                            ? 'https://img.icons8.com/?size=100&id=7820&format=png&color=ffffff'
                                            : 'https://img.icons8.com/?size=100&id=7819&format=png&color=000000'}
                                        alt="Dashboard"
                                    />
                                </button>
                            )}
                        </span>
                    </span>
                </nav>
            </div>

            {/* Popup Menu */}
            {isMenuOpen && <PopupMenu onClose={() => setMenuOpen(false)} />}

            {/* Login Modal */}
            <Modal show={isLoginOpen} onClose={() => setLoginOpen(false)} title="Login">
                <LoginForm onClose={() => setLoginOpen(false)} />
            </Modal>

            <Modal show={isotpOpen} onClose={() => setotpOpen(false)} title="OTP">
                <Otpverify onClose={() => setotpOpen(false)} close={setotpOpen} />
            </Modal>

            {/* Signup Modal */}
            <Modal show={isSignupOpen} onClose={() => setSignupOpen(false)} title="Sign Up">
                <SignupForm onClose={() => setSignupOpen(false)} Otpverify={setotpOpen}/>
            </Modal>
        </>
    );
}

export default Header;
