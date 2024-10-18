import axios, { AxiosProgressEvent } from "axios";
import { useState } from "react";


const FileUpload = () => {

  const [file,setfile] = useState<any>();
  const [preview,setpreview] = useState<any>();
  const [progress,setprogress] = useState<number>(0);


  const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    
    if(files && files.length > 0){
      const file = files[0];
      setfile(file);
      const fileurl = URL.createObjectURL(file);
      setpreview(fileurl);

      //creating a form which will be uploaded into the server and the uploading progress wil be displayed

      const formData = new FormData();
      formData.append('file', file);

      axios.post('https://v2.convertapi.com/upload ', formData, {
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total !== undefined) {
            // Calculate the percentage of the upload done
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setprogress(percentCompleted); // Update the progress bar
          }
        }
      })
      .then(response => {
        console.log('File uploaded successfully');
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });

    }

  }

  return (
    <div className="w-8/12 mx-auto my-28">
        <h1 className="font-bold text-5xl text-center mb-12">FileUpload</h1>
         
         <div className="flex flex-col items-start gap-8">
           <div >
           <label htmlFor="fileupload">Upload Files:-</label>
           <input type="file" id="fileupload" onChange={handleFileChange}/>
           </div>

           <div>
            <label htmlFor="progress">Progress:- </label>
            <progress  id="progress" value={progress} max="100"/>
           </div>
           
           <div>
            {
              preview && (<img className="w-[400px] h-[400px] object-cover" src={preview} alt="" />)
            }
           </div>
 
         </div>

    </div>
  )
}

export default FileUpload

//this is a project showcasing file upload with progress bar

//DIFFERENCE BETWEEN TWO PROCESS OF FILEUPLOAD:- 

// Both FileReader and URL.createObjectURL are used to handle file uploads or previews, but they differ in how they process files and their specific use cases.

// When to Use FileReader:
// FileReader is used to read the contents of a file asynchronously. You typically use it when you need to access the file's data directly (e.g., for reading text, converting to Base64, or previewing an image).

// Use Cases for FileReader:
// Reading File as Base64 Data URL: Ideal for previewing images or embedding files directly into HTML as a Base64-encoded string.
// Reading File as Text: Useful when you want to process the contents of text files (e.g., .txt, .csv, .json).
// Reading File as Binary Data (ArrayBuffer): When you need to work with binary data (e.g., for image manipulation, encryption).
// Example with FileReader:

// const handleFileChange = (event) => {
//   const file = event.target.files[0];
//   const reader = new FileReader();

//   // Example: Read file as Base64 Data URL for image preview
//   reader.onload = () => {
//     const base64String = reader.result; // Data URL as Base64 string
//     console.log(base64String);
//   };

//   reader.readAsDataURL(file); // Read file as a Data URL (Base64)
// };
// When to Use URL.createObjectURL:
// URL.createObjectURL creates a temporary URL that references the file object, allowing you to use that URL as a source for displaying images, videos, etc. This method is often more efficient than FileReader for displaying large media files since it doesn't require reading the entire file into memory.

// Use Cases for URL.createObjectURL:
// Previewing Media Files (Images, Videos, PDFs): Useful when you only need to display or reference the file temporarily, without needing to manipulate the content.
// Working with Large Files: Since it doesn't load the file into memory, URL.createObjectURL is better suited for large files.
// Temporary File Reference: The URL is temporary and will be released automatically when no longer needed, or you can explicitly revoke it using URL.revokeObjectURL().
// Example with URL.createObjectURL:
// javascript
// Copy code
// const handleFileChange = (event) => {
//   const file = event.target.files[0];
  
//   if (file) {
//     const objectURL = URL.createObjectURL(file);
//     document.getElementById("preview").src = objectURL; // Set image preview
//   }
// };
// Key Differences:
// Feature	FileReader	URL.createObjectURL
// Memory Usage->	Loads entire file into memory---------	Creates a temporary URL without loading file into memory
// Data Access->	Can access the file's data (Base64, text, binary)----------	Cannot access file content, only creates a URL
// Best For->	Reading and processing file data---------	Displaying or referencing files temporarily
// Use Cases->	Previewing images, reading text files, processing file data	----------Previewing large media files (e.g., images, videos)
// Security	Safer for small files, can be used for inline embedding (e.g., Base64 in <img>)---------	URL is temporary and auto-revoked, better for large media
// Summary:
// Use FileReader when you need to process or access the content of the file (e.g., for text processing or converting to Base64).
// Use URL.createObjectURL when you simply need a temporary URL to display or reference the file (e.g., previewing large images or videos). It's faster and consumes less memory for large files, but doesn't give you access to the file's contents.
// For most image previews or file previews, URL.createObjectURL is typically more efficient and performant.


// WHY WE USE FORMDATA OBJECT SOMEWHERE AND NORMAL JS FORMHANDLING SOMEWHERE??? WHAT IS THE DIFFERENCE BW THEM???

// ### What is `FormData`?

// `FormData` is a JavaScript object that allows you to construct key-value pairs to represent form fields and their values. It's particularly useful for sending complex data, like files and text fields, to a server through HTTP requests, in the same format as a form submission.

