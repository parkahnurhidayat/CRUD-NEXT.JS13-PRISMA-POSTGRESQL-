
import { PrismaClient } from "@prisma/client"
import AddProduct from "./addProduct"
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";
const prisma = new PrismaClient()

export const dynamic = "force-dynamic";

const getProducts = async () => {
    const res = await  prisma.product.findMany({
        select: {
            id: true,
            title: true,
            price: true,
            brandId: true,
            brand:true,
        },
    })
    return res
};
const getBrands = async () => {
    const res = await prisma.brand.findMany()
    return res
};

const ProductPage = async () => {
    const [products, brands] = await Promise.all([getProducts(), getBrands()])
    
  return (
    <div>
        <div className="mb-2">
            <AddProduct brands={brands} />
        </div>
        <table className="table w-full uppercase">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Brand</th>
                    <th className="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product,index) => (
                    <tr key={index}>
                        <th>{index+1}</th>
                        <td>{product.title}</td>
                        <td>{product.price.toLocaleString('id-ID')}</td>
                        <td>{product.brand.name}</td>
                        <td className="flex gap-x-2 justify-center">
                            <UpdateProduct product={product} brands={brands} />
                            <DeleteProduct product={product}  />
                        </td>
                    </tr>
                    
                ))}
             
            </tbody>
        </table>
    </div>
  )
}

export default ProductPage