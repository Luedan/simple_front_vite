import { ReactNode, useContext, useEffect } from "react";
import { modalContext } from "../containers/modalProvider";

const useModal = ({ body }: { body: ReactNode }) => {
  const { closeModal: cm, openModal: om, setBody } = useContext(modalContext);
  const openModal = () => {
    om();
  };

  const closeModal = () => {
    cm();
  };

  useEffect(() => {
    setBody(body);
  }, [setBody]);

  return { openModal, closeModal };
};

export default useModal;
