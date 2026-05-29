import { defaultMaterials } from "../data/defaultMaterials";
import { generateId } from "../utils/generateId";
import { prepareMaterialData } from "../utils/calculateMaterial";
import { localStorageService } from "./localStorageService";

const MATERIAL_STORAGE_KEY = "buildtrack_materials";

export const materialService = {
    getMaterials() {
        return localStorageService.get(MATERIAL_STORAGE_KEY, defaultMaterials);
    },

    saveMaterials(materials) {
        localStorageService.set(MATERIAL_STORAGE_KEY, materials);
        return materials;
    },

    addMaterial(materialData) {
        const materials = this.getMaterials();

        const newMaterial = {
            ...prepareMaterialData(materialData),
            id: generateId("mat"),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const updatedMaterials = [newMaterial, ...materials];
        return this.saveMaterials(updatedMaterials);
    },

    updateMaterial(materialId, materialData) {
        const materials = this.getMaterials();

        const updatedMaterials = materials.map((material) =>
            material.id === materialId
                ? {
                    ...material,
                    ...prepareMaterialData(materialData),
                    updatedAt: new Date().toISOString(),
                }
                : material
        );

        return this.saveMaterials(updatedMaterials);
    },

    deleteMaterial(materialId) {
        const materials = this.getMaterials();
        const updatedMaterials = materials.filter(
            (material) => material.id !== materialId
        );

        return this.saveMaterials(updatedMaterials);
    },
};