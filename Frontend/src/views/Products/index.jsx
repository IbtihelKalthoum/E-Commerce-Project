import ProductsFilter from '../../components/ProductsFilter'
import { useEffect, useState } from 'react';
import { Steps, Button, message, Badge } from 'antd';
import './index.css'
import Input from '../../components/Input'
import axios from '../../config/axios';
import { apis } from '../../config/apisUrls';
import Fade from 'react-reveal/Fade';
import Product from '../../components/Product';
const { Step } = Steps;

export default () => {

    const [open, setopen] = useState(false)


    const [thumbnails, setthumbnails] = useState([])

    const [current, setCurrent] = useState(0);

    const [categories, setcategories] = useState([])

    const [category, setcategory] = useState('')

    const [products, setproducts] = useState([])


    useEffect(() => {
        axios.get(apis.categories.all)
            .then(res => {
                setcategories(res.data.data)
            })

        axios.get(apis.products.all)
            .then(res => {
                console.log(res);
                setproducts(res.data.data)
            })
            .catch(err => {
                console.log(err.response);
            })
    }, [])

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const CategoriesStep = () => {
        return (
            <>
                <div className='row p-3' >
                    {
                        categories.map(c => {
                            return (
                                <div onClick={() => setcategory(c._id)} className={`category_item col-md-2 col-sm-1 ${c._id === category ? ' category_selected' : ''} `}>
                                    <img className='cat_icon' src={'http://localhost:5000/getimage/' + c.icon} alt="" />
                                    <span>{c.name}</span>
                                </div>
                            )
                        })
                    }


                </div>
            </>
        )
    }

    const handleImages = e => {

        // copie de state table thumnails
        let imgs = []

        const { files } = e.target

        let j = [...thumbnails].length + 1

        for (let i = 0; i < files.length; i++) {
            imgs.push({
                //to delete the selected dimage by id
                id: j,
                //to display images in html
                thumb: URL.createObjectURL(files[i]),
                // will be used to consume the create product api 
                file: files[i]
            })
            j += 1
            console.log(imgs);
        }

        setthumbnails((prevImages) => prevImages.concat(imgs))
        e.target = null
    }

    const removeImage = id => {
        let arr = [...thumbnails]
        let dt = arr.filter(i => i.id !== id)
        setthumbnails(dt)
    }

    const Images = () => {
        return (
            <>

                <div className="images">
                    <div className="row p-3">
                        <input onChange={handleImages} type="file" hidden id='uploadimages' multiple />

                        {
                            thumbnails.map(t => {
                                return (

                                    <div className="col-md-2 image_item col-sm-4 mt-4">
                                        <img src={t.thumb} alt="" />
                                        <i onClick={() => removeImage(t.id)} class="las la-times-circle"></i>
                                    </div>
                                )
                            })
                        }

                        <div onClick={() => document.getElementById('uploadimages').click()} className="upluadinput m-3">
                            <i class="las la-upload"></i>
                        </div>

                    </div>
                </div>
            </>
        )
    }



    const Details = () => {

        const [details, setdetails] = useState({
            name: '',
            description: '',
            price: '',
            qte: ''
        })

        const handlechange = e => {
            const { value, name } = e.target

            setdetails(prev => ({
                ...prev,
                [name]: value
            }))

            localStorage.setItem('details', JSON.stringify({ ...details, [name]: value }))
        }

        return (
            <>
                <div className="details p-4">
                    <Input value={details.name} onWrite={handlechange} type='text' name='name' placeholder='name' />
                    <Input value={details.description} onWrite={handlechange} type='text' name='description' placeholder='description' />
                    <Input value={details.price} onWrite={handlechange} type='number' name='price' placeholder='price' />
                    <Input value={details.qte} onWrite={handlechange} type='number' name='qte' placeholder='qte' />
                </div>
            </>
        )
    }

    const steps = [
        {
            title: 'Category',
            content: <CategoriesStep />,
        },
        {
            title: 'Images',
            content: <Images />,
        },
        {
            title: 'Details',
            content: <Details />,
        },
    ];


    const addProduct = () => {
        message.success('Processing complete!')

        const data = new FormData()



        for (let item of thumbnails) {

            data.append('images', item.file)
        }

        data.append('category', category)

        const product = JSON.parse(localStorage.getItem('details'))
        data.append('name', product.name)
        data.append('description', product.description)
        data.append('price', product.price)
        data.append('qte', product.qte)

        axios.post(apis.products.create, data)
            .then(res => {
                console.log(res)
                setcategory()
                setthumbnails([])
                localStorage.removeItem('details')
                setCurrent(0)
                setproducts(prev => [res.data.data, ...prev])
            })
            .catch(err => {
                console.log(err.response)
            })



    }

    return (
        <>

            <div className="container mt-5">

                <div className="row">
                    <div className="col-md-3 col-sm-12">
                        <ProductsFilter />
                    </div>
                    <div className="col-md-9 col-sm-12">
                        <h3>Products <Badge count={products.length} showZero />   </h3>


                        <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                            <div onClick={() => setopen(!open)} className={`add_close_button ${open ? 'Close' : 'plus'}`}>
                                {
                                    open
                                        ?
                                        <i class="las la-times "></i>
                                        :
                                        <i class="las la-plus "></i>
                                }
                            </div>
                        </div>



                        {/* add product form steper */}

                        <br />
                        {
                            open
                            &&
                            <>
                                <Fade>
                                    <Steps current={current}>
                                        {steps.map(item => (
                                            <Step key={item.title} title={item.title} />
                                        ))}
                                    </Steps>
                                    <div className="steps-content">{steps[current].content}</div>
                                    <div className="steps-action">
                                        {current < steps.length - 1 && (
                                            <Button type="primary" onClick={() => next()}>
                                                Next
                                            </Button>
                                        )}
                                        {current === steps.length - 1 && (
                                            <Button type="primary" onClick={() => addProduct()}>
                                                Done
                                            </Button>
                                        )}
                                        {current > 0 && (
                                            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                                Previous
                                            </Button>
                                        )}
                                    </div>
                                </Fade>
                            </>
                        }

                        {/* map products here */}
                        <br />
                        <br />
                        <br />
                        <div className="row">
                            {
                                products.map(p => {
                                    return (
                                        <Product key={p._id} product={p} />
                                    )
                                })
                            }
                        </div>
                    </div>


                </div>



            </div>
        </>
    )
}