// ### When to Use `FormData`:
// - **File Uploads**: When you need to send files (images, documents, etc.) from the frontend to the backend.
// - **Multipart Form Submissions**: If you have a form containing both text fields and file inputs (e.g., a user profile form with an avatar upload).
// - **AJAX Form Submissions**: If you want to send form data without refreshing the page, using `fetch()` or `Axios`.

// ### How is `FormData` Different from Normal Form Handling?

// | **Normal Form Handling**                  | **FormData**                                    |
// |-------------------------------------------|-------------------------------------------------|
// | Data is sent as URL-encoded string (like `application/x-www-form-urlencoded`) | Data is sent as `multipart/form-data`, ideal for handling files |
// | Usually deals with simple text inputs     | Perfect for handling both text and file uploads |
// | Requires manual serialization (e.g., `JSON.stringify`) for complex data | Automatically processes form data, including binary files like images |
// | Fields submitted as URL-encoded text      | Fields are submitted as separate parts, making it efficient for large data (e.g., files, binary content) |
// | Less suitable for file uploads            | Specifically designed for sending files, images, or binary data |

// ### Example:

// ```javascript
// // Create a new FormData object
// const formData = new FormData();
// formData.append("name", "John Doe");  // Add text field
// formData.append("file", fileInput.files[0]);  // Add file

// // Send the form data via fetch()
// fetch("/upload", {
//   method: "POST",
//   body: formData,  // FormData automatically formats the data
// })
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.error("Error:", error));
// ```

// ### Key Differences:
// 1. **File Support**: `FormData` can handle binary file uploads (e.g., images, PDFs), while normal form handling is typically limited to text fields.
// 2. **Data Format**: With `FormData`, the data is sent as `multipart/form-data`, which allows files to be transferred efficiently, whereas regular forms use `application/x-www-form-urlencoded`.
// 3. **Automatic Handling**: `FormData` automatically serializes fields, whereas normal form handling often requires additional work to serialize complex objects.

// ### Memorable Takeaway:
// Use `FormData` whenever you need to handle file uploads or when sending a combination of text and files. It simplifies the process of submitting forms with rich data, especially in modern web applications, making it much more efficient than the traditional method of encoding form data.

//HOW TO SHOW FILE UPLOAD PROGRESS:-

// To show a file upload progress in a progress bar, you'll need to track the upload progress using either Axios (which has built-in support for progress tracking) or XMLHttpRequest (which supports progress events). The progress will be calculated as a percentage and used to update a progress bar in the UI.

// Option 1: Using Axios for Upload Progress
// Axios provides an onUploadProgress function, which can be used to monitor the progress of a file upload. Here’s how you can implement it:

// Steps:
// Create a form to upload files.
// Use FormData to send the file to the backend.
// Track the upload progress using the onUploadProgress event.
// Update the progress bar UI with the percentage of the upload.







// Overview of Axios onUploadProgress

// The onUploadProgress option in an Axios request is a callback function that allows you to track the progress of a file upload. This is particularly useful for showing a progress bar in your UI, indicating how much of the file has been uploaded so far.

// Syntax Breakdown
// Here's a simplified explanation of the syntax and how it works:

// javascript
// Copy code
// axios.post(url, data, {
//   onUploadProgress: (progressEvent) => {
//     // Callback logic here
//   }
// });
// axios.post: This is an Axios method for making a POST request. You provide it with three parameters:

// url: The endpoint where you want to send the data.
// data: The data you want to send to the server, such as a FormData object containing your file.
// config: An optional configuration object where you can specify various options, including onUploadProgress.
// onUploadProgress: This is a property within the config object. It takes a function as its value, which is called during the upload process.

// progressEvent: The parameter passed to the onUploadProgress function. This is an object containing information about the upload progress, including:

// loaded: The number of bytes that have been uploaded so far.
// total: The total number of bytes to be uploaded (i.e., the file size).
// Example Walkthrough
// Here's the example we discussed earlier, with added comments for clarity:

// javascript
// Copy code
// import axios, { AxiosProgressEvent } from 'axios';

// // Function to handle file upload
// const handleUpload = () => {
//   if (!file) return; // Ensure a file is selected

//   const formData = new FormData();
//   formData.append('file', file); // Append the selected file to FormData

//   axios.post('https://example.com/upload', formData, {
//     onUploadProgress: (progressEvent: AxiosProgressEvent) => {
//       // This function is called periodically during the upload process
//       if (progressEvent.total !== undefined) {
//         // Check if total is defined to prevent TypeScript errors
//         const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//         setProgress(percentCompleted); // Update state with the calculated percentage
//       }
//     }
//   })
//   .then(response => {
//     console.log('File uploaded successfully');
//   })
//   .catch(error => {
//     console.error('Error uploading file:', error);
//   });
// };
// How onUploadProgress Works:
// During Upload: As the file is being uploaded, Axios will periodically call the onUploadProgress function.

// Calculate Percentage: Inside this function, you can calculate the percentage of the upload that has completed using:

// javascript
// Copy code
// const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
// progressEvent.loaded: The amount of data uploaded so far.
// progressEvent.total: The total size of the file being uploaded.
// The calculation gives you a percentage of how much of the file has been uploaded.
// Update UI: You can then update the state or UI with this percentage, allowing users to see the upload progress in real-time.

// Summary
// onUploadProgress is a callback provided by Axios to track the progress of file uploads.
// It receives a progressEvent object with useful information about the upload status.
// You can use this information to calculate the upload percentage and update your UI accordingly.