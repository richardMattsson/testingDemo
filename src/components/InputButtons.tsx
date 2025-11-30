import type { FormButtonType } from "../../lib/type";
import type { QuoteType } from "../../lib/type";
// import { useQuoteContext } from "../context/QuoteContext";

type InputButtonsProps = {
  formButton: FormButtonType;
  setFormButton: React.Dispatch<React.SetStateAction<FormButtonType>>;
  inProgress: number | boolean | null;
  handleDelete: () => void;
  quote: QuoteType | null;
  setQuote: React.Dispatch<React.SetStateAction<QuoteType | null>>;
};

function InputButtons({
  formButton,
  setFormButton,
  inProgress,
  handleDelete,
  quote,
  setQuote,
}: InputButtonsProps) {
  const handleClickAdd = () => {
    setFormButton({ add: !formButton.add, update: false });
    setQuote(null);
  };

  const handleUpdate = () => {
    setFormButton({ add: false, update: !formButton.update });
  };

  return (
    <div
      data-cy="input-buttons-container"
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
        onClick={handleClickAdd}
      >
        {formButton.add ? "Stäng formulär" : "Lägg till citat"}
      </button>

      <button
        data-test="input-button-update"
        className={formButton.update ? "buttonFocus" : "button"}
        onClick={handleUpdate}
      >
        {formButton.update ? "Stäng formulär" : "Uppdatera citat"}
      </button>

      <button
        data-test="input-button-delete"
        className="button"
        onClick={handleDelete}
      >
        {quote && inProgress === quote.id ? (
          <div className="loader"></div>
        ) : (
          "Radera citat"
        )}
      </button>
    </div>
  );
}
export default InputButtons;
