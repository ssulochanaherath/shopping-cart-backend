module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        name: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        category: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.STRING },
    });
    return Product;
};
