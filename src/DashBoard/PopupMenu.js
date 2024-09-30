import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../UseContext/context';

function PopupMenu({ onClose }) {
    const { darkMode, userInfo, setIsUser, setUserInfo, handleLogOut } = useAppContext();
    const popupRef = useRef(null);

    const Logout = () => {
        handleLogOut()
        onClose();
    }
    useEffect(() => {
        // console.log("4 RE-RENDER.......")

        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div
            ref={popupRef}
            className={`absolute top-[4rem] right-10 border border-gray-300 shadow-lg rounded-md p-2 w-[20rem] ${
                darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
            } z-50`} // Ensure high z-index
        >
            <div className="relative flex flex-col">
                <button
                    className={`absolute top-2 right-2 w-[2rem] text-gray-500 font-bold rounded-md p-1 ${
                        darkMode ? 'bg-red-700 text-white-500' : 'bg-red-500 text-gray-800'
                    }`}
                    onClick={onClose}
                >
                    X
                </button>
                <div className="flex flex-col mt-6">
                    <ul className="space-y-2">
                        <span className="py-1 px-2 flex justify-center">
                            <img
                                className="w-[5rem]"
                                src={
                                    darkMode
                                        ? 'https://img.icons8.com/?size=100&id=7820&format=png&color=ffffff'
                                        : 'https://img.icons8.com/?size=100&id=7819&format=png&color=000000'
                                }
                                alt="Dashboard"
                            />
                        </span>
                        <li className="cursor-default">
                            {userInfo.name}
                        </li>
                        <li className="cursor-default">
                            {userInfo.email}
                        </li>
                    </ul>
                    <button
                        className="mt-8 mb-3 w-[90%] m-auto hover:bg-red-700 cursor-pointer border-transparent font-semibold text-[1.1rem] px-4 h-[2.5rem] rounded-[0.5rem] bg-red-600"
                        onClick={Logout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PopupMenu;
