import React, { use } from "react";
import { useState, useEffect } from "react";
import {
  SelectBudgetOptions,
  SelectTravelersList,
} from "../constants/options.jsx";
import { AI_PROMPT } from "../constants/options.jsx";
// import { chatSession } from "../service/AIModel.jsx";
import PlaceAutocomplete from "../components/PlaceAutocomplete";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
// import { load } from "mime";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";  
import { useNavigate} from "react-router-dom";
import { Button } from "../components/ui/button";


function CreateTrip() {
  // const [place, setPlace] = useState();

  const [openDiolog, setOpenDiolog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    location: null,
    noOfDays: "",
    budget: "",
    traveler: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // const login = useGoogleLogin({
  //   onSuccess: (codeResp) => console.log(codeResp),
  //   onError: (error) => console.log(error),
  // })

const login = useGoogleLogin({
  onSuccess: (tokenResponse) => {
    console.log("Google token:", tokenResponse);
    getUserProfile(tokenResponse);
  },
  onError: (error) => console.log(error),
});


  const OnGenerateTrip = async () => {
    
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDiolog(true);
      return;
    }

    if (
      !formData.location ||
      !formData.noOfDays ||
      !formData.budget ||
      !formData.traveler
    ) {
      alert("Please fill all details");
      return;
    }

    if (formData.noOfDays > 5) {
      alert("For trips longer than 5 days, please contact support.");
      return;
    }

    
    const FINAL_PROMPT = AI_PROMPT
    .replace("{location}", formData?.location?.label)
      .replace("{duration}", formData?.noOfDays)
      .replace("{travelers}", formData?.traveler)
      .replace("{budget}", formData?.budget);

    // console.log(FINAL_PROMPT)

    // const result = await chatSession.sendMessage(FINAL_PROMPT);
    // console.log(result.response.text());
    try {
      setLoading(true);

      // const response = await fetch("http://localhost:5000/generate-trip", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     prompt: FINAL_PROMPT,
      //   }),
      // });

      const response = await axios.post(
        // "http://localhost:5000/generate-trip",
        `${import.meta.env.VITE_BACKEND_URL}/generate-trip`,
        { prompt: FINAL_PROMPT }
      );

      const result = response.data.text;
      console.log("AI Result:", result);

      await saveAiTrip(result); 

      // const data = await response.json();

      // if (!response.ok) {
      //   throw new Error(data.error || "Failed to generate trip");
      // }

      // console.log(data.text); // 👈 AI response here
    } catch (error) {
      console.error("Trip generation failed:", error);
      alert("Something went wrong while generating the trip.");
    }finally {
    setLoading(false);  //  always runs
    
  }

    // const result = response.data;
    
    // saveAiTrip(result?.response?.text());
  };

const saveAiTrip=async(tripData)=>{

  setLoading(true);

  const docId=Date.now().toString();

  const user=JSON.parse(localStorage.getItem("user"));

  try {

      //  Remove markdown if AI returns ```json
      const cleanedData = tripData
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      //  Parse into proper JSON
      const parsedTripData = JSON.parse(cleanedData);

      //  Convert to pretty JSON format
      const prettyTripData = JSON.parse(
        JSON.stringify(parsedTripData, null, 2)
      );

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: prettyTripData,   // ✅ same variable name
        userEmail: user?.email,
        id: docId
      });
      setLoading(false);
      navigate("/view-trip/" + docId);

    } catch (error) {
      console.error("JSON Parse Error:", error);
      alert("AI returned invalid JSON. Please try again.");
    }
  


  //   await setDoc(doc(db, "AITrips", docId), {
  //   userSelection:formData,
  //   tripData:JSON.parse(tripData), //JSON.parse - use for pretty formatting in db
  //   userEmail:user?.email,
  //   id:docId
  // });
  // setLoading(false);
  // navigate('/view-trip/'+docId);
}

  const getUserProfile = async (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem("user", JSON.stringify(resp.data));
      setOpenDiolog(false);
      OnGenerateTrip();

    })

//     const login = useGoogleLogin({
//       onSuccess: (tokenResponse) => {
//       console.log(tokenResponse);
//       getUserProfile(tokenResponse); // ✅ CALL IT
//   },
//   onError: (error) => console.log(error),
// });
  }

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40 mt-10 max-w-7xl mx-auto ">
      <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl">
        Tell Us Your Travel Preferences ✈️🎄
      </h2>
      <p className="mt-3 text-gray-500 text-base sm:text-lg">
        Just provide some basic information , and our trip planner will generate
        a optimized ilinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice ?
          </h2>
          {/* <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          /> */}

          <PlaceAutocomplete
            onSelect={(place) => {
              handleInputChange("location", place);
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip ?
          </h2>
          <input
            className=" w-full border border-[1.5px] rounded-md p-3 text-base"
            placeholder="Ex.3"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium ">What is Your Budget ?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 mb-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.budget == item.title && "shadow-lg border-2 border-[#3ad286]"}`}
            >
              <h2 className="texr-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on travelling with on your next adventure ?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 mb-5">
          {SelectTravelersList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.traveler == item.people && "shadow-lg border-2 border-[#3ad286]"}`}
            >
              <h2 className="texr-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div></div>
      <div className="my-10 flex justify-center sm:justify-end ">
        <button disabled={loading} onClick={OnGenerateTrip} className="text-[#3ad286]">
         {loading ? <AiOutlineLoading3Quarters className="animate-spin h-7 w-7"/> : " Generate Trip"}
        </button>
      </div>

      {/* <Dialog open={openDiolog} onOpenChange={setOpenDiolog}>
        
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className='flex gap-3'><img className='h-[30px] w-[30px] rounded-xl' src="/ymlogo.jpg" alt="" /><p className='text-gray-700 font-bold'>YatraMitra</p></div>
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>sign in to the App with Google authentication securely</p>

              <button onClick={login}
               className="mt-5 w-full flex gap-4 items-center" >
                <FcGoogle className="h-7 w-7"/>
                Sign In With Google</button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog> */}

      <Dialog open={openDiolog} onOpenChange={setOpenDiolog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="sr-only">
        Sign in to YatraMitra
      </DialogTitle>

      <div className="flex gap-3 items-center">
        <img
          src="/ymlogo.jpg"
          className="h-[30px] w-[30px] rounded-xl"
          alt="YatraMitra"
        />
        <span className="font-bold text-gray-700">
          YatraMitra
        </span>
      </div>

      <h2 className="font-bold text-lg mt-7">
        Sign In With Google
      </h2>

      <DialogDescription>
        Sign in to the app with Google authentication securely.
      </DialogDescription>
    </DialogHeader>
    
    <Button
    disabled={loading}
      onClick={login}
      className="mt-5 w-full flex gap-4 items-center"
    >
      
      <FcGoogle className="h-7 w-7" />
      Sign In With Google
      
    </Button>
    
  </DialogContent>
</Dialog>


    </div>
  );
}

export default CreateTrip;
