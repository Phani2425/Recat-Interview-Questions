import { useState } from "react";
import './form.css'

function FormValidation() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
  });

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateInput(name, value);
  }

  function validateInput(getName, getValue) {
    switch (getName) {
      case "username":
        setErrors((prevErrors) => ({
          ...prevErrors,
          username:
            getValue.length < 3 ? "Username must be at least 3 characters" : "",
        }));

        break;
      case "email":
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(getValue)
            ? ""
            : "Invalid email address",
        }));

        break;
      case "password":
        setErrors((prevErrors) => ({
          ...prevErrors,
          password:
            getValue.length < 5 ? "Password must be at least 5 characters" : "",
        }));

        break;

      default:
        break;
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    // const validateErrors = {};

    // Object.keys(formData).forEach((dataItem) => {
    //   validateInput(dataItem, formData[dataItem]);
    //   if (errors[dataItem]) {
    //     validateErrors[dataItem] = errors[dataItem];
    //   }
    // });

    // setErrors((prevErrors) => ({
    //   ...prevErrors,
    //   ...validateErrors,
    // }));

    // if (Object.values(validateErrors).every((error) => error === "")) {
    //   //perform your form submission logic
    // } else {
    //   console.log("error is present. Please fix");
    // }
  }

  console.log(errors);

  return (
    <div className="form-validation-container">
      <h1>Simple Form Validation</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleFormChange}
          />
          <span>{errors?.username}</span>
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleFormChange}
          />
          <span>{errors?.email}</span>
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleFormChange}
          />
          <span>{errors?.password}</span>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormValidation;

// i need to study about regex and how to create and test one

// When to Use RegExp (Regular Expressions)
// You should use regular expressions (RegExp) when you need to perform complex searches, validations, or manipulations on strings. Some common scenarios include:

// Input Validation: Ensuring user input matches a certain format (e.g., emails, phone numbers, passwords).
// String Matching: Finding specific patterns in text (e.g., searching for keywords or substrings).
// Text Substitution: Replacing or modifying portions of a string based on patterns.
// Text Parsing: Extracting structured information from unstructured text (e.g., parsing dates, URLs).
// Splitting Strings: Dividing strings into arrays based on patterns (e.g., splitting a CSV row by commas).
// How to Use RegExp in JavaScript
// Creating a Regular Expression:
// You can create a RegExp object in two ways:

// Literal notation: Uses forward slashes.

// javascript
// Copy code
// const regex = /pattern/flags;
// Example:

// javascript
// Copy code
// const regex = /hello/g;  // Searches for "hello" globally (g flag)
// Constructor notation: Uses the RegExp constructor.

// javascript
// Copy code
// const regex = new RegExp('pattern', 'flags');
// Example:

// javascript
// Copy code
// const regex = new RegExp('hello', 'g');  // Same as above
// Common RegExp Methods:
// test(): Checks if a pattern exists in a string. Returns true or false.

// javascript
// Copy code
// const regex = /abc/;
// const result = regex.test('abc123');  // true
// match(): Returns an array of matches or null if no match is found.

// javascript
// Copy code
// const text = 'hello world hello';
// const regex = /hello/g;  // 'g' flag ensures all matches are found
// const result = text.match(regex);  // ['hello', 'hello']
// replace(): Replaces matches of a pattern in a string.

// javascript
// Copy code
// const text = 'The sky is blue';
// const regex = /blue/;
// const result = text.replace(regex, 'green');  // "The sky is green"
// split(): Splits a string into an array based on the pattern.

// javascript
// Copy code
// const text = 'apple,banana,orange';
// const regex = /,/;
// const result = text.split(regex);  // ['apple', 'banana', 'orange']
// exec(): Executes a search for a match in a string and returns an array or null. It is useful when you need to capture groups within a match.

// javascript
// Copy code
// const regex = /(\d{3})-(\d{3})-(\d{4})/;
// const result = regex.exec('Phone: 123-456-7890'); 
// // result[0] = '123-456-7890', result[1] = '123', result[2] = '456', result[3] = '7890'
// Regex Flags:
// g: Global search (find all matches).
// i: Case-insensitive matching.
// m: Multiline mode.
// s: Allows . to match newline characters.
// u: Unicode matching.
// y: Sticky matching (starts matching from the last index).