import type { FormButtonType } from "../../lib/type";
import type { QuoteType } from "../../lib/type";
import { useQuoteContext } from "../context/QuoteContext";

type InputButtonsProps = {
  formButton: FormButtonType;
  setFormButton: React.Dispatch<React.SetStateAction<FormButtonType>>;
  inProgress: number | boolean | null;
  handleDelete: () => void;
  setQuote: React.Dispatch<React.SetStateAction<QuoteType | null>>;
};

function InputButtons({
  formButton,
  setFormButton,
  inProgress,
  handleDelete,
  setQuote,
}: InputButtonsProps) {
  const { quoteDisplay } = useQuoteContext();

  const handleClickAdd = () => {
    setFormButton({ add: !formButton.add, update: false });
    setQuote(null);
  };

  const handleUpdate = () => {
    setFormButton({ add: false, update: !formButton.update });
  };

  return (
    <div
      id="input-buttons-div"
      style={{
        display: "grid",
        alignItems: "center",
        padding: "2rem",
        borderBottom: "1px solid white",
      }}
    >
      <button
        data-test="input-button-add"
        className={formButton.add ? "buttonFocus" : "button"}
        accessKey="add"
        onClick={handleClickAdd}
      >
        {formButton.add ? "Stäng formulär" : "Lägg till citat"}
      </button>

      <button
        data-test="input-button-update"
        className={formButton.update ? "buttonFocus" : "button"}
        accessKey="update"
        onClick={handleUpdate}
      >
        {formButton.update ? "Stäng formulär" : "Uppdatera citat"}
      </button>

      <button
        data-test="input-button-delete"
        className="button"
        onClick={handleDelete}
      >
        {quoteDisplay && inProgress === quoteDisplay.id ? (
          <div className="loader"></div>
        ) : (
          "Radera citat"
        )}
      </button>
    </div>
  );
}
export default InputButtons;
