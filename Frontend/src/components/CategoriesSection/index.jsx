
import category1 from '../../assets/img/categories/category1.jpg'
import category2 from '../../assets/img/categories/category2.jpg'
import category3 from '../../assets/img/categories/category3.jpg'
import category4 from '../../assets/img/categories/category4.jpg'
import category5 from '../../assets/img/categories/category5.jpg'

export default () => {
    return (
        <>
            <section class="categories">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-6 p-0">
                            <div class="categories__item categories__large__item set-bg"
                            style={{backgroundImage: `url(${category1})` }}
                              >
                                <div class="categories__text">
                                    <h1>Women’s fashion</h1>
                                    <p></p>
                                    <a href="#"></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 col-sm-6 p-0">
                                    <div class="categories__item set-bg" 
                                    style={{backgroundImage: `url(${category2})` }}>
                                        <div class="categories__text">
                                            <h4>Men’s fashion</h4>
                                            <p></p>
                                            <a href="#"></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 p-0">
                                    <div class="categories__item set-bg" 
                                    style={{backgroundImage: `url(${category3})` }}>
                                        <div class="categories__text">
                                            <h4>Kid’s fashion</h4>
                                            <p></p>
                                            <a href="#"></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 p-0">
                                    <div class="categories__item set-bg"
                                     style={{backgroundImage: `url(${category4})` }}>
                                        <div class="categories__text">
                                            <h4>Cosmetics</h4>
                                            <p></p>
                                            <a href="#"></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 p-0">
                                    <div class="categories__item set-bg" 
                                    style={{backgroundImage: `url(${category5})` }}>
                                        <div class="categories__text">
                                            <h4>Accessories</h4>
                                            <p></p>
                                            <a href="#"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
