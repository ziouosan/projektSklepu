import React, { useContext, useState, useRef, useEffect } from "react";

import bemCssModules from "bem-css-modules";

import Modal from "../Modal/Modal";

import { default as LoginFormStyles } from "./LoginForm.module.scss";
import { StoreContext } from "../../store/StoreProvider";
import request from "../../helpers/request";

const style = bemCssModules(LoginFormStyles);

const LoginForm = ({ handleOnClose, isModalOpen }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [validateMessage, setValidateMessage] = useState("");

  const { setUser } = useContext(StoreContext);

  const handleonChangeLogin = (event) => setLogin(event.target.value);
  const handleonChangePassword = (event) => setPassword(event.target.value);
  const handleOnCloseModal = (event) => {
    event.preventDefault();
    handleOnClose();
  };

  const resetStateOfInputs = () => {
    setLogin("");
    setPassword("");
    setValidateMessage("");
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const { data, status } = await request.post("/users", { login, password });

    if (status === 200) {
      setUser(data.user);
      resetStateOfInputs();
      handleOnClose();
    } else {
      setValidateMessage(data.message);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      resetStateOfInputs();
    }
  }, [isModalOpen]);

  const validateMessageComponent = validateMessage.length ? (
    <p className={style("validate-message")}>{validateMessage}</p>
  ) : null;

  return (
    <Modal
      handleOnClose={handleOnClose}
      isOpen={isModalOpen}
      shouldBeCloseOnOutsideClick={true}
    >
      {validateMessageComponent}
      <form className={style()} method="post" onSubmit={handleOnSubmit}>
        <div className={style("row")}>
          <label>
            Login:
            <input type="text" value={login} onChange={handleonChangeLogin} />
          </label>
        </div>
        <div className={style("row")}>
          <label>
            Hasło:
            <input
              type="password"
              value={password}
              onChange={handleonChangePassword}
            />
          </label>
        </div>
        <div className={style("row")}>
          <button type="submit">Zaloguj</button>
          <button onClick={handleOnCloseModal} type="button">
            Anuluj
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginForm;
