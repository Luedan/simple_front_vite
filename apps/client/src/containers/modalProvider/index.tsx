import { Modal } from "antd";
import {
  createContext,
  SetStateAction,
  useState,
  Dispatch,
  ReactNode,
} from "react";

interface ModalContext {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setBody: Dispatch<SetStateAction<ReactNode>>;
  openModal: () => void;
  closeModal: () => void;
}

export const modalContext = createContext<ModalContext>({
  isOpen: false,
  setIsOpen: () => {},
  openModal: () => {},
  closeModal: () => {},
  setBody: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [body, setBody] = useState<ReactNode>(<></>);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  

  return (
    <modalContext.Provider value={{ isOpen, setIsOpen, openModal, closeModal, setBody }}>
      <Modal open={isOpen} onCancel={closeModal}>
        {body}
      </Modal>
      {children}
    </modalContext.Provider>
  );
};
