export default class Material {
    constructor() {
        this.name = '';
    }
    get specname() {
        return this.name;
    }
    set specname(x) {
        this.name = x;
    }
}