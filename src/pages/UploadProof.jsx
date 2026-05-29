import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { proofService } from "../services/proofService";
import Card from "../components/common/Card";
import ProofForm from "../components/proofs/ProofForm";
import ProofCard from "../components/proofs/ProofCard";
import ImagePreviewModal from "../components/proofs/ImagePreviewModal";

const UploadProof = () => {
    const { currentUser } = useAuth();
    const [proofs, setProofs] = useState([]);
    const [preview, setPreview] = useState({ isOpen: false, image: "", title: "" });

    useEffect(() => {
        if (currentUser) {
            setProofs(proofService.getProofsByUser(currentUser.id));
        }
    }, [currentUser]);

    const handleAddProof = async (proofData) => {
        proofService.addProof({
            ...proofData,
            uploadedBy: currentUser.name,
            uploadedByRole: currentUser.role,
            uploadedById: currentUser.id,
        });

        setProofs(proofService.getProofsByUser(currentUser.id));
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
                    <h1 className="text-2xl font-bold text-slate-900">Upload Proof</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Submit work or payment proof images and track site uploads.
                    </p>
                </div>
            </div>

            <Card>
                <ProofForm onSubmit={handleAddProof} />
            </Card>

            <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">My Uploaded Proofs</h2>
                        <p className="text-sm text-slate-500">
                            View all proofs uploaded by you.
                        </p>
                    </div>
                </div>

                {proofs.length === 0 ? (
                    <Card>
                        <div className="text-center text-slate-500">
                            No proof uploads found yet. Use the form above to upload proof images.
                        </div>
                    </Card>
                ) : (
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {proofs.map((proof) => (
                            <ProofCard
                                key={proof.id}
                                proof={proof}
                                canDelete={false}
                                onDelete={() => {}}
                                onImageClick={handleImageClick}
                            />
                        ))}
                    </div>
                )}
            </div>

            <ImagePreviewModal
                isOpen={preview.isOpen}
                image={preview.image}
                title={preview.title}
                onClose={handleClosePreview}
            />
        </div>
    );
};

export default UploadProof;
