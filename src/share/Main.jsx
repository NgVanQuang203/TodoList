import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { actions, useStore } from '../store';
import soundCompleted from '../assets/item-pick-up-38258.mp3';
import soundAdd from '../assets/marimba-bloop-2-188149.mp3';

// Icons
import { BsStar } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { GoTrash } from 'react-icons/go';
import storage from '../store/storage';

const Main = ({ value, title, margin }) => {
  const [state, dispatch] = useStore();
  const [isEditTab, setIsEditTab] = useState('');
  let { todos, todoInput, important, progress, editTodoIndex } = state;
  const [audio] = useState([new Audio(soundCompleted), new Audio(soundAdd)]);
  const inputRefs = useRef([]);

  useEffect(() => {
    storage.setImportant(important);
    handleProgress();
  }, [todos, important]);

  const handleAdd = () => {
    if (todoInput !== '') {
      dispatch(actions.addTodo(todoInput));
      audio[1].currentTime = 0.0;
      audio[1].play();
      dispatch(actions.setTodoInput(''));
    }
  };
  const handleProgress = () => {
    if (todos.length > 0 || important.length > 0) {
      const count = todos.filter((obj) => obj.completed === true).length;
      const countI = important.filter((obj) => obj.completed === true).length;
      progress = ((count + countI) / (todos.length + important.length)) * 100;

      dispatch(actions.progress_todo(progress.toFixed(1)));
      storage.setPROGRESS(progress.toFixed(1));
    } else {
      progress = 0;
      dispatch(actions.progress_todo(progress.toFixed(1)));
      storage.setPROGRESS(progress.toFixed(1));
    }
  };
  return (
    <div className="sm:ml-[307px] ml-16 ">
      <div className="container">
        {/* Progress completed */}
        <div
          className="px-4 h-16 sm:text-xl fixed right-0 top-0 left-16 sm:left-[307px]
         flex justify-center items-center gap-3 shadow-md z-40 bg-white"
        >
          <p className="whitespace-nowrap text-[16px]">Task Completed</p>
          <div className="overflow-hidden relative process-bar rounded-xl border-2 border-black h-10">
            {/* process-bar--completed */}
            <div
              style={{ width: progress + '%' }}
              className={`h-10 flex justify-center items-center bg-[#06d6a0]  duration-500 transition-all font-semibold`}
            ></div>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{progress}%</span>
          </div>
        </div>
        {/* Header */}
        {title === 'Important' || (
          <div className="sm:px-8 px-4 py-4 left-16 fixed right-0 sm:left-[307px] top-[63px] shadow-md z-40 bg-white">
            <div>
              <h1 className="text-5xl">My Task</h1>
            </div>
            <div className="text-xl flex gap-3 items-center mt-8 ">
              <input
                className="border-2 border-black bg-gray-50   rounded-xl w-4/5 h-14 outline-0 p-4 placeholder:text-gray-600 "
                autoFocus
                value={todoInput}
                onChange={(e) => {
                  dispatch(actions.setTodoInput(e.target.value));
                }}
                placeholder="Task Content..."
                type="text"
                name=""
                id=""
              />
              <button
                onClick={handleAdd}
                className="w-1/5 border-2 h-14 border-black rounded-xl
             active:bg-[#06d6a0] 
              sm:hover:bg-[#06d6a0] sm:hover:text-white duration-300 transition-all "
              >
                Add Task
              </button>
            </div>
          </div>
        )}
        {/* Main */}
        <div>
          <div className={` ${margin} sm:px-8 px-4 py-4 text-xl`}>
            <h2 className="text-4xl mb-3">{title}</h2>
            <div>
              <ul className="todo-list flex flex-col list-none gap-4">
                {value.map((item, index) => (
                  <li
                    key={index}
                    className={`
                    ${editTodoIndex === index && title === isEditTab ? 'editing' : ''}
                     border-2 border-black min-h-16 flex flex-col rounded-xl overflow-hidden text-2xl py-2 px-4`}
                  >
                    <div className={` view flex gap-3 sm:items-center justify-between w-full flex-col sm:flex-row`}>
                      <div className="flex gap-3 items-center">
                        <input
                          defaultChecked={item.completed ?? false}
                          onChange={() => {
                            if (!item.completed) {
                              audio[0].currentTime = 0.0;
                              audio[0].play();
                            }
                            item.completed = !item.completed;
                            storage.set(todos);
                            storage.setImportant(important);
                            handleProgress();
                          }}
                          className="toggle  relative appearance-none rounded-full border-2 border-black p-2 h-[30px] w-[30px] cursor-pointer duration-300"
                          type="checkbox"
                          name=""
                          id=""
                        />
                        <p className="content">{item.content}</p>
                      </div>
                      <div className="flex gap-3 justify-end">
                        {title === 'Important' ? (
                          ''
                        ) : (
                          <button
                            title="Important"
                            onClick={() => dispatch(actions.important_todo(index))}
                            className="h-11 w-11 text-2xl rounded-xl 
                        flex items-center justify-center border-2 border-black
                        duration-300 hover:bg-[#06d6a0] hover:text-white flex-1 sm:flex-auto "
                          >
                            {<BsStar />}
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (title === 'Important') {
                              setIsEditTab(title);
                              dispatch(actions.indexEdit_todo(index));
                            } else {
                              setIsEditTab(title);
                              dispatch(actions.indexEdit_todo(index));
                            }
                          }}
                          title="Edit"
                          className="h-11 w-11 text-2xl rounded-xl 
                        flex items-center justify-center border-2 border-black
                        duration-300 hover:bg-[#06d6a0] hover:text-white  flex-1 sm:flex-auto"
                        >
                          {<CiEdit />}
                        </button>
                        <button
                          onClick={() => {
                            title === 'Important'
                              ? dispatch(actions.deleteimp_todo(index))
                              : dispatch(actions.delete_todo(index));
                          }}
                          title="Delete"
                          className="h-11 w-11 text-2xl rounded-xl 
                        flex items-center justify-center border-2 border-black
                        duration-300 hover:bg-[#06d6a0] hover:text-white flex-1 sm:flex-auto "
                        >
                          {<GoTrash />}
                        </button>
                      </div>
                    </div>
                    {/* Edit task */}
                    <div className={`hidden edit flex-col edit`}>
                      <input
                        className="outline-none w-full h-14 text-xl py-2 pr-3"
                        type="text "
                        defaultValue={item.content}
                        ref={(el) => (inputRefs.current[index] = el)}
                      />
                      <div className=" flex justify-end gap-3">
                        <button
                          onClick={() => dispatch(actions.indexEdit_todo(null))}
                          className="border-2 border-black rounded-xl text-xl 
                        h-12 min-w-24 hover:bg-[#06d6a0] hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            const defaultValue = inputRefs.current[index].value;
                            dispatch(actions.edit_todo(title, defaultValue));
                            dispatch(actions.indexEdit_todo(null));
                          }}
                          className="hover:border-2 text-white bg-[#06d6a0]
                         border-black rounded-xl text-xl h-12 min-w-24"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
