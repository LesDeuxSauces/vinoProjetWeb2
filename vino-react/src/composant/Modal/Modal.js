import "./Modal.css";

function Modal({ message, onDialog, produit }) {
    return (
        <div className="modal" onClick={() => onDialog(false)}>
            <div className="modal__infos" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal__infos--message">{message}</h3>
                <p className="modal__infos--produit" >{produit} ?</p>
                <div className="modal__infos--boutons">
                    <button className="modal__bouton--oui" onClick={() => onDialog(true)}>
                        Confirmer
                    </button>
                    <button className="modal__bouton--non" onClick={() => onDialog(false)}>
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Modal;