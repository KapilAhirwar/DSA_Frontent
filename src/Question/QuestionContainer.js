import { useEffect, useState } from 'react';
import { useAppContext } from '../UseContext/context';
import './QuestionsContainer.css';
import SmallWindow from './smallWindow';
import 'react-toastify/dist/ReactToastify.css';

// function QuestionsContainer({ items, totalQ, solveQ }) {
//     const { AllData, changeStatus, changeNotes, darkMode, userInfo, isUser, checkUserStatus } = useAppContext();

//     // Initialize state with questions marked as Complete or Incomplete based on userInfo.complete
//     const [questions, setQuestions] = useState(() => {
//         return items.questions?.map((question) => {
//             if (isUser && userInfo.complete?.includes(question._id)) {
//                 return { ...question, status: "Complete" };
//             } else {
//                 return { ...question, status: "Incomplete" };
//             }
//         });
//     });

//     const [showModal, setShowModal] = useState(false);
//     const [modalContent, setModalContent] = useState('');
//     const [currentQuestionId, setCurrentQuestionId] = useState(null);

//     const UserId = userInfo._id; // User ID for updating the status of questions

//     // Handle status change for a question
//     const changeStatusHandler = async (id, currentstatus) => {
//         const newstatus = currentstatus === 'Incomplete' ? 'Complete' : 'Incomplete';
//         await changeStatus(UserId, id, newstatus);

//         // Update the local questions state with the new status
//         setQuestions(prevQuestions => 
//             prevQuestions.map(q => 
//                 q._id === id ? { ...q, status: newstatus } : q
//             ),
//         );
//         checkUserStatus();
//         AllData(); // Fetch updated data
//     };

//     // Calculate solved and total questions
//     let solve = 0, total = 0;

//     if (isUser) {
//         questions?.forEach(element => {
//             total++; // Increment the total count for each question
            
//             if (element.status === "Complete") {
//                 solve++; // Increment the solve count if the status is "Complete"
//             }
//         });
//     }

//     totalQ(total); // Update total questions count
//     solveQ(solve); // Update solved questions count

//     useEffect(() => {
//         if (isUser) {
//             AllData(); // Fetch all data when component mounts
//         }
//     }, [isUser]);

//     // Handle opening the small window modal
//     const smallWindowHandler = (item) => {
//         setModalContent(item || '');
//         setCurrentQuestionId(item._id);
//         setShowModal(true);
//     };

//     // Handle closing the modal
//     const handleCloseModal = () => {
//         setShowModal(false);
//     };

//     // Handle saving the note for a question
//     const handleSaveNote = async (note) => {
//         await changeNotes(UserId, currentQuestionId, note);
//         setQuestions(prevQuestions =>
//             prevQuestions.map(q =>
//                 q._id === currentQuestionId ? { ...q, notes: note } : q
//             )
//         );
//     };
    
//     return (
//         <div className="table">
//             <table className='table1'>
//                 <thead>
//                     <tr>
//                         <th>S.No</th>
//                         <th>Question Name</th>
//                         <th>Status</th>
//                         <th>Notes</th>
//                         <th>Done</th>
//                     </tr>        
//                 </thead>
//                 <tbody>
//                     {
//                         questions?.map((item, index) => (
//                             <tr key={index}>
//                                 <td>{index + 1}</td>
//                                 <td className='Qname'><a href={item.link}>{item.Name}</a></td>
//                                 <td>{item.status}</td>
//                                 <td>
//                                     <img 
//                                         src={darkMode ? 
//                                             'https://img.icons8.com/?size=100&id=NpCiBVDjQeA8&format=png&color=000000' : 
//                                             'https://img.icons8.com/?size=100&id=12581&format=png&color=000000'
//                                         } 
//                                         id='noteIcon' 
//                                         onClick={() => smallWindowHandler(item)} 
//                                         alt='note icon'
//                                     />
//                                 </td>
//                                 <td>
//                                     <input 
//                                         type="checkbox" 
//                                         checked={item.status === "Complete"} 
//                                         onChange={() => changeStatusHandler(item._id, item.status)} 
//                                         id='check' 
//                                         name='check' 
//                                     />
//                                 </td>
//                             </tr>
//                         ))
//                     }
//                 </tbody>
//             </table>
//             <SmallWindow 
//                 show={showModal} 
//                 handleClose={handleCloseModal} 
//                 data={modalContent} 
//                 onSave={handleSaveNote}             
//             />
//         </div>
//     );
// }

// export default QuestionsContainer;


function QuestionsContainer({ items, totalQ, solveQ }) {
    const { AllData, changeStatus, changeNotes, darkMode, userInfo, isUser, checkUserStatus, userCompleteArray } = useAppContext();

    const [questions, setQuestions] = useState(() => {
        return items.questions?.map((question) => {
            if (isUser && userCompleteArray?.includes(question._id)) {
                return { ...question, status: "Complete" };
            } else {
                return { ...question, status: "Incomplete" };
            }
        });
    });

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [currentQuestionId, setCurrentQuestionId] = useState(null);

    const UserId = userInfo._id;

    const changeStatusHandler = async (id, currentstatus) => {
        const newstatus = currentstatus === 'Incomplete' ? 'Complete' : 'Incomplete';
        await changeStatus(UserId, id, newstatus);
        setQuestions(prevQuestions => 
            prevQuestions.map(q => 
                q._id === id ? { ...q, status: newstatus } : q
            )
        );
        checkUserStatus();
        AllData(); 
    };

    useEffect(() => {
        if (isUser) {
            AllData(); 
        }
    }, [isUser]);

    useEffect(() => {
        if (questions) {
            const solve = questions.filter(q => q.status === 'Complete').length;
            const total = questions.length;

            totalQ(total);
            solveQ(solve);
        }
    }, [questions, totalQ, solveQ]);

    const smallWindowHandler = (item) => {
        setModalContent(item || '');
        setCurrentQuestionId(item._id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSaveNote = async (note) => {
        await changeNotes(UserId, currentQuestionId, note);
        setQuestions(prevQuestions =>
            prevQuestions.map(q =>
                q._id === currentQuestionId ? { ...q, notes: note } : q
            )
        );
    };

    return (
        <div className="table">
            <table className='table1'>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Question Name</th>
                        <th>Status</th>
                        <th>Notes</th>
                        <th>Done</th>
                    </tr>        
                </thead>
                <tbody>
                    {
                        questions?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td className='Qname'><a href={item.link}>{item.Name}</a></td>
                                <td>{item.status}</td>
                                <td className='flex justify-center'>
                                    <img 
                                        src={darkMode ? 
                                            'https://img.icons8.com/?size=100&id=NpCiBVDjQeA8&format=png&color=000000' : 
                                            'https://img.icons8.com/?size=100&id=12581&format=png&color=000000'
                                        } 
                                        id='noteIcon' 
                                        onClick={() => smallWindowHandler(item)} 
                                        alt='note icon'
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        checked={item.status === "Complete"} 
                                        onChange={() => changeStatusHandler(item._id, item.status)} 
                                        id='check' 
                                        name='check' 
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <SmallWindow 
                show={showModal} 
                handleClose={handleCloseModal} 
                data={modalContent} 
                onSave={handleSaveNote}             
            />
        </div>
    );
}

export default QuestionsContainer;
