'use client'
import { useState ,SyntheticEvent } from "react"
import type { Brand} from '@prisma/client'
import axios from "axios"
import { useRouter } from 'next/navigation'


const AddProduct = ({brands}:{brands: Brand[]}) => {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [brandId, setBrand] = useState('')
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true)
        await axios.post('/api/products', {
            title: title,
            price: Number(price),
            brandId: Number(brandId)
        })
        setTitle('')
        setPrice('')
        setBrand('')
        router.refresh()
        setLoading(false)
        setIsOpen(false)

    }

    const handleModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={handleModal}>Add New</button>
            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        Add New Product
                    </h3>
                    <form onSubmit={handleSubmit} >
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
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="input input-bordered" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">
                               brand
                            </label>
                          <select name="" id="" value={brandId} onChange={(e) => setBrand(e.target.value)} className="select select-bordered">
                            <option value="" disabled>select A brand
                            </option>
                                {brands.map((brand) => (
                                    <option value={brand.id} key={brand.id}>{brand.name}</option>
                                ))}
                          </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModal}>Close</button>
                            {loading ? <button type="button" className="loading loading-dots loading-md">Loading...</button> : <button type="submit" className="btn btn-primary">Add</button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct