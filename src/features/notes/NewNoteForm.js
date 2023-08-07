import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewNoteMutation } from "./notesApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { foods } from "../../config/foods";
import Foods from "../../components/Foods";
import { customers } from "../../config/customers";
import Customers from "../../components/Customers";

const NewNoteForm = ({ users }) => {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();
  console.log("users", typeof users[0].id);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(users[0].id);
  const [requirepass, setRequirepass] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);
  //////////////////////////////////////////////

  ////////////////////
  /////////////////////

  /////////////////////////////////////////////////////////////////

  // const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const [customerName, setSelectedCustomer] = useState("");
  const [food, setSelectedFood] = useState("");
  const onUserIdChanged = (e) => setUserId(e.target.value);
  console.log("food", food);
  console.log("customer", customerName);
  console.log("text", text);
  console.log("userId", userId);
  const canSave =
    [food, customerName, text, userId].every(Boolean) && !isLoading;
  // console.log("canSave", canSave);

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewNote({ user: userId, food, customerName, text });
    }
  };

  const options = users.map((user) => {
    return (
      <option
        key={user.id}
        value={user.id}
      >
        {user.username}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form
        className="form"
        onSubmit={onSaveNoteClicked}
      >
        <div className="form__title-row">
          <h2>New Order</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>

        <Foods
          options={foods}
          setRequirepass={setRequirepass}
          requirepass={requirepass}
          food={food}
          setSelectedFood={setSelectedFood}
        />
        <Customers
          options={customers}
          requirepass={requirepass}
          setSelectedCustomer={setSelectedCustomer}
          customer={customerName}
        />
        <label
          className="form__label"
          htmlFor="title"
        >
          {/* Title:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label
          className="form__label"
          htmlFor="text"
        > */}
          <p>Details:</p>
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass} ${
            requirepass ? `inputStatus` : ""
          }`}
          id="text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />

        <label
          className="form__label form__checkbox-container"
          htmlFor="username"
        >
          ASSIGNED TO:
        </label>
        <select
          id="username"
          name="username"
          className="form__select"
          value={userId}
          onChange={onUserIdChanged}
        >
          {options}
        </select>
      </form>
    </>
  );

  return content;
};

export default NewNoteForm;
