import Modal from "../common/Modal";

const ImagePreviewModal = ({ isOpen, image, title, onClose }) => {
    return (
        <Modal isOpen={isOpen} title={title || "Proof Image"} onClose={onClose}>
            <div className="flex justify-center p-4">
                <img
                    src={image}
                    alt={title || "Proof preview"}
                    className="max-h-[70vh] w-full max-w-4xl rounded-3xl object-contain"
                />
            </div>
        </Modal>
    );
};

export default ImagePreviewModal;
