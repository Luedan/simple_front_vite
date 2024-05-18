import useModal from "../../hooks/useModal";

export default function LoginPage() {
  const modal = useModal({ body: <div>Modal</div> });

  return (
    <div>
      <h1>Login</h1>

      <div className="flex flex-col">
        <button onClick={modal.openModal}>Abrir</button>
        <button onClick={modal.closeModal}>Cerrar</button>
      </div>
    </div>
  );
}
