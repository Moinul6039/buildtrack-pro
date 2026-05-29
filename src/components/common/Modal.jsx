import { X } from "lucide-react";

const Modal = ({ isOpen, title, children, onClose, maxWidth = "max-w-2xl" }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
            <div className={`w-full ${maxWidth} rounded-2xl bg-white shadow-2xl`}>
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <h2 className="text-lg font-bold text-slate-900">{title}</h2>

                    <button
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="max-h-[80vh] overflow-y-auto px-6 py-5">{children}</div>
            </div>
        </div>
    );
};

export default Modal;