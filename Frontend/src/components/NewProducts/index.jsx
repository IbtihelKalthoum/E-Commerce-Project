import Product from "../Product"


export default () => {
    return (
        <>
            <section class="product spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 col-md-4">
                            <div class="section-title">
                                <h4>New product</h4>
                            </div>
                        </div>
                        <div class="col-lg-8 col-md-8">
                            <ul class="filter__controls">
                                <li class="active" data-filter="*">All</li>
                                <li data-filter=".women">Women’s</li>
                                <li data-filter=".men">Men’s</li>
                                <li data-filter=".kid">Kid’s</li>
                                <li data-filter=".accessories">Accessories</li>
                                <li data-filter=".cosmetic">Cosmetics</li>
                            </ul>
                        </div>
                    </div>
                    <div class="row property__gallery">

                        {/* <Product  />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product/>
                        <Product/>
                        <Product/> */}

                    </div>
                </div>
            </section>
        </>
    )
}
