import tpl from './index.tpl';
import './index.scss';

import { Logo } from './logo/index';
import tools from '../../utils/tools';

class Header {
    constructor(el) {
        this.name = 'header';
        this.$el = el;

        this.logo = new Logo();
    }

    init() {
        this.render();
    }

    render() {
        this.$el.append(tools.tplReplace(tpl(), {
            logo: this.logo.tpl()
        }))
    }
}

export { Header };