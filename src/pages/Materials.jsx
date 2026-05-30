import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Modal from "../components/common/Modal";
import Select from "../components/common/Select";
import MaterialForm from "../components/materials/MaterialForm";
import MaterialTable from "../components/materials/MaterialTable";
import { materialCategories } from "../data/materialCategories";
import { materialService } from "../services/materialService";
import { useAuth } from "../context/AuthContext";
import { formatCurrency } from "../utils/formatCurrency";

const Materials = () => {
    const [materials, setMaterials] = useState(() =>
        materialService.getMaterials()
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const { isAdmin } = useAuth();

    const totalMaterialCost = useMemo(() => {
        return materials.reduce((total, material) => total + material.totalCost, 0);
    }, [materials]);

    const totalUsedMaterials = useMemo(() => {
        return materials.reduce((total, material) => total + material.usedQty, 0);
    }, [materials]);

    const lowStockCount = useMemo(() => {
        return materials.filter(
            (material) => material.remainingQty <= material.requiredQty * 0.2
        ).length;
    }, [materials]);

    const filteredMaterials = useMemo(() => {
        return materials.filter((material) => {
            const searchMatch =
                material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                material.category.toLowerCase().includes(searchTerm.toLowerCase());

            const categoryMatch = categoryFilter
                ? material.category === categoryFilter
                : true;

            return searchMatch && categoryMatch;
        });
    }, [materials, searchTerm, categoryFilter]);

    const handleOpenAddModal = () => {
        setEditingMaterial(null);
        setIsModalOpen(true);
    };

    const handleEdit = (material) => {
        setEditingMaterial(material);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingMaterial(null);
    };

    const handleSaveMaterial = (formData) => {
        let updatedMaterials;

        if (editingMaterial) {
            updatedMaterials = materialService.updateMaterial(
                editingMaterial.id,
                formData
            );
        } else {
            updatedMaterials = materialService.addMaterial(formData);
        }

        setMaterials(updatedMaterials);
        handleCloseModal();
    };

    const handleDelete = (materialId) => {
        if (!isAdmin) {
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this material?"
        );

        if (!confirmDelete) return;

        const updatedMaterials = materialService.deleteMaterial(materialId);
        setMaterials(updatedMaterials);
    };

    

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Materials</h1>
                    <p className="mt-1 text-sm text-slate-500">Manage project materials</p>
                </div>

                <Button onClick={handleOpenAddModal}>
                    <Plus size={18} />
                    Add Material
                </Button>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
                <Card>
                    <p className="text-sm font-medium text-slate-500">Total Materials</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                        {materials.length}
                    </h3>
                </Card>

                <Card>
                    <p className="text-sm font-medium text-slate-500">
                        Total Material Cost
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                        {formatCurrency(totalMaterialCost)}
                    </h3>
                </Card>

                <Card>
                    <p className="text-sm font-medium text-slate-500">
                        Low Stock Materials
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                        {lowStockCount}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                        Total used quantity: {totalUsedMaterials}
                    </p>
                </Card>
            </div>

            <Card>
                <div className="mb-5 grid gap-4 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <div className="relative">
                            <Search
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <Input
                                placeholder="Search by material name or category..."
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                className="pl-11"
                            />
                        </div>
                    </div>

                    <Select
                        value={categoryFilter}
                        onChange={(event) => setCategoryFilter(event.target.value)}
                        options={materialCategories}
                        placeholder="All Categories"
                    />
                </div>

                <MaterialTable
                    materials={filteredMaterials}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    canDelete={isAdmin}
                />
            </Card>

            <Modal
                isOpen={isModalOpen}
                title={editingMaterial ? "Edit Material" : "Add New Material"}
                onClose={handleCloseModal}
            >
                <MaterialForm
                    editingMaterial={editingMaterial}
                    onSubmit={handleSaveMaterial}
                    onCancel={handleCloseModal}
                />
            </Modal>
        </div>
    );
};

export default Materials;