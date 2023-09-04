'use client'
import { useState, SyntheticEvent } from "react"
import type { Brand } from '@prisma/client'
import axios from "axios"
import { useRouter } from 'next/navigation'

type Product = {
    id: number;
    title: string;
    price: number;
    brandId: number;
}

const UpdateProduct = ({ brands, product }: { brands: Brand[]; product: Product }) => {
    const [title, setTitle] = useState(product.title)
    const [price, setPrice] = useState(product.price)
    const [brandId, setBrand] = useState(product.brandId)
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true)
        await axios.patch(`/api/products/${product.id}`, {
            title: title,
            price: Number(price),
            brandId: Number(brandId)
        })
        router.refresh()
        setLoading(false)
        setIsOpen(false)

    }

    const handleModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <button className="btn btn-outline btn-warning btn-sm" onClick={handleModal}>Edit</button>
            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        Update {product.title}
                    </h3>
                    <form onSubmit={handleUpdate} >
                        <div className="form-control w-full">
                            <label className="label font-bold">
                                Product Name
                            </label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product Name" className="input input-bordered" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">
                                Price
                            </label>
                            <input type="text" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Price" className="input input-bordered" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">
                                brand
                            </label>
                            <select name="" id="" value={brandId} onChange={(e) => setBrand(Number(e.target.value))} className="select select-bordered">

                                {brands.map((brand) => (
                                    <option value={brand.id} key={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModal}>Close</button>
                            {loading ? <button type="button" className="loading loading-dots loading-md">Loading...</button> : <button type="submit" className="btn btn-primary">Update</button>}

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct