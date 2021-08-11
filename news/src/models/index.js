import config from '../utils/config';
import $ from 'jquery';

class IndexModel {
    getDatas (options) {
        const url = `getDatas?swiper=${options.swiper}&phone=${options.phone}&field=${options.field}`;

        return new Promise((reslove, reject) => {
            $.ajax({
                url: config.API.base_url + url,
                type: 'GET',
                dataType: 'JSONP',
                jsonp: 'cb',
                success(data) {
                    reslove(data)
                }
            })
        });
    }
}

export { IndexModel };