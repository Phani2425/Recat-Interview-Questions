import { useRef } from "react";

interface ModalProp {
    setmodalState : any;
}


const Modal:React.FC<ModalProp> =  ({setmodalState}) => {

  const refObj = useRef(null);

  const clickHandler = (e:React.MouseEvent<HTMLDivElement>) => {
   if(e.target === refObj.current){
     setmodalState(false);
   }
  }

  return (
    <div ref={refObj}  onClick={clickHandler} className="w-screen h-screen absolute bg-opacity-60 bg-black inset-0 flex justify-center items-center">
          <div  className="p-10 bg-white rounded-lg shadow-lg h-fit w-fit flex flex-col gap-3 justify-center items-center">
            <h1 className="text-3xl font-bold">Modal Title</h1>
            <p>This is a modal. Click Close or outside to close.</p>
            <button className="px-4 py-2 rounded-lg bg-red-500 text-white" onClick={()=> {setmodalState(false)}}>Close</button>
          </div>
    </div>
  )
}

export default Modal


// In TypeScript, the type of the event object depends on the type of the event you're handling. Here are some common types of events and their corresponding types:

// 1. **For DOM events (e.g., `click`, `change`, `input`):**
//    - **`MouseEvent`**: For mouse-related events like `click`, `dblclick`, `mousedown`, `mouseup`, etc.
//    - **`KeyboardEvent`**: For keyboard-related events like `keydown`, `keyup`, etc.
//    - **`FocusEvent`**: For focus-related events like `focus`, `blur`.
//    - **`ChangeEvent`**: For form element changes like `<input>`, `<select>`, etc.
//    - **`InputEvent`**: For input events like text input changes in an input field.
//    - **`Event`**: For more generic events like when working with events that don't have a specific type.

// ### Example Types of Event Handlers:

// 1. **Click Event (`MouseEvent`)**:
//    ```typescript
//    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//      console.log(event); // MouseEvent
//    };
//    ```

// 2. **Input/Change Event (`ChangeEvent`)**:
//    ```typescript
//    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//      console.log(event.target.value); // ChangeEvent for <input> element
//    };
//    ```

// 3. **Keyboard Event (`KeyboardEvent`)**:
//    ```typescript
//    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
//      console.log(event.key); // KeyboardEvent for <input> element
//    };
//    ```

// 4. **Generic Event (`Event`)**:
//    ```typescript
//    const handleGenericEvent = (event: React.SyntheticEvent) => {
//      console.log(event); // General event type
//    };
//    ```

// In React with TypeScript, events are usually of the `React.SyntheticEvent` type, which is a wrapper around the native event types. Specific event types, like `React.MouseEvent` or `React.ChangeEvent`, extend `SyntheticEvent`.