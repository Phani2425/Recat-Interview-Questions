import axios from "axios";
import { useEffect, useState } from "react";

interface todoItem {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  status: string; // this will be used to categorize the todos into different status
}

const DragandDrop = () => {
  const [loading, setloading] = useState<boolean>(false);
  const [tododata, settododata] = useState<todoItem[]>([]);

  const fetchTddoData = async () => {
    try {
      setloading(true);
      const response = await axios.get(
        "https://dummyjson.com/todos?limit=5&skip=0"
      );
      if (response.status) {
        console.log(response.data.todos);
        //as the data we are getting have randomm values in status so we will create a new fiel for each todo so that on the basis of that value we can categorize them

        //initially every todo is work in progress
        const updatedData = response.data.todos.map((todo: any) => {
          return { ...todo, status: "wip" };
        });
        settododata(updatedData);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("An unknown error occurred");
      }
    } finally {
      setloading(false);
    }
  };

  //calling api for getting todo data
  useEffect(() => {
    fetchTddoData();
  }, []);

  const DragStartHandler = (event: React.DragEvent, id: number) => {
    event.dataTransfer.setData("text", JSON.stringify(id));
  };
  const dropeHandler = (event: React.DragEvent, status: string) => {
    event.preventDefault();
    const todoId = JSON.parse(event.dataTransfer.getData("text"));
    const updatedData = tododata.map((todoItem) => {
      if (todoItem.id === todoId) {
        return { ...todoItem, status };
      } else {
        return todoItem;
      }
    });

    settododata(updatedData);
  };

  //function which will create two array one will have wip todo and another will have completed todos and return them
  const renderTodos = () => {
    const todoObject: { wip: JSX.Element[]; completed: JSX.Element[] } = {
      wip: [],
      completed: [],
    };

    tododata.length &&
      tododata.forEach((todoItem) => {
        const key = todoItem.status as keyof typeof todoObject;
        todoObject[key].push(
          <div
            draggable
            onDragStart={(e) => {
              DragStartHandler(e, todoItem.id);
            }}
            className="w-[200px] min-h-[50px] bg-yellow-500 flex justify-center items-center px-3 py-2"
          >
            {todoItem.todo}
          </div>
        );
        return;
      });

    return todoObject;
  };

  //   early return
  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col gap-3 justify-center items-center">
        <div className="spinner"></div>
        <h1  className="text-lg font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="w-7/12 h-screen flex flex-col justify-center mx-auto">
      <h1 className="font-bold text-5xl mb-16 text-center">Drag And Drop</h1>

      <div className="flex gap-5 justify-between ">
        <div
          className="flex flex-col gap-3"
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            dropeHandler(e, "wip");
          }}
        >
          <h2 className="text-center font-semibold text-2xl">
            Work In Progress
          </h2>
          <div className="flex flex-col gap-3 justify-start items-center">
            {renderTodos().wip}
          </div>
        </div>
        <div
          className="flex flex-col gap-3"
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            dropeHandler(e, "completed");
          }}
        >
          <h2 className="text-center font-semibold text-2xl">Completed</h2>
          <div className="flex flex-col gap-3 justify-start items-center">
            {renderTodos().completed}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragandDrop;

// always use  loading state in api calls

//also i revised the concept  of early return when some condition is satisfied

//mene instanceof ko isinstanceof soch raha tha

//means this react component is nothing but a function and each function returns something like that  this function too returns either jsx or tsx code when it get called [when its name is written like a tag] which get renderd in the webpage.....so like that if any condition achived then we can return something too before the actual return

//an array having html elements can be written inside the curlybarces as tsx or jsx code and that willl render all the elemnts in the array

//here for rendering the todos in separate section on the basis of their status i could use filter too but here i have used a unique and interesting way  where i will call a method which will return an object which contains two array having todos of a perticular status that array will directly rendered in the tsx return statement in their respective section
