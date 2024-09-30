import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { toast as toastHot } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';

// http://localhost:5000/api/Upload/Questions
// http://localhost:5000/api/Get/Questions
// http://localhost:5000/api/Topic/668149c253958ed9fcb43179/Questions/668149c253958ed9fcb4317a/update-Status

//login signup Api

//http://localhost:5000/api/User/SignIn
//http://localhost:5000/api/User/LogIn
// http://localhost:5000/protected/api/Route/U/user


let backendUrl = process.env.REACT_APP_BACKEND_URL;

// let authUrl = "http://localhost:5000/protected/api/Route"
// const url = "http://localhost:5000/api";

let authUrl = `${backendUrl}/protected/api/Route`
const url = `${backendUrl}/api`;

export const AppContext = createContext();

export const AppContextprovider  = ({children})  => {
    const [topic,setTopic] = useState([]);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [solvedTotalQuestions, setSolvedTotalQuestions] = useState(0);
    const [load, setload] = useState(false);
    const [loader, setloader] = useState(true); //cardcontainer

    const [darkMode, setDarkMode] = useState(false);
    const [LoginData,setLoginData] = useState({ email:'', password:'' });// logindata store
    const [signInData, setSignInData ] = useState({name:'', email:'', password:''}); //signUp Store
    const [isUser, setIsUser] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [userCompleteArray, setUserCompleteArray] = useState([]);
    const [totalQuestion, setQuestions] = useState({});
    const [role , setrole] = useState('');
    const [uploadQuestion, setQuestionUpload] = useState({topic:'',Name:'',link:''}); //questiondata
    const [verifyOtpData, setOtpData] = useState({otp:'',email:''});
    const [afterOtp, setAfterOtp] = useState({email:'', password:''});
    const [AddNote, setAddNote] = useState([]);
    
    // Initial check for user status
    // Check user session using cookies
    const checkUserStatus = async () => {
        try {
            const res = await axios.get(`${authUrl}/validate-session`, { withCredentials: true });
            // console.log("data after authorize -> ", res.data);
            // console.log("status");
            if (res.data.valid) {
                setIsUser(true);
                setUserInfo(res.data.user);
                // console.log("authorize -> ", res.data.user);
                setrole(res.data.user.role);
                // console.log("daata -> ",res.data.user_data.userNotes);
                setAddNote(res.data.user_data.userNotes);
                setUserCompleteArray(res.data.user_data.completeQuestions);
            } else {
                setIsUser(false);
            }
        } catch (err) {
            // console.error("valid -> ",err);
            setIsUser(false);
        }
    };
    useEffect(() => {
        // console.log("user data fatchting -> ");
        checkUserStatus();
    }, [onclick]);

    //logout krta hai 
    const handleLogOut = async() => {
        try{
            const res = await axios.post(`${authUrl}/Logout`,{},{withCredentials:true});
            setIsUser(false);
            setUserInfo({});
            setUserCompleteArray([]);
            setrole('');
            questions(topic, userInfo); // Re-render questions
            toastHot.success("Logout is Successfully");
        }catch(err){
            console.log(err);
            toast.error("Failed to log out. Please tru again. ");
        }
    }

    // Authorize user after login
    const AuthorizeUser = async (role) => { 
        let roleUrl = '';
        if (role === "User") roleUrl = `${authUrl}/U/user`;  
        if (role === 'Admin') roleUrl = `${authUrl}/A/admin`;
        setrole(role);// set user role specific

        console.log(roleUrl);

        try {
            const res = await axios.get(roleUrl, { withCredentials: true });
            setIsUser(true);
            // localStorage.setItem('isUser', 'true');
            AllData();
            // toastHot.success(res.data.message);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    //user login 
    const handleLogin = async () => {
        // console.log("user data fatchting -> ");
        try{
            const response = await axios.post(`${url}/User/LogIn`, 
                { email: LoginData.email, password: LoginData.password }, 
                { withCredentials: true }
            );            
            setUserInfo(response.data.data);
            // console.log("login", response.data.data);
            setAddNote(response.data.data.userNotes);
            setUserCompleteArray(response.data.data.completeQuestions);
            await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
            setrole(response.data.data.role);

            await AuthorizeUser(response.data.data.role);
            toastHot.success(response.data.message);
        }catch(err){
            console.log(err);
            if (err.response) {
                toast.error(err.response.data.message); // Show error message from backend
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        }
    }

    //function for login after the signup...
    const afterSignhandleLogin = async (loginData) => {
        // console.log("user data fatchting ->  ",loginData.email, loginData.password);
        try{
            const response = await axios.post(`${url}/User/LogIn`, 
                { email: loginData.email, password: loginData.password }, 
                { withCredentials: true }
            );            
            setUserInfo(response.data.data);
            // console.log("login", response.data.data.completeQuestions);
            setUserCompleteArray(response.data.data.completeQuestions);
            await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
            setrole(response.data.data.role);
            await AuthorizeUser(response.data.data.role);
            toastHot.success(response.data.message);
        }catch(err){
            console.log(err);
            if (err.response) {
                toast.error(err.response.data.message); // Show error message from backend
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        }
    }

    const Otpverification = async(otp,onClose) => {
        // console.log(verifyOtpData.email, otp);
        try{
            const res = await axios.post(`${authUrl}/Verify_Otp`,
                {email:verifyOtpData.email,otp},
                {withCredentials:true}
            );
            console.log(res.data);
            toast.success("OTP Verified ! ");
            await afterSignhandleLogin(afterOtp); // Automatically logs in the user after signup
            onClose();
        }catch(err){
            console.log("Invalid otp ")
            toast.warn("OTP Invalid");
        }   
    };

    //user signIn
    const handleSignIn = async () => {
        try {
            // Step 1: Sign up the user
            const response = await axios.post(`${url}/User/SignIn`, signInData);

            //verify otp ke liye email add kr rhe hai: 
            setOtpData({email:signInData.email});

            toastHot.success("OTP sended successfully !");

            setAfterOtp({ email: signInData.email, password: signInData.password });
            
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
            // await afterSignhandleLogin(loginData); // Automatically logs in the user after signup

            // Step 3: Attempt to log the user in
            // await handleLogin(loginData);            //need to solve..
        } catch (err) {
            console.error(err);
            toastHot.error(err.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    const UploadDSA_Questions = async() => {
        try{
            const res = await axios.post(`${url}/Upload/Questions`,
                {topic:uploadQuestion.topic, Name:uploadQuestion.Name, link:uploadQuestion.link},
                {withCredentials:true}
            );
            // console.log(res.data);
            setQuestionUpload({topic:'',Name:'',link:''});
            toast.success("Question Upload Successfully ");
        }catch(err){
            console.error(err);
            console.log("Error in upload to question");
            toast.error("Server Down Try After Sometime ! ");
        }
    }

    //maintain total and solved questions... 
    function allQuestions(data) {
        let total = 0, solve = 0;
        data.forEach(element => {
            element.questions.forEach(q => {
                total++; 
                if (q.status === 'Complete') solve++;
            });
        });
        setTotalQuestions(total);
        setSolvedTotalQuestions(solve);
    }
    
    const AllData = async () => {
        try {
            const response = await axios.get(`${url}/Get/Questions`);
            setTopic(response.data);
            // console.log("login call.. ", response.data);
            // Wait until the topic data is fetched, then call the questions function
            questions(response.data, userInfo);
            
            setload(true);
        } catch (error) {
            console.error(error.message);
            console.log('Topic Not Fetched from server');
        }
    }
    
    const questions = (topic, userInfo) => {
        // Extract the topics array
        const topics = topic?.question;
        let user = userInfo?.complete;

        // console.log("complete Array -> ", userCompleteArray, "userData -> ", user);     //atleast anyone have data...

        // console.log("topic after : ",topic, "user -> ",userInfo, "complete -> ",userInfo?.completeQuestions);
        if (!topics || (!user && !userCompleteArray)) {
            // console.log("topic before : ",topic,"  2 -> " ,user);
            return;
        }

        
        if(!user){
            user = userCompleteArray;
        }
        if(user && userCompleteArray ){
            user = userCompleteArray;
        }
        // console.log("usr -> ",userCompleteArray,user);
    
        // Iterate over each topic to check and update the status of questions
        const updatedTopics = topics.map(t => {
            return {
                ...t,
                questions: t.questions.map(q => {
                    const isComplete = user.includes(q._id);
                    return {
                        ...q,
                        status: isComplete ? 'Complete' : q.status,
                    };
                })
            };
        });
        // console.log("Updated Questions -> ", updatedTopics);
    
        // Set the updated topics object in state
        setQuestions(updatedTopics);
    
        // Calculate and set the total and solved questions count
        allQuestions(updatedTopics);
    
    };
    
    useEffect(() => {
        if (topic && userInfo) {
            questions(topic, userInfo);
        }
    }, [topic, userInfo]);
    
    const changeStatus = async(UserId, QuesId, newstatus) =>{
        // console.log("update data -> ", UserId, QuesId, newstatus);
        if(!UserId){ 
            toast.warn("Login/SignUp First");
            return;
        }
        try{
            const response = await axios.put(`${url}/Topic/${UserId}/Questions/${QuesId}/update-Status`,{
                status:newstatus
            });
            const updatedTopic = response.data.topicData;
            // console.log("status -> ",response.data.data.completeQuestions);
            setUserInfo("");
            setUserCompleteArray(response.data.data.completeQuestions);
            questions(topic,userInfo);
            setTopic(prev => {
                if (!Array.isArray(prev)) return prev;
                const updatedTopics = prev.map(t => {
                    if (t._id === UserId) return updatedTopic;
                    return t;
                });

                questions(updatedTopics, userInfo); // Re-render questions

                return updatedTopics;
            });
            toast.success("Status Updated successfully");
        }catch(error){
            console.error(error.message);
            console.log(error.message);
            console.log("error in change status");
            toast.warn("Server Down");
        }
    }

    const changeNotes = async(UserId, QuesId, note) =>{
        // console.log("note -> ", UserId);
        try{
            const response = await axios.put(`${url}/Topic/${UserId}/Questions/${QuesId}/update-notes`,{
                notes:note
            });
            const updatedTopic = response.data.data.userNotes;
            setAddNote(updatedTopic);
            setTopic(prev => {
                if (!Array.isArray(prev)) return prev;
                const updatedTopics = prev.map(t => {
                    if (t._id === UserId) return updatedTopic;
                    return t;
                });
                allQuestions(updatedTopics);
                return updatedTopics;
            });
            toast.success("Note Updated successfully");
        }catch(error){
            console.error(error.message);
            console.log(error.message);
            console.log("error in change status");
            toast.warn("Server Down");
        }
    }

    //handle dark and ligth mode
    useEffect(() => {
        // Check if dark mode is enabled in local storage
        // console.log("1 RE-RENDER for Dark Mode .......")

        const savedMode = localStorage.getItem('theme');
        if (savedMode === 'dark') {
            setDarkMode(true);
            document.body.classList.add('dark-mode');
        }
    }, []);
    
    useEffect(()=>{
        // console.log("2 RE-RENDER.......")
        const FetchData = async() =>{
            await AllData();
            questions();
            setloader(false);
        }
        FetchData();
    },[])

    return <AppContext.Provider value={{totalQuestion, topic, AllData, changeStatus, totalQuestions, solvedTotalQuestions,
                                        changeNotes,darkMode,setDarkMode,setLoginData,LoginData,handleLogin, 
                                        signInData, setSignInData, handleSignIn, isUser, userInfo , setUserInfo, setIsUser, 
                                        loader, handleLogOut,checkUserStatus,role,uploadQuestion,setQuestionUpload,UploadDSA_Questions,
                                        setOtpData,Otpverification,verifyOtpData,AddNote,userCompleteArray}}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}

