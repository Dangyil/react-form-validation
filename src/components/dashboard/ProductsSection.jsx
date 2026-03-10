import ProductForm from "../ProductForm";
import ProductList from "../ProductList";

export default function ProductsSection({
    products,
    productsLoading,
    showProductForm,
    setShowProductForm,
    editingProduct,
    setEditingProduct,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
}) {

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                <button
                    onClick={() => {
                        setShowProductForm(true);
                        setEditingProduct(null);
                    }}
                    className="submit-btn"
                >
                    Add Product
                </button>
            </div>

            {showProductForm && (
                <ProductForm
                    product={editingProduct}
                    onSubmit={editingProduct ?
                        (data) => handleUpdateProduct(editingProduct._id, data) :
                        handleCreateProduct
                    }
                    onCancel={() => {
                        setShowProductForm(false);
                        setEditingProduct(null);
                    }}
                />
            )}

            <ProductList
                products={products}
                loading={productsLoading}
                onEdit={(product) => {
                    setEditingProduct(product);
                    setShowProductForm(true);
                }}
                onDelete={handleDeleteProduct}
            />
        </div>
    )
}