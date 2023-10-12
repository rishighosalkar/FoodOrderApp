import { useState, useRef } from "react";
import classes from './AddMealsForm.module.css';

const isEmpty = value => value.trim() === '';

const AddMealsForm = (props) => {
    const [formValidity, setFormValidity] = useState({
        mealName: true,
        mealDesc: true,
        mealPrice: true,
        mealCategory: true,
        mealSubCategory: true,
    });

    const mealNameInputRef = useRef();
    const mealDescInputRef = useRef();
    const mealPriceInputRef = useRef();
    const mealCategoryInputRef = useRef();
    const mealSubCategoryInputRef = useRef();

    
    const confirmHandler = (event) => {
        event.preventDefault();

        
        const enteredMealName = mealNameInputRef.current.value;
        const enteredMealDesc = mealDescInputRef.current.value;
        const enteredMealPrice = mealPriceInputRef.current.value;
        const enteredMealCategory = mealCategoryInputRef.current.value;
        const enteredmealSubCategory = mealSubCategoryInputRef.current.value;
        
        //alert('Meal Subcategory Category Value: ' + enteredmealSubCategory);
        const enteredMealNameValid = !isEmpty(enteredMealName);
        const enteredMealDescIsValid = !isEmpty(enteredMealDesc);
        const enteredMealPriceValid = !isEmpty(enteredMealPrice);
        const enteredMealCategoryIsValid = !isEmpty(enteredMealCategory);
        const enteredmealSubCategoryIsValid = !isEmpty(enteredmealSubCategory);

        setFormValidity({
            mealName: enteredMealName,
            mealDesc: enteredMealDesc,
            mealPrice: enteredMealPrice,
            mealCategory: enteredMealCategory,
            mealSubCategory: enteredmealSubCategory,
        })
        const formIsValid = enteredMealName && enteredMealDesc && enteredMealPrice && enteredMealCategoryIsValid && enteredmealSubCategoryIsValid;

        if(!formIsValid)
        {return}

        const newMeal = {
            name: enteredMealName,
            description: enteredMealDesc,
            price: enteredMealPrice,
            categoryId: enteredMealCategory,
            subcategoryId: enteredmealSubCategory,
            restaurantId: localStorage.getItem('RestaurantId'),
            restaurantName: localStorage.getItem('RestaurantName'),
            order: []
        }

        props.onConfirm(newMeal)
    };

    const nameControlClass = `${classes.control } ${formValidity.name ? '': classes.invalid}`

    return (
        <form className={classes.form}  onSubmit={confirmHandler}>
            <div className={nameControlClass}>
                <label htmlFor='mealName'>Meal Name</label>
                <input type='text' id='mealName' ref={mealNameInputRef}/>
                {!formValidity.mealName && <p>Please enter a valid meal name</p>}
            </div>
            <div className={nameControlClass}>
                <label htmlFor='mealPrice'>Meal Price</label>
                <input type='number' id='mealPrice' ref={mealPriceInputRef}/>
                {!formValidity.mealPrice && <p>Please enter a valid meal price</p>}
            </div>
            <div className={nameControlClass}>
                <label htmlFor='mealDesc'>Meal Description</label>
                <input type='text' id='mealDesc' ref={mealDescInputRef}/>
                {!formValidity.mealDesc && <p>Please enter a valid meal description</p>}
            </div>
            <div className={nameControlClass}>
                <select htmlFor='mealCategory' id='mealCategory' ref={mealCategoryInputRef}>
                    <option value='1'>Veg</option>
                    <option value='2'>Non Veg</option>
                </select>
                {!formValidity.mealCategory && <p>Please enter a valid meal category</p>}
            </div>
            <div className={nameControlClass}>
                <select htmlFor='mealSubCategory' id='mealSubCategory' ref={mealSubCategoryInputRef}>
                    <option>Select Sub Category</option>
                    {props.subCategory.map((subCat) => {
                        return <option key={subCat.id} value={subCat.id}>
                            {subCat.type}
                        </option>
                    })}
                </select>
                {/* <label htmlFor='mealSubCategory'>Please describe the category</label>
                <input type='text' id='mealSubCategory' ref={mealSubCategoryInputRef}/> */}
                {!formValidity.mealSubCategory && <p>Please enter a valid meal sub category</p>}
            </div>   
            <div className={classes.actions}>
                <button type='button' onClick={props.onClose}>
                    Cancel
                </button>
                <button className={classes.submit}>Register</button>
            </div>
        </form>
    )
}

export default AddMealsForm;