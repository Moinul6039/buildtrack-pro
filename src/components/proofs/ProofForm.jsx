import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";
import { proofCategories } from "../../data/proofCategories";
import { validateProof } from "../../utils/validateProof";
import { fileToBase64 } from "../../utils/fileToBase64";

const ProofForm = ({ onSubmit }) => {
    const today = new Date().toISOString().slice(0, 10);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        amount: "",
        date: today,
        note: "",
        image: null,
        imageName: "",
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0] || null;

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                setPreviewImage(reader.result);
            };

            reader.readAsDataURL(file);
            setFormData((prev) => ({
                ...prev,
                image: file,
                imageName: file.name,
            }));
        } else {
            setPreviewImage(null);
            setFormData((prev) => ({
                ...prev,
                image: null,
                imageName: "",
            }));
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            category: "",
            amount: "",
            date: today,
            note: "",
            image: null,
            imageName: "",
        });
        setPreviewImage(null);
        setErrors({});
        setSubmitError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitError("");

        const validation = validateProof(formData, true);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        if (!formData.image) {
            setErrors((prev) => ({ ...prev, image: "Proof image is required." }));
            return;
        }

        setLoading(true);

        try {
            const image = await fileToBase64(formData.image);
            await onSubmit({
                ...formData,
                image,
            });
            resetForm();
        } catch (error) {
            setSubmitError("Unable to read the selected image. Please try another file.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {submitError && (
                <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {submitError}
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
                <Input
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Proof title"
                    error={errors.title}
                    required
                />

                <Select
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    options={proofCategories}
                    placeholder="Select category"
                    error={errors.category}
                    required
                />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Input
                    label="Amount"
                    name="amount"
                    type="number"
                    min="0"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    error={errors.amount}
                />

                <Input
                    label="Date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    error={errors.date}
                    required
                />

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Image Proof
                        <span className="ml-1 text-rose-500">*</span>
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                    />
                    {errors.image && (
                        <p className="mt-1 text-xs font-medium text-rose-600">{errors.image}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Note</label>
                <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Optional note or description"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                />
            </div>

            {previewImage && (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="mb-3 text-sm font-medium text-slate-700">Image preview</p>
                    <img
                        src={previewImage}
                        alt="Proof preview"
                        className="h-60 w-full rounded-2xl object-cover"
                    />
                </div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Uploading..." : "Upload Proof"}
            </Button>
        </form>
    );
};

export default ProofForm;
