import "./ModalInfos.css";

// Source : https://www.youtube.com/watch?v=p7J7u_9_3FI
function ModalInfos({ message, color }) {
  return (
    <div className="modalInfos">
      <div className="modalInfos__infos">
        <h3 className="modalInfos__infos--message">{message}</h3>
      </div>
    </div>
  );
}

export default ModalInfos;