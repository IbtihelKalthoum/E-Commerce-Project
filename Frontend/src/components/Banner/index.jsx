import { useState } from 'react'
import banner1 from '../../assets/img/banner/banner1.jpg'

export default () => {

    const [activeitem, setactiveitem] = useState(0)

    return (
        <>
            <section class="banner set-bg"
                style={{ backgroundImage: `url(${banner1})` }}
            >
                <div class="container">
                    <div class="row">
                        <div class="col-xl-7 col-lg-8 m-auto">
                            <div class="banner__slider">
                                {
                                    activeitem === 0
                                    &&
                                    <div class="banner__item">
                                        <div class="banner__text">
                                            <span>The Chloe 0</span>
                                            <h1>The Project Jacket</h1>
                                            <a href="#">Shop now</a>
                                        </div>
                                    </div>
                                }
                                {
                                    activeitem === 1
                                    &&
                                    <div class="banner__item">
                                        <div class="banner__text">
                                            <span>The Chloe 1</span>
                                            <h1>The Project Jacket</h1>
                                            <a href="#">Shop now</a>
                                        </div>
                                    </div>
                                }
                                {
                                    activeitem === 2
                                    &&
                                    <div class="banner__item">
                                        <div class="banner__text">
                                            <span>The Chloe 2</span>
                                            <h1>The Project Jacket</h1>
                                            <a href="#">Shop now</a>
                                        </div>
                                    </div>
                                }
                                <button onClick={() => setactiveitem(activeitem + 1)} >n</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
