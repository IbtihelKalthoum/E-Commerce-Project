import { useEffect, useState } from 'react'
import { apis } from '../../config/apisUrls'
import axios from '../../config/axios'
import './index.css'
import { Slider } from 'antd'
import { useDispatch } from 'react-redux'
import { setSearchParams } from '../../features/products/productsSlice'

export default () => {


    const [categories, setcategories] = useState([])

    const [min, setmin] = useState(0)
    const [max, setmax] = useState(100)
    const [slidermax, setslidermax] = useState(100)
    const [slidermin, setslidermin] = useState(0)
    const [keyword, setkeyword] = useState('')
    const [category, setcategory] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchParams({
            params: {
                min,
                max,
                category,
                keyword
            }
        }))

    }, [min, max, keyword, category])

    useEffect(() => {
        axios.get(apis.categories.all)
            .then(res => {
                setcategories(res.data.data)
            })

        axios.get(apis.products.min)
            .then(res => {
                console.log(res);

                setmin(res.data[0].price)
            })
        axios.get(apis.products.max)
            .then(res => {
                console.log(res);
                setmax(res.data[0].price)
            })
    }, [])

    function onChange(value) {
        console.log('onChange: ', value);
        setslidermin(value[0])
        setslidermax(value[1])
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="shop__sidebar">
                            <div className="search">
                                <input onChange={e => setkeyword(e.target.value)} type="text" placeholder="search" />
                                <i class="las la-search"></i>
                            </div>
                            <div className="sidebar__sizes">
                                <div className="section-title">
                                    <h4>Categories</h4>
                                </div>
                                <div className="size__list">

                                    <label htmlFor="xxs">
                                        <i style={{ fontSize: '20px' }} class="las la-list-alt"></i>

                                        <span onClick={() => setcategory('')} style={{ marginLeft: "10px", color: category === '' ? 'red' : '' }} >All</span>
                                    </label>
                                    {
                                        categories.map(c => {
                                            return (
                                                <label htmlFor="xxs">
                                                    <img style={{ height: "20px", width: '20px' }} src={'http://localhost:5000/getimage/' + c.icon} alt="" />

                                                    <span onClick={() => setcategory(c._id)} style={{ marginLeft: "10px", color: category === c._id ? 'red' : '' }} >{c.name}</span>
                                                </label>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                            <div className="sidebar__filter">
                                <div className="section-title">
                                    <h4>Shop by price</h4>
                                </div>
                                <Slider
                                    range
                                    step={10}
                                    defaultValue={[0, 100]}
                                    value={[slidermin, slidermax + 1]}
                                    onChange={onChange}
                                    min={min}
                                    max={max}
                                />
                                <div style={{ display: 'flex', justifyContent: "space-between" }}  >
                                    <span>{min}</span>
                                    <span>{max}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
