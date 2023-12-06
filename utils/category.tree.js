
module.exports = (parent, categories) =>{
    let categoriesId = [];
    const children = categories.filter( (category) => category.parent_id == parent);
    
    children.forEach((category) => {
        
        categoriesId.push(...findCategoriesChildrenIds(category.id, categories));
    });

    return [ parent, ...categoriesId ];
}
