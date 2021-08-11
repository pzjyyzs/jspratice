
import jQuery from 'jquery';
import { IndexModel } from '../models';
import '../scss/common.scss';


class App {
    constructor($, options) {
        this.$app = $('<div id="app">');
        this.cache = null;
        this.swiper = options.swiper;
        this.phone = options.phone;
        this.field = options.field;
        this.init();
    }

    async init() {
        await this.getDatas();
        this.render();
    }

    async getDatas() {
        const indexModel = new IndexModel();

        await indexModel.getDatas({
            swiper: this.swiper,
            phone: this.phone,
            field: this.field
        }).then(res => {
            console.log(res);
            this.cache = {
                phoneDatas: res.phone_data,
                fieldDatas: res.field_data,
                swiperDatas: res.swiper_data
            }
        })
    }
}

export { App }