import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import useModalFast from "../../hooks/useModalNormal";
import { Button, Modal, Popover } from "antd";
import { CopyOutlined } from "@ant-design/icons";

function toClipboard(texto: string) {
  // Verifica si el navegador soporta la API del Portapapeles
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(texto)
      .then(function () {
        console.log("Texto copiado al portapapeles");
      })
      .catch(function (err) {
        console.error("Error al copiar el texto al portapapeles: ", err);
      });
  } else {
    // Fallback para navegadores que no soportan la API del Portapapeles
    const elementoTemporal = document.createElement("textarea");
    elementoTemporal.value = texto;
    document.body.appendChild(elementoTemporal);
    elementoTemporal.select();
    elementoTemporal.setSelectionRange(0, 99999); // Para dispositivos móviles
    document.execCommand("copy");
    document.body.removeChild(elementoTemporal);
    console.log("Texto copiado al portapapeles usando el método de respaldo");
  }
}

const ContentHints = () => {
  return (
    <div>
      <div className="flex flex-row">
        <p>Cliente</p> <CopyOutlined className="cursor-pointer ml-3" onClick={() => toClipboard('{{client}}')}/>
      </div>
    </div>
  );
};

export default function LoginPage() {
  const editor = useRef(null);
  const modal = useModalFast();
  const [content, setContent] = useState("");
  const [base64, setBase64] = useState("");

  const sendHtml = async () => {
    const res = await fetch("http://localhost:4502/pdf-creator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ html: content }),
    });

    const data = await res.text();
    setBase64(data);
    modal.openModal();
  };

  return (
    <div>
      <h1>Login</h1>
      <Popover content={ContentHints} title="Hints!!!!">
        <Button type="primary">Hints</Button>
      </Popover>
      <div className="flex w-full justify-center">
        <JoditEditor
          className="w-9/12"
          ref={editor}
          value={content}
          config={{}}
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        />
      </div>

      <div className="flex flex-col">
        <button onClick={sendHtml}>Obtener HTML</button>
        <button onClick={() => setBase64("")}>Limpiar</button>
      </div>

      <Modal
        onCancel={modal.closeModal}
        open={modal.isOpen}
        footer={false}
        centered
        width={"80%"}
      >
        {base64 && (
          <embed
            className="mt-10"
            src={base64}
            type="application/pdf"
            width="100%"
            height="600px"
          />
        )}
      </Modal>
    </div>
  );
}
