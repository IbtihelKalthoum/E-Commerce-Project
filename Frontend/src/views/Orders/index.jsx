import { Table } from "antd";
import { useEffect, useState } from "react";
import { apis } from "../../config/apisUrls";
import axios from "../../config/axios";

export default () => {

    const [orders, setOrders] = useState([])


    useEffect(() => {
        axios.get(apis.orders.all)
            .then(res => {
                setOrders(res.data.data)
            })
    }, [])

    const columns = [
        {
            title: 'Client',
            dataIndex: 'client',
            key: 'icon',
            render: (text, record) => (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }} >
                    <img style={{ borderRadius: '50%', height: '50px', width: '50px' }} src={'http://localhost:5000/getimage/' + record.client.avatar} alt="" />
                    <span style={{marginTop:'10px'}} > {record.client.username} </span>
                </div>
            )
        },
        {
            title: 'Phone',
            dataIndex: 'client',
            key: 'icon',
            render: (text, record) => (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }} >
                    <span style={{marginTop:'10px'}} > {record.client.phone} </span>
                </div>
            )
        },
        {
            title: 'Products',
            dataIndex: 'products',
            key: 'icon',
            render: (text, record) => (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }} >
                    <span style={{marginTop:'10px'}} > {record.products.length} </span>
                </div>
            )
        },
        {
            title: 'Total',
            dataIndex: 'prix_total',
            key: 'name',
        },




    ];

    return (
        <>
            <div className="container">
                <h3> Orders </h3>
                <br />
                <br />

                <Table dataSource={orders} columns={columns} />
            </div>
        </>
    )
}