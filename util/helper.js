var helper = {};

helper.formatuang = (amount) => {
    if (amount === null) {
        amount = 0;
    }

    let comadel = amount.toString().replace(/,/g, '');
    let price = comadel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    return price;
}

module.exports = helper;