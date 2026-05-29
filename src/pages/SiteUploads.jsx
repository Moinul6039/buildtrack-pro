import { useEffect, useState } from "react";
import { proofService } from "../services/proofService";
import Card from "../components/common/Card";
import ProofCard from "../components/proofs/ProofCard";
import ImagePreviewModal from "../components/proofs/ImagePreviewModal";

const SiteUploads = () => {
    const [proofs, setProofs] = useState([]);
    const [preview, setPreview] = useState({ isOpen: false, image: "", title: "" });

    useEffect(() => {
        setProofs(proofService.getAllProofs());
    }, []);

    const handleDeleteProof = (proofId) => {
        const confirmed = window.confirm("Are you sure you want to delete this proof?");
        if (!confirmed) return;

        proofService.deleteProof(proofId);
        setProofs(proofService.getAllProofs());
    };

    const handleImageClick = (image) => {
        setPreview({ isOpen: true, image, title: "Proof Preview" });
    };

    const handleClosePreview = () => {
        setPreview({ isOpen: false, image: "", title: "" });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Site Uploads</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        View and manage all uploaded proofs from site engineers.
                    </p>
                </div>
            </div>

            {proofs.length === 0 ? (
                <Card>
                    <div className="text-center text-slate-500">
                        No uploaded proofs found. Site engineers can upload proof images from their dashboard.
                    </div>
                </Card>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {proofs.map((proof) => (
                        <ProofCard
                            key={proof.id}
                            proof={proof}
                            canDelete={true}
                            onDelete={handleDeleteProof}
                            onImageClick={handleImageClick}
                        />
                    ))}
                </div>
            )}

            <ImagePreviewModal
                isOpen={preview.isOpen}
                image={preview.image}
                title={preview.title}
                onClose={handleClosePreview}
            />
        </div>
    );
};

export default SiteUploads;
