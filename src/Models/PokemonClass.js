const {getUniqueId} = require("../../helper");
module.exports = class PokemonModels {
    constructor(pokemons) {
        this.model = pokemons
    }

    all() {
        return this.model
    };

    show(ids) {
        if (typeof ids === "string")
            return false

        if (typeof ids === "number")
            ids = [ids]

        let show = [];

        ids.forEach(id => {
            show.push(this.model.filter(item => item.id === id))
        });

        if (show.length > 0)
            return show;

        return false

    };

    store(objectModel) {
        if (typeof objectModel !== "object")
            return false;

        this.model.push(objectModel);

        return true;
    }

    update(items) {
        if (typeof items === "string")
            return false;

        if (Array.isArray(items) === false)
            items = [...items]

        this.model.forEach(objectModel => {
            let objectFinded = items.filter(item => objectModel.id === item.id);

            return {...{objectModel}, ...{objectFinded}};
        });
        return true
    }

    destroy(ids) {
        if (typeof ids === "number")
            ids = [...ids];

        if (Array.isArray(ids)) {
            ids.forEach(id => {
                this.model = this.model.filter(objectModel => objectModel.id === id);
            });

            return true;
        }

        return false;
    }
}
