import React, { useEffect, useState } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../../api/services/api';
import './index.css';
import { Modal, Form, Input, Button } from 'antd';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null); // 当前选中的产品
    const [showModal, setShowModal] = useState(false); // 控制模态框显示隐藏
    const [form] = Form.useForm(); // 使用 Form 组件的 Form 实例
    const [currentPage, setCurrentPage] = useState(1); // 当前页数
    const pageSize = 10; // 每页显示的产品数量

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                const productsData = response.data.data.map(product => ({
                    ...product,
                    productId: product.product_id,
                    imageUrl: product.image_url,
                    categoryId: product.category_id,
                    brandId: product.brand_id,
                    dateAdded: product.date_added,
                    stock: product.stock_alert,
                    purchasePrice: product.purchase_price,
                    salePrice: product.sale_price
                }));
                setProducts(productsData);
                setLoading(false);
            } catch (error) {
                console.error("获取产品数据失败:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
        form.setFieldsValue(product); // 设置表单初始值为选中产品的值
    };

    const handleAdd = () => {
        setSelectedProduct(null);
        setShowModal(true);
        form.resetFields(); // 重置表单所有字段为空白
    };

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields(); // 校验并获取表单数据
            const updatedProduct = { ...selectedProduct, ...values };
            await updateProduct({
                productId: updatedProduct.productId,
                imageUrl: updatedProduct.imageUrl,
                name: updatedProduct.name,
                categoryId: updatedProduct.categoryId,
                brandId: updatedProduct.brandId,
                dateAdded: updatedProduct.dateAdded,
                specifications: updatedProduct.specifications,
                quantity: updatedProduct.quantity,
                stock: updatedProduct.stock,
                purchasePrice: updatedProduct.purchasePrice,
                salePrice: updatedProduct.salePrice,
                remarks: updatedProduct.remarks
            });

            // 更新产品列表中的数据
            const updatedProducts = products.map(product =>
                product.productId === updatedProduct.productId ? updatedProduct : product
            );
            setProducts(updatedProducts);
            setShowModal(false);
        } catch (error) {
            console.error("更新产品失败:", error);
        }
    };

    const handleAddProduct = async () => {
        try {
            const values = await form.validateFields(); // 校验并获取表单数据
            const newProduct = { ...values };
            const response = await addProduct({
                productId: newProduct.productId,
                imageUrl: newProduct.imageUrl,
                name: newProduct.name,
                categoryId: newProduct.categoryId,
                brandId: newProduct.brandId,
                dateAdded: newProduct.dateAdded,
                specifications: newProduct.specifications,
                quantity: newProduct.quantity,
                stock: newProduct.stock,
                purchasePrice: newProduct.purchasePrice,
                salePrice: newProduct.salePrice,
                remarks: newProduct.remarks
            });

            // 在成功新增后，将新产品添加到产品列表中
            const addedProduct = response.data.data;
            setProducts([...products, {
                ...addedProduct,
                productId: addedProduct.product_id,
                imageUrl: addedProduct.image_url,
                categoryId: addedProduct.category_id,
                brandId: addedProduct.brand_id,
                dateAdded: addedProduct.date_added,
                stock: addedProduct.stock_alert,
                purchasePrice: addedProduct.purchase_price,
                salePrice: addedProduct.sale_price
            }]);
            setShowModal(false);
        } catch (error) {
            console.error("新增产品失败:", error);
        }
    };

    const handleDelete = async () => {
        try {
            if (!selectedProduct || !selectedProduct.productId) {
                console.error("未选择产品或产品ID不存在");
                return;
            }
            await deleteProduct(selectedProduct.productId); // 调用删除产品的 API 函数
            const filteredProducts = products.filter(product =>
                product.productId !== selectedProduct.productId
            );
            setProducts(filteredProducts);
            setShowModal(false);
        } catch (error) {
            console.error("删除产品失败:", error);
        }
    };
    
    const handleCloseModal = () => {
        setSelectedProduct(null);
        setShowModal(false);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    // 计算当前页显示的产品
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentProducts = products.slice(startIndex, endIndex);

    return (
        <div className="product-list">
            <h2>产品列表</h2>
            {currentProducts.map(product => (
                <div key={product.productId} className="product-item">
                    <h3>{product.name}</h3>
                    <p>ID:{product.productId}</p>
                    <p>分类ID: {product.categoryId}</p>
                    <p>品牌ID: {product.brandId}</p>
                    <p>添加日期: {product.dateAdded}</p>
                    <p>规格: {product.specifications}</p>
                    <p>数量: {product.quantity}</p>
                    <p>库存警报: {product.stock}</p>
                    <p>进价: {product.purchasePrice}</p>
                    <p>售价: {product.salePrice}</p>
                    <p>备注: {product.remarks}</p>
                    <Button onClick={() => handleEdit(product)}>编辑</Button>
                </div>
            ))}

            <Button onClick={handleAdd}>新增</Button>

            <Modal
                title={selectedProduct ? "编辑产品" : "新增产品"}
                open={showModal}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="cancel" onClick={handleCloseModal}>
                        取消
                    </Button>,
                    selectedProduct && (
                        <Button key="delete" type="danger" onClick={handleDelete}>
                            删除
                        </Button>
                    ),
                    <Button key="submit" type="primary" onClick={selectedProduct ? handleUpdate : handleAddProduct}>
                        {selectedProduct ? "更新" : "新增"}
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    initialValues={selectedProduct} // 设置表单初始值为选中产品的值，或者为空白（新增情况）
                >
                    <Form.Item
                        name="productId"
                        label="产品ID"
                        rules={[{ required: true, message: '请输入产品ID' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="imageUrl"
                        label="图片链接"
                        rules={[{ required: true, message: '请输入图片链接' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="产品名称"
                        rules={[{ required: true, message: '请输入产品名称' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="categoryId"
                        label="分类ID"
                        rules={[{ required: true, message: '请输入分类ID' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="brandId"
                        label="品牌ID"
                        rules={[{ required: true, message: '请输入品牌ID' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="dateAdded"
                        label="添加日期"
                        rules={[{ required: true, message: '请选择添加日期' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="specifications"
                        label="规格"
                        rules={[{ required: true, message: '请输入规格' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="quantity"
                        label="数量"
                        rules={[{ required: true, message: '请输入数量' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="stock"
                        label="库存警报"
                        rules={[{ required: true, message: '请输入库存警报' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="purchasePrice"
                        label="进价"
                        rules={[{ required: true, message: '请输入进价' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="salePrice"
                        label="售价"
                        rules={[{ required: true, message: '请输入售价' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="remarks"
                        label="备注"
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>

            {/* 分页按钮 */}
            <div>
                {Array.from({ length: Math.ceil(products.length / pageSize) }, (_, index) => (
                    <Button key={index + 1} onClick={() => handlePageChange(index + 1)}>{index + 1}</Button>
                ))}
            </div>
        </div>
    );
};

export default Product;
