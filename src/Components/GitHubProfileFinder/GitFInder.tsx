import { log } from "console";
import { useEffect, useState } from "react";

const GitFInder = () => {
  const [userName, setuserName] = useState<string>("Phani2425");
  const [userData, setUserData] = useState<any>(null);
  const [loading, setloading] = useState<boolean>(false);

  const apiUrl = `https://api.github.com/users/${userName}`;

  const fetchData =  () => {
    setloading(true);
    fetch(apiUrl).then((result) => {
        if(!result.ok){
            throw new Error('error ocuured');
        }
        return result.json();
    }).then((data)=>{
        setUserData(data);
    })
    .catch((err) => {
    if(err instanceof Error){
    console.log(err.message);
    }
    else{
    console.log('An unknown error occured');
    }
  });
  setloading(false);
}

  const keypressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if(userName === ''){
        return;
      }else{
        fetchData();
        setuserName("");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="flex flex-col justify-center items-center gap-5 w-4/12 h-screen mx-auto"
      onKeyDown={keypressHandler}
    >
      <div className="flex justify-center items-center gap-3">
        <input
          type="text"
          className="px-3 py-2 bg-slate-800 placeholder:text-white text-white rounded-lg"
          placeholder="Enter UserName..."
          value={userName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setuserName(e.target.value);
          }}
        ></input>

        <button
          className="px-3 py-2 bg-slate-800 text-white rounded-lg"
          onClick={() => {
            if (userName === "") {
              return;
            } else {
              fetchData();
              setuserName("");
            }
          }}
        >
          Submit
        </button>
      </div>

      <div className="flex  items-center justify-center p-7 border border-gray-900 w-full h-fit rounded-lg">
        {loading ? (
          <div className="spinner"></div>
        ) :  (
            <div className=" flex flex-col items-center justify-center gap-3 text-lg font-semibold">
              <img
                src={`${userData?.avatar_url}`}
                alt="user"
                className="h-32 w-32 rounded-full object-cover"
              />
  
              <a
                rel="noreferrer"
                href={userData?.html_url}
                target="_blank"
                className="text-blue-500"
              >
                {userData?.login}
              </a>
              <span>{`User Joined on : - ${userData?.created_at}`}</span>
              <span>{`Public repos ${userData?.public_repos}`}</span>
              <span>{`Followers ${userData?.followers}`}</span>
              <span>{`Following ${userData?.following}`}</span>
            </div>
          )}
      </div>
    </div>
  );
};

export default GitFInder;

// by chnace me bhul gaya tha ki fetch() ek promise return karta hai  if we dont use async await
//mane ethi ame sync await au try catch block use kariki api call karuche au excepption handling karuche but we can do it in very less code by prmise handling using .then() and .catch() functions which take a callback function in them and pass the result into them as attribute

//we will try it in one of the projects in this series


    // I REVIDSED THE TARGET ATTRIBUTE AND THE ACTION ATTRIBUTE OF HTML

    //_self
    //_blank
    //_top
    //_parent

    //IF WE DONT DO e.preventDefault() the form data will be sent to the url mentioned in action attribute and page get refreshed

//i learned about why we do e.preventDefault() when we handle the for, Submission event.....

//Using e.preventDefault() in form submission is important for controlling the default behavior of the form, which is to send the form data to the server and reload the page. Here are the main reasons to use e.preventDefault():

// Prevent Page Reload: By default, when a form is submitted, the browser refreshes the page. Using e.preventDefault() stops this behavior, allowing you to handle the form submission with JavaScript instead.

// Custom Validation: You may want to validate the form data before sending it to the server. Calling e.preventDefault() allows you to check if the inputs are valid and display error messages without the page refreshing.

// Asynchronous Submission: When using AJAX or Fetch API to send data to the server, e.preventDefault() prevents the default submission and allows you to submit the data asynchronously without refreshing the page.

// Control Over Submission Logic: It gives you full control over what happens when the form is submitted. You can log data, update the UI, or handle submission success/failure in a way that suits your application's needs.

// Example
// Here’s a simple example of using e.preventDefault() in a React form submission:

// jsx
// Copy code
// import React, { useState } from 'react';

// function MyForm() {
//   const [inputValue, setInputValue] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent default form submission
//     console.log('Form submitted:', inputValue);
//     // Additional logic here (e.g., send data to an API)
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         required
//       />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
// In this example, e.preventDefault() ensures that the form does not refresh the page upon submission, allowing you to log the input value or perform any other actions you want.

// You said:
// so even if i have the whole form data and i dont use e.preventdefault and want to send data to server then cant i do that
// ChatGPT said:
// ChatGPT
// If you have the form data and you don't use e.preventDefault(), the form will still be submitted to the server when the submit button is clicked, but there are some important implications:

// Default Behavior: The default behavior of a form submission in HTML is to send a POST or GET request to the URL specified in the form's action attribute and refresh the page. If you're okay with this behavior and want the form data to be sent to the server in the usual manner, then you don't need to call e.preventDefault().

// Page Refresh: When the form is submitted without calling e.preventDefault(), the page will refresh, which may lead to a poor user experience. If you want to maintain the state of your application or provide a smoother user experience (e.g., showing a loading indicator, validating data before submission, or displaying success/error messages), you should prevent the default behavior.

// Using JavaScript for Submission: If you want to handle the form submission using JavaScript (e.g., sending the data with fetch or axios), you should use e.preventDefault() to stop the default action. This allows you to perform the data submission asynchronously without a page refresh.

// Example of Not Using e.preventDefault()
// Here’s an example where you don't use e.preventDefault() and let the form submit naturally:

// jsx
// Copy code
// function MyForm() {
//   const handleSubmit = (e) => {
//     // No e.preventDefault() here
//     console.log('Form submitted');
//   };

//   return (
//     <form action="/submit" method="POST" onSubmit={handleSubmit}>
//       <input type="text" name="myInput" required />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
// In this case, when you click "Submit":

// The form data is sent to the /submit endpoint via a POST request.
// The page will refresh, and any console log will be lost unless you inspect the console before the page reloads.
// Conclusion
// In summary, if you want to send form data to the server without a page refresh or additional handling, you can omit e.preventDefault(). However, for better control and user experience, especially with modern web applications, it's common to use e.preventDefault() and handle form submission via JavaScript.

// I ALSO LEARNED THAT WHY IN INPUT FIELDS WE USE VALUE ATTRIBUTE AND ASSIGN THE A STATE VARIBALE STORING THE INPUT VALUE TO THAT VALUE ATTRIBUTE ITSELF....

// BECAUSE AS WE ARE DEALING  WITH ONLY INPPUT FIELDS AND NOT ANY FORM AND WE WANT THAT UPON TYPING AND SUBMMITTING SOMETHING THE INO]PUT FIELD SHOULD GET EMPTY AGAIN... MEANS WE WANT TO CONTROLL WHAT SHOULD BE SHOWN IN THAT INPUT FIEELD AND WE CAN DO THAT BY A STATE VARIABLE USED TO STORE ITS VALUE AND PAASING THAT VALUE WHEN SUBMITTED....

// SO WHEN SUBMITTED I WILL MAKE THAT STATE VARIABLE A EMPTY STRING SO THE INPUT WILL ALSO BECOME EMPTY
