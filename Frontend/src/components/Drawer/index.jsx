
import { useState } from 'react';
import { Drawer, Button, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterDrawerVisible } from '../../features/theme/themeSlice';
import ProductFilter from '../ProductsFilter'
export default () => {


    const dispatch = useDispatch()

    const onClose = () => {
        dispatch(setFilterDrawerVisible({ visible: false }))
    };

    const show = useSelector(state => state.theme.openFilterDrawer)

    return (
        <>
            <Drawer
                title="Search BY"
                placement='left'
                /*  width={500} */
                onClose={onClose}
                visible={show}
                extra={
                    <Space>
                        <Button onClick={onClose} >Cancel</Button>
                        <Button type="primary" onClick={onClose} >
                            OK
                        </Button>
                    </Space>
                }
            >
                <ProductFilter />
            </Drawer>
        </>
    )
}
