import { Badge, Table } from 'antd';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import Input from '../../components/Input';
import './index.css'
import axios from '../../config/axios'
import { apis } from '../../config/apisUrls'
export default () => {

    const [open, setopen] = useState(false)

    const [categories, setcategories] = useState([])

    const [name, setname] = useState('')
    const [icon, seticon] = useState(null)

    useEffect(() => {
        axios.get(apis.categories.all)
            .then(res => {
                setcategories(res.data.data)
            })
    }, [])



    const columns = [
        {
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
            render: (text, record) => (
                <img style={{ borderRadius: '50%', height: '50px', width: '50px' }} src={'http://localhost:5000/getimage/' + record.icon} alt="" />
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Delete',
            render: (text, record) => (
                <i onClick={() => deletecategory(record._id)} style={{ cursor: 'pointer', fontSize: "25px", color: "red" }} class="las la-trash-alt"></i>
            )
        },



    ];

    const [successadd, setsuccessadd] = useState(false)
    const [successdelete, setsuccessdelete] = useState(false)
    const deletecategory = id => {
        axios.delete(apis.categories.deletecat + id)
            .then(res => {
                setsuccessdelete(true)
                let arr = [...categories]
                setcategories(arr.filter(c => c._id !== id))
                setTimeout(() => {
                    setsuccessdelete(false)
                }, 3000);
            })
    }

    const addcategory = () => {
        let data = new FormData()

        data.append('name', name)
        data.append('icon', icon)

        axios.post(apis.categories.create, data)
            .then(res => {
                setsuccessadd(true)
                setTimeout(() => {
                    setsuccessadd(false)
                }, 3000);
                setcategories(prev => [...prev, res.data.data])
                seticon(null)
                setname('')
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    return (
        <>
            <div className="container categories mt-4 ">
                <h3>categories <Badge count={categories.length} showZero />   </h3>

                {/* add / close buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <div className={`add_close_button ${open ? 'Close' : 'plus'}`}>
                        {
                            open
                                ?
                                <i onClick={() => setopen(!open)} class="las la-times "></i>
                                :
                                <i onClick={() => setopen(!open)} class="las la-plus "></i>

                        }
                    </div>
                </div>

                {/* add category form */}

                {
                    open
                    &&
                    <div className="category_form">
                        <div className="icondiv" >
                            <input onChange={e => seticon(e.target.files[0])} type="file" hidden id='iconupload' />
                            {icon ? <i class="las la-check"></i> : <i onClick={() => document.getElementById('iconupload').click()} class="las la-file-upload"></i>}
                        </div>
                        <div style={{ width: '100%' }} >
                            <Input value={name} onWrite={e => setname(e.target.value)} type='text' placeholder='name' />
                        </div>
                        <div style={{ marginLeft: '15px' }} >
                            <Button Click={addcategory} text='create' />
                        </div>
                    </div>
                }
                <br />
                {
                    successadd
                    &&
                    <Alert message={'category added'} type={'success'} />
                }
                <br />
                {
                    successdelete
                    &&
                    <Alert message={'category deleted'} type={'success'} />
                }

                {/* categories table */}
                <br />
                <Table dataSource={categories} columns={columns} />

            </div>
        </>
    )
}
