import { useAppContext } from "../UseContext/context";

function AdminPanal(){
    const {uploadQuestion,setQuestionUpload,UploadDSA_Questions} = useAppContext();
    const handledata = (e) => {
        setQuestionUpload( (prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }
    const QuestionDataSubmitHandler = async(e) => {
        e.preventDefault();
        try{
            await UploadDSA_Questions();
        }catch(err){
            console.error(err);
        }
    }
    return (
        <div>
            <div className="mt-[8rem] flex  justify-center flex-col items-center gap-[2rem]">
                <h1 className="text-[2rem] font-bold">UPLOAD QUESTIONS </h1>
                
                <form 
                 onSubmit={QuestionDataSubmitHandler}
                 className="flex justify-center bg-black-500 flex-col gap-[2rem] border h-[20rem] w-[35%] p-[1rem] text-black" 
                >
                    
                    <input 
                     type="text"  
                     placeholder="Topic name"
                     className="h-[2.5rem] px-[0.5rem] text-black "
                     name="topic" id="topic"
                     onChange={handledata}
                     value={uploadQuestion.topic}
                     required
                    />
                    <input 
                     type="text"  
                     placeholder="Question name"
                     className="h-[2.5rem] px-[0.5rem]"
                     name="Name" id="Name"
                     onChange={handledata}
                     value={uploadQuestion.Name}
                     required
                    />
                    <input 
                     type="url"  
                     placeholder="Question link"
                     className="h-[2.5rem] px-[0.5rem]"
                     name="link" id="link"
                     onChange={handledata}
                     value={uploadQuestion.link}
                     required
                    />
                    <input type="submit"
                     className="text-white font-bold h-[2.5rem] bg-green-500 text-[1.2rem] cursor-pointer"
                     
                    />
                </form>

            </div>
        </div>
    )
};

export default AdminPanal;