import { localStorageService } from "./localStorageService";
import { generateId } from "../utils/generateId";

const PROOF_STORAGE_KEY = "buildtrack_proofs";

export const proofService = {
    getProofs() {
        return localStorageService.get(PROOF_STORAGE_KEY, []);
    },

    saveProofs(proofs) {
        return localStorageService.set(PROOF_STORAGE_KEY, proofs);
    },

    addProof(proofData) {
        const proofs = this.getProofs();
        const now = new Date().toISOString();

        const proof = {
            id: generateId("proof"),
            title: proofData.title.trim(),
            category: proofData.category,
            amount: proofData.amount !== undefined && proofData.amount !== "" ? Number(proofData.amount) : 0,
            date: proofData.date,
            note: proofData.note?.trim() || "",
            image: proofData.image,
            imageName: proofData.imageName || "",
            uploadedBy: proofData.uploadedBy,
            uploadedByRole: proofData.uploadedByRole,
            uploadedById: proofData.uploadedById,
            createdAt: now,
            updatedAt: now,
        };

        const updatedProofs = [proof, ...proofs];
        this.saveProofs(updatedProofs);
        return updatedProofs;
    },

    deleteProof(proofId) {
        const proofs = this.getProofs();
        const updatedProofs = proofs.filter((proof) => proof.id !== proofId);
        this.saveProofs(updatedProofs);
        return updatedProofs;
    },

    getProofsByUser(userId) {
        return this.getProofs().filter((proof) => proof.uploadedById === userId);
    },

    getAllProofs() {
        return this.getProofs();
    },
};
