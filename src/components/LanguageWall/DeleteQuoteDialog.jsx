import * as Dialog from "@radix-ui/react-alert-dialog";
import { Blockquote, Quote } from "@radix-ui/themes";

const DeleteQuoteDialog = ({
  open,
  setOpen,
  quote,
  handleDelete,
  handleCancel,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fadeIn" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
        >
          <div className="flex items-start justify-between mb-4">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Delete Quote
            </Dialog.Title>
          </div>

          <Dialog.Description className="text-gray-600 mb-2">
            Are you sure you want to delete this quote?
          </Dialog.Description>
          <Quote className="italic ">{quote}</Quote>
          <div className="flex gap-3 justify-end mt-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteQuoteDialog;
