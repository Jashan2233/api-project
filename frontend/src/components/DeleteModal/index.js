import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spot";
import "./DeleteModal.css";

const DeleteModal = ({ spotId }) => {
  console.log(spotId);
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const yesButton = async () => {
    await dispatch(deleteSpotThunk(spotId));
    history.push("/spots/current");
    closeModal();
  };

  const noButton = async () => {
    closeModal();
  };

  return (
    <div className="delete-spot-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot?</p>
      <div className="delete-spot-modal-button">
        <button onClick={yesButton} className="yes-button">
          Yes (Delete Spot)
        </button>
        <button onClick={noButton} className="no-button">
          No (Keep Spot)
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
