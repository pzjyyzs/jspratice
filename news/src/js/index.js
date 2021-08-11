import { Header } from '../components/header';
import App from './App';


class Index extends App {
    constructor($ ) {
        super($, {
            swiper: true,
            phone: true,
            field: true
        })
    }

    render() {
        new Header(this.$app).init();

        jQuery('body').prepend(this.$app);
    }

    
}

new Index(jQuery);